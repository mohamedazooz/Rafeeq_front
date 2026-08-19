/* ═══════════════════════════════════════════════════════════════
   Rafeeq Core — Unified Type-Safe HTTP Client
   ═══════════════════════════════════════════════════════════════ */

import { APP_CONFIG } from "../config";
import { sessionManager } from "../storage/session-storage";
import type { ApiResponse } from "@/types/common.types";

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly errors?: readonly string[],
    public readonly rawResponse?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  readonly body?: unknown;
  readonly params?: Record<string, string | number | boolean | undefined | null>;
  readonly timeoutMs?: number;
}

async function executeRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, body, headers: customHeaders, timeoutMs = 15000, ...fetchOptions } = options;

  let url = endpoint.startsWith("http")
    ? endpoint
    : `${APP_CONFIG.apiUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        query.append(key, String(val));
      }
    });
    const queryString = query.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const token = sessionManager.getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Accept-Language": "ar",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(customHeaders as Record<string, string>),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const errorData = (payload as Record<string, unknown>) || {};
      const errorMessage =
        (typeof errorData.message === "string" ? errorData.message : null) ||
        (Array.isArray(errorData.message) ? errorData.message.join(", ") : null) ||
        `خطأ في السيرفر (${response.status})`;

      const errors = Array.isArray(errorData.errors)
        ? (errorData.errors as string[])
        : Array.isArray(errorData.message)
        ? (errorData.message as string[])
        : undefined;

      throw new ApiError(response.status, errorMessage, errors, payload);
    }

    return payload as T;
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(408, "انتهت مهلة الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
    }

    throw new ApiError(
      500,
      "تعذر الاتصال بالخادم. يرجى التأكد من تشغيل الباك إند أو الاتصال بالإنترنت."
    );
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    executeRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    executeRequest<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    executeRequest<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    executeRequest<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    executeRequest<T>(endpoint, { ...options, method: "DELETE" }),
};
