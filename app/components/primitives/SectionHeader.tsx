interface SectionHeaderProps {
  sub: string;
  children: React.ReactNode;
}

export function SectionHeader({ sub, children }: SectionHeaderProps) {
  return (
    <header className="max-w-[640px]">
      <div className="w-[80px] h-[2px] bg-il-orange mb-6" />
      <p className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-sm mb-3">
        {sub}
      </p>
      <h2 className="font-display font-bold text-il-blue tracking-tight text-[clamp(2.5rem,5vw,4rem)] leading-[1.1]">
        {children}
      </h2>
    </header>
  );
}
