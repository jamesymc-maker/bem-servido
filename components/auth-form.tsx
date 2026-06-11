"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithPassword } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { useActiveLocation } from "./location-provider";
import { Wordmark } from "./wordmark";

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
  const inputClass = "dq-input rounded-dqmd px-4 py-3 text-[15px] w-full";
  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="mb-7">
        <Wordmark />
      </div>
      <h1 className="font-heading text-3xl mb-1 font-bold text-navy">{isSignup ? "Criar conta" : "Entrar"}</h1>
      <p className="text-sm mb-7 text-muted">
        {isSignup
          ? (isAdvertiser ? "Crie a conta da sua empresa para anunciar no Daquii." : `Anuncie o seu serviço em ${activeLocation.name}.`)
          : (isAdvertiser ? "Acesse o painel do anunciante." : "Acesse o seu painel de profissional.")}
      </p>

      <div className="flex flex-col gap-3">
        {isSignup && (
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className={inputClass} />
        )}
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail" className={inputClass} />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className={inputClass}
        />
        {msg && <p className="text-sm text-pink">{msg}</p>}
        {info && <p className="text-sm rounded-dqmd px-3 py-2" style={{ background: "rgba(0,194,187,.10)", color: "var(--teal)" }}>{info}</p>}
        <button
          onClick={submit}
          disabled={busy}
          className="rounded-dqfull py-3.5 font-bold text-white transition hover:bg-teal-dark active:scale-95 disabled:opacity-60"
          style={{ background: "var(--teal)" }}
        >
          {busy ? "Aguarde..." : isSignup ? "Criar conta" : "Entrar"}
        </button>
      </div>

      <p className="text-sm mt-6 text-center text-muted">
        {isSignup ? (
          <>Já tem conta? <Link href={isAdvertiser ? "/anunciante/entrar" : "/entrar"} className="font-semibold text-teal">Entrar</Link></>
        ) : (
          <>Ainda não tem conta? <Link href={isAdvertiser ? "/anunciante/criar-conta" : "/criar-conta"} className="font-semibold text-teal">Criar conta</Link></>
        )}
      </p>
      <p className="text-xs mt-3 text-center text-muted">
        {isAdvertiser ? (
          <>É profissional de serviços? <Link href="/entrar" className="underline">Entrar no painel de profissional</Link></>
        ) : (
          <>Quer anunciar a sua empresa? <Link href="/anunciante/entrar" className="underline">Painel do anunciante</Link></>
        )}
      </p>
    </div>
  );
}
