const LIGHT = { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#0B1D3A", letterSpacing: "-0.02em" } as const;
const DARK = { ...LIGHT, color: "#FFFFFF" } as const;

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return <span style={dark ? DARK : LIGHT}>Daquii</span>;
}
