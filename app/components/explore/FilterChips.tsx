"use client";

interface FilterChipsProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function FilterChips({ label, options, value, onChange }: FilterChipsProps) {
  function toggle(opt: string) {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-display font-medium text-il-storm-30 uppercase tracking-widest text-xs shrink-0">
        {label}
      </span>
      {options.map((opt) => {
        const active = value.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`font-body text-xs px-2.5 py-1 border rounded-[2px] transition-colors ${
              active
                ? "bg-il-blue text-white border-il-blue"
                : "bg-white text-il-storm-10 border-il-storm-70 hover:border-il-blue"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
