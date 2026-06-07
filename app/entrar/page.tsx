import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Entrar · Bem Servido" };
export default function EntrarPage() {
  return <Suspense><AuthForm mode="login" /></Suspense>;
}
