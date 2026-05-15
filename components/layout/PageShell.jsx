import { Navbar } from "./Navbar";

export function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
