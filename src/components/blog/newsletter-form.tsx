"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Newsletter signup coming soon!");
      }}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        placeholder="SEU@EMAIL.COM"
        required
        className="flex-1 px-4 py-4 bg-transparent border-b-2 border-[--border] text-[--foreground] placeholder:text-[--muted] text-sm font-bold uppercase tracking-tighter focus:outline-none focus:border-[--accent] transition-colors"
      />
      <button
        type="submit"
        className="px-8 py-4 bg-[--accent] text-[--accent-foreground] font-bold uppercase tracking-tighter text-sm hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
      >
        ASSINAR
      </button>
    </form>
  );
}
