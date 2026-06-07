import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Criar conta · Anunciante · Bem Servido" };
export default function AdvertiserSignup() {
  return <Suspense><AuthForm mode="signup" redirectTo="/anunciante/painel" /></Suspense>;
}
