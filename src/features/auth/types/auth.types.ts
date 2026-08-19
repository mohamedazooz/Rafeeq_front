export type LoginMethod = "email" | "phone";

export interface LoginPayload {
  email?: string;
  password?: string;
  phone?: string;
  code?: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  accountType: "client" | "guide";
}
