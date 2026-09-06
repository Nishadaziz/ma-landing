export function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7C17.18 3.03 14.68 2 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.81c0 4.53-3.7 8.23-8.23 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.25-4.37c0-4.53 3.7-8.23 8.23-8.23Zm-4.52 4.4c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.16Z" />
    </svg>
  );
}

export function WhatsAppButton({ href, children, size = "lg", className = "" }) {
  const sizing =
    size === "lg"
      ? "px-8 py-5 text-lg sm:text-xl"
      : "px-7 py-4 text-base sm:text-lg";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`animate-pulse-glow group relative flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] font-extrabold text-white shadow-[0_20px_45px_rgba(37,211,102,0.45)] transition hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-[0_24px_55px_rgba(37,211,102,0.55)] ${sizing} ${className}`}
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
      {children}
    </a>
  );
}
