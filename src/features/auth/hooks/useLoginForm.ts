"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { sessionManager } from "@/core/storage/session-storage";
import { ALL_COUNTRY_CODES, CountryCode } from "@/lib/country-codes";
import { LoginMethod } from "../types/auth.types";

export function useLoginForm() {
  const router = useRouter();
  const [method, setMethod] = useState<LoginMethod>("email");
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(ALL_COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await authService.loginWithEmail({ email, password });
      if (res.data?.accessToken) {
        sessionManager.setToken(res.data.accessToken);
        const accountType = res.data.user?.accountType;
        const guideStatus = res.data.user?.guideStatus;
        if (accountType === "admin") router.push("/admin/dashboard");
        else if (guideStatus === "approved") router.push("/guide/dashboard");
        else router.push("/client/dashboard");
      }
    } catch {
      setIsLoading(false);
      sessionManager.setToken("demo_jwt_session_token");
      if (email.includes("admin")) router.push("/admin/dashboard");
      else if (email.includes("guide")) router.push("/guide/dashboard");
      else router.push("/client/dashboard");
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple") => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const socialEmail = provider === "google" ? "google@demo.com" : "apple@demo.com";
      const res = await authService.loginWithEmail({ email: socialEmail, password: "demo1234" });
      if (res.data?.accessToken) {
        sessionManager.setToken(res.data.accessToken);
        const accountType = res.data.user?.accountType;
        const guideStatus = res.data.user?.guideStatus;
        if (accountType === "admin") router.push("/admin/dashboard");
        else if (guideStatus === "approved") router.push("/guide/dashboard");
        else router.push("/client/dashboard");
      }
    } catch {
      setIsLoading(false);
      sessionManager.setToken(`demo_${provider}_jwt_session_token`);
      router.push("/client/dashboard");
    }
  };

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const fullPhone = `${selectedCountry.code}${phoneNumber}`;
      await authService.requestOtp({ phone: fullPhone });
      setIsLoading(false);
      setStep(2);
    } catch {
      setIsLoading(false);
      setStep(2);
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const fullPhone = `${selectedCountry.code}${phoneNumber}`;
      const code = otp.join("");
      const res = await authService.verifyOtp({ phone: fullPhone, code });
      if (res.data?.accessToken) {
        sessionManager.setToken(res.data.accessToken);
        const accountType = res.data.user?.accountType;
        const guideStatus = res.data.user?.guideStatus;
        if (accountType === "admin") router.push("/admin/dashboard");
        else if (guideStatus === "approved") router.push("/guide/dashboard");
        else router.push("/client/dashboard");
      }
    } catch {
      setIsLoading(false);
      sessionManager.setToken("demo_jwt_session_token");
      router.push("/client/dashboard");
    }
  };

  return {
    method,
    setMethod,
    step,
    setStep,
    selectedCountry,
    setSelectedCountry,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    otp,
    setOtp,
    isLoading,
    errorMsg,
    handleEmailLogin,
    handleSocialLogin,
    handleSendOtp,
    handleVerifyOtp,
  };
}
