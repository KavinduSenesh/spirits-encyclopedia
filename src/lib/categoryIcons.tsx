export function getCategoryIcon(categoryId: string) {
  const icons: Record<string, React.ReactNode> = {
    arrack: (
      <svg viewBox="0 0 36 36" stroke="currentColor" fill="none" strokeWidth={1.5}>
        <path d="M12 6h12l-2 24H14L12 6z" />
        <path d="M14 6c0-2 2-3 4-3s4 1 4 3" />
        <path d="M15 14h6" />
      </svg>
    ),
    beer: (
      <svg viewBox="0 0 36 36" stroke="currentColor" fill="none" strokeWidth={1.5}>
        <path d="M10 8h12v22a2 2 0 01-2 2H12a2 2 0 01-2-2V8z" />
        <path d="M10 8l1-4h10l1 4" />
        <path d="M22 14h4a2 2 0 012 2v4a2 2 0 01-2 2h-4" />
        <path d="M13 12h6" strokeDasharray="2 2" />
      </svg>
    ),
    stout: (
      <svg viewBox="0 0 36 36" stroke="currentColor" fill="none" strokeWidth={1.5}>
        <path d="M11 4h14l-1 8c0 4-3 6-6 6s-6-2-6-6l-1-8z" />
        <path d="M14 18v10a4 4 0 004 4v0a4 4 0 004-4V18" />
        <path d="M12 8h12" strokeDasharray="3 2" />
      </svg>
    ),
    gin: (
      <svg viewBox="0 0 36 36" stroke="currentColor" fill="none" strokeWidth={1.5}>
        <path d="M14 4h8l3 12c0 4-3 6-7 6s-7-2-7-6l3-12z" />
        <path d="M16 22v8" />
        <path d="M20 22v8" />
        <path d="M12 30h12" />
      </svg>
    ),
    vodka: (
      <svg viewBox="0 0 36 36" stroke="currentColor" fill="none" strokeWidth={1.5}>
        <path d="M14 4h8v4l2 22a2 2 0 01-2 2h-8a2 2 0 01-2-2L14 8V4z" />
        <path d="M14 4h8" />
        <path d="M13 18h10" />
        <path d="M14 8h8" />
      </svg>
    ),
    whisky: (
      <svg viewBox="0 0 36 36" stroke="currentColor" fill="none" strokeWidth={1.5}>
        <path d="M10 12h16v16a4 4 0 01-4 4h-8a4 4 0 01-4-4V12z" />
        <path d="M10 12l2-8h12l2 8" />
        <path d="M10 20h16" />
      </svg>
    ),
    rum: (
      <svg viewBox="0 0 36 36" stroke="currentColor" fill="none" strokeWidth={1.5}>
        <path d="M13 10h10v20a2 2 0 01-2 2h-6a2 2 0 01-2-2V10z" />
        <path d="M15 10V6a2 2 0 012-2h2a2 2 0 012 2v4" />
        <path d="M16 4h4v2h-4z" />
        <path d="M13 16h10" />
      </svg>
    ),
    wine: (
      <svg viewBox="0 0 36 36" stroke="currentColor" fill="none" strokeWidth={1.5}>
        <path d="M12 4h12l-1 10c0 4-2.5 6-5 6s-5-2-5-6l-1-10z" />
        <path d="M18 20v8" />
        <path d="M13 28h10" />
        <path d="M13 10h10" />
      </svg>
    ),
  };

  return icons[categoryId] || (
    <svg viewBox="0 0 36 36" stroke="currentColor" fill="none" strokeWidth={1.5}>
      <circle cx="18" cy="18" r="12" />
    </svg>
  );
}
