import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Damiir's Treats | Bulk Candy Wholesale",
  description: "Bulk candy wholesale for retailers and event planners. Free shipping over $75.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <a href="/" className="text-xl font-bold text-blue-600">Damiir&apos;s Treats</a>
            <nav className="flex gap-4 text-sm font-medium">
              <a href="/" className="hover:text-blue-600">Home</a>
              <a href="/products" className="hover:text-blue-600">Shop</a>
              <a href="/cart" className="hover:text-blue-600">Cart</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t bg-gray-50 py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Damiir&apos;s Treats. Bulk candy wholesale.
        </footer>
      </body>
    </html>
  );
}
