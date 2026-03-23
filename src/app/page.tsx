import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">TapProfile</h1>
      <p className="text-sm text-neutral-600">MVP badge meetup branche sur le backend reel.</p>
      <Link className="underline" href="/create">
        Creer mon badge
      </Link>
      <p className="text-xs text-neutral-400">
        Dashboard : /dashboard/{"{profileId}"}
      </p>
    </main>
  );
}
