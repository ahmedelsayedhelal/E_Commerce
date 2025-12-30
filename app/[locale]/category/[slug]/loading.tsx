export default function Loading() {
  return (
    <section className="max-w-6xl mx-auto py-16">
      <div className="mb-8 h-8 w-48 bg-muted rounded animate-pulse" />

      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-80 rounded-lg border bg-muted animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
