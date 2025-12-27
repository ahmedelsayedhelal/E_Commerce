import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-6 text-muted-foreground">
        Page not found
      </p>

      <Link
        href="/"
        className="rounded-md bg-primary px-6 py-2 text-white"
      >
        Back Home
      </Link>
    </section>
  );
}
