import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export const metadata = { title: "Criar conta · daquii" };
export default function CriarContaPage() {
  return <Suspense><AuthForm mode="signup" accountType="provider" /></Suspense>;
}
