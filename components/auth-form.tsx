"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Anchor } from "lucide-react";
import { loginWithPassword } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { useActiveLocation } from "./location-provider";

type AccountType = "provider" | "advertiser";

export function AuthForm({
  mode,
  redirectTo,
  accountType = "provider",
}: {
  mode: "login" | "signup";
  redirectTo?: string;
  accountType?: AccountType;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const activeLocation = useActiveLocation();
  const defaultNext = accountType === "advertiser" ? "/anunciante/painel" : "/painel";
  const next = redirectTo || params.get("next") || defaultNext;
  const isAdvertiser = accountType === "advertiser";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submit() {
    setMsg(null); setInfo(null);
    if (!email || !password) { setMsg("Preencha e-mail e senha."); return; }
    setBusy(true);
    const supabase = createClient();
    try {
      if (mode === "signup") {
        const emailRedirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name, account_type: accountType }, emailRedirectTo },
        });
        if (error) { setMsg(error.message); setBusy(false); return; }
        if (data.session) { router.push(next); router.refresh(); return; }
        setInfo("Conta criada! Confirme seu e-mail para continuar.");
        setBusy(false);
      } else {
        try {
          const result = await loginWithPassword({ email, password, next, accountType });
          if (result.error) { setMsg(result.error); setBusy(false); }
        } catch {
          // redirect() from the server action — navigation in progress
        }
      }
    } catch {
      setMsg("Algo deu errado. Tente novamente."); setBusy(false);
    }
  }

  const isSignup = mode === "signup";
  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="flex items-center gap-2.5 mb-7">
        <span className="grid place-items-center w-9 h-9 rounded-xl" style={{ background: "var(--sea)" }}><Anchor size={18} color="#fff" /></span>
        <span className="serif text-xl" style={{ fontWeight: 600 }}>Daquii<span style={{ color: "var(--coral)" }}>.</span></span>
      </div>
      <h1 className="serif text-3xl mb-1" style={{ fontWeight: 600 }}>{isSignup ? "Criar conta" : "Entrar"}</h1>
      <p className="text-sm mb-7" style={{ color: "var(--ink-soft)" }}>
        {isSignup
          ? (isAdvertiser ? "Crie a conta da sua empresa para anunciar no Daquii." : `Anuncie o seu serviço em ${activeLocation.name}.`)
          : (isAdvertiser ? "Acesse o painel do anunciante." : "Acesse o seu painel de profissional.")}
      </p>

      <div className="flex flex-col gap-3">
        {isSignup && (
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome"
            className="rounded-xl px-4 py-3 text-[15px] outline-none" style={{ border: "1px solid var(--line)" }} />
        )}
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail"
          className="rounded-xl px-4 py-3 text-[15px] outline-none" style={{ border: "1px solid var(--line)" }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha"
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="rounded-xl px-4 py-3 text-[15px] outline-none" style={{ border: "1px solid var(--line)" }} />
        {msg && <p className="text-sm" style={{ color: "var(--coral)" }}>{msg}</p>}
        {info && <p className="text-sm rounded-xl px-3 py-2" style={{ background: "rgba(14,91,78,.08)", color: "var(--sea)" }}>{info}</p>}
        <button onClick={submit} disabled={busy}
          className="rounded-full py-3.5 font-semibold text-white transition active:scale-95 disabled:opacity-60" style={{ background: "var(--sea)" }}>
          {busy ? "Aguarde..." : isSignup ? "Criar conta" : "Entrar"}
        </button>
      </div>

      <p className="text-sm mt-6 text-center" style={{ color: "var(--ink-soft)" }}>
        {isSignup ? (
          <>Já tem conta? <Link href={isAdvertiser ? "/anunciante/entrar" : "/entrar"} className="font-semibold" style={{ color: "var(--sea)" }}>Entrar</Link></>
        ) : (
          <>Ainda não tem conta? <Link href={isAdvertiser ? "/anunciante/criar-conta" : "/criar-conta"} className="font-semibold" style={{ color: "var(--sea)" }}>Criar conta</Link></>
        )}
      </p>
      <p className="text-xs mt-3 text-center" style={{ color: "var(--ink-soft)" }}>
        {isAdvertiser ? (
          <>É profissional de serviços? <Link href="/entrar" className="underline">Entrar no painel de profissional</Link></>
        ) : (
          <>Quer anunciar a sua empresa? <Link href="/anunciante/entrar" className="underline">Painel do anunciante</Link></>
        )}
      </p>
    </div>
  );
}
