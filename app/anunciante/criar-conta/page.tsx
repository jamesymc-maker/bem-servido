import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Criar conta · Anunciante · Daquii" };
export default function AdvertiserSignup() {
  return <Suspense><AuthForm mode="signup" accountType="advertiser" redirectTo="/anunciante/painel" /></Suspense>;
}
