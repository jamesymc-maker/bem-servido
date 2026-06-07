import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Entrar · Anunciante · Bem Servido" };
export default function AdvertiserLogin() {
  return <Suspense><AuthForm mode="login" accountType="advertiser" redirectTo="/anunciante/painel" /></Suspense>;
}
