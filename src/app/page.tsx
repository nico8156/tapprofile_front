import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">TapProfile</h1>
      <p className="text-sm text-neutral-600">MVP front branché sur le backend réel.</p>
      <Link className="underline" href="/p/demo">
        Voir un profil public demo
      </Link>
      <p className="text-xs text-neutral-400">
        Dashboard : /dashboard/{"{profileId}"}
      </p>
    </main>
  );
}
