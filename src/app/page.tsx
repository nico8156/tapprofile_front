import Link from "next/link";

export default function HomePage() {
	return (
		<main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-4">
			<h1 className="text-3xl font-bold">TapProfile</h1>
			<Link className="underline" href="/dashboard">
				Aller au dashboard
			</Link>
			<Link className="underline" href="/p/demo">
				Voir un profil public demo
			</Link>
		</main>
	);
}
