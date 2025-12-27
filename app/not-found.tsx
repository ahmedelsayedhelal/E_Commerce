import "./globals.css"
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notfound-bg flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="glitch text-8xl font-extrabold mb-4">404</h1>

      <p className="mb-8 text-lg text-muted-foreground max-w-md">
        Oops! The page you’re looking for doesn’t exist  
        or may have been moved.
      </p>

      <Link
        href="/"
        className="rounded-full bg-black text-white px-8 py-3 text-xl font-semibold  transition hover:scale-105 hover:shadow-lg"
      >
         Back Home
      </Link>
    </section>
  );
}
