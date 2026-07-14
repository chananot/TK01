export function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>;
}

export function BagIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9"/></svg>;
}

export function MenuIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
}

export function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>;
}

const shoeStyles: Record<string, { upper: string; sole: string; accent: string; rotate: string }> = {
  "aeroflow-sole": { upper: "#f4f2eb", sole: "#11110f", accent: "#c9ff12", rotate: "-5deg" },
  "aeroflow-knit": { upper: "#11110f", sole: "#f4f2eb", accent: "#c9ff12", rotate: "4deg" },
  "terra-profile": { upper: "#1c1c1a", sole: "#c9ff12", accent: "#738553", rotate: "-7deg" },
  "terra-lug": { upper: "#283222", sole: "#11110f", accent: "#c9ff12", rotate: "6deg" },
  "terra-upper": { upper: "#11110f", sole: "#767b62", accent: "#f4f2eb", rotate: "-2deg" },
  "studio-profile": { upper: "#e5744c", sole: "#11110f", accent: "#f4f2eb", rotate: "-6deg" },
  "studio-heel": { upper: "#f4f2eb", sole: "#e5744c", accent: "#11110f", rotate: "5deg" },
  "studio-base": { upper: "#11110f", sole: "#f4f2eb", accent: "#e5744c", rotate: "-1deg" },
};

export function DecorativeShoe({ variant, alt = "" }: { variant: string; alt?: string }) {
  const style = shoeStyles[variant] ?? shoeStyles["aeroflow-sole"];
  return (
    <svg className="shoe-illustration" role="img" aria-label={alt} viewBox="0 0 520 300" style={{ rotate: style.rotate }}>
      <path fill={style.upper} d="M81 166c72-43 118-87 189-84 55 2 91 44 139 56 25 6 50 5 67 28 10 14 10 36-4 49-28 26-94 26-151 22-91-7-180-19-259-34-31-6-29-23 19-37Z"/>
      <path fill={style.sole} d="M52 198c86 20 205 37 325 38 58 0 100-7 117-23 9 16 2 35-18 45-44 23-167 15-271 0-69-10-129-22-166-34-20-7-16-32 13-26Z"/>
      <path fill={style.accent} d="M161 158c51-27 80-43 119-42 22 1 41 9 59 22-50 12-99 25-151 37-18 4-35-7-27-17Z"/>
      <path fill="none" stroke={style.accent} strokeWidth="8" strokeLinecap="round" d="M228 127c32 25 71 39 118 43M211 153l83 15M184 176l115 19"/>
      <path fill={style.accent} d="M385 221h30l-18 18h-34l22-18Zm-82-2h31l-15 18h-34l18-18Zm-89-9h31l-11 17h-35l15-17Z"/>
    </svg>
  );
}
