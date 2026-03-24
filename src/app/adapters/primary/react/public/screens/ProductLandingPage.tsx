import Link from "next/link";
import { Card } from "@/app/components/ui/Card";

const steps = [
	{
		eyebrow: "01",
		title: "Creez votre badge",
		description: "Ajoutez votre nom et votre headline en quelques secondes.",
	},
	{
		eyebrow: "02",
		title: "Faites-vous scanner",
		description: "Montrez votre QR code pendant l'evenement pour echanger vos contacts.",
	},
	{
		eyebrow: "03",
		title: "Retrouvez vos contacts",
		description: "Gardez toutes vos connexions au meme endroit apres le meetup.",
	},
];

const benefits = [
	{
		title: "Plus simple qu'une carte de visite",
		description: "Un badge clair, un QR code, un scan. Pas de friction, pas de papier.",
	},
	{
		title: "Aucun contact perdu",
		description: "Chaque scan devient une connexion que vous pouvez retrouver apres l'evenement.",
	},
	{
		title: "Vos connexions centralisees",
		description: "Consultez vos contacts depuis votre dashboard sans chercher dans vos notes.",
	},
];

const useCases = ["Meetups", "Salons", "Conferences", "Networking"];

export function ProductLandingPage() {
	return (
		<main
			className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f7f8fc_52%,_#eef2ff_100%)] text-neutral-950"
			style={{ fontFamily: "\"Avenir Next\", \"Segoe UI\", sans-serif" }}
		>
			<div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-4 sm:px-6">
				<header className="flex items-center justify-between py-2">
					<Link href="/" className="text-sm font-semibold tracking-[0.18em] text-neutral-500 uppercase">
						TapProfile
					</Link>
					<Link
						href="/create"
						className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-[0_12px_30px_rgba(17,24,39,0.06)]"
					>
						Creer mon badge
					</Link>
				</header>

				<section className="grid gap-6 py-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-12">
					<div className="space-y-5">
						<div className="inline-flex rounded-full border border-sky-100 bg-white/80 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
							Echanger ses contacts en meetup aussi facilement qu'un QR code
						</div>
						<div className="space-y-4">
							<h1 className="max-w-xl text-5xl font-extrabold tracking-[-0.06em] text-balance sm:text-6xl">
								Echangez vos contacts en 1 scan
							</h1>
							<p className="max-w-lg text-base leading-7 text-neutral-600 sm:text-lg">
								Creez votre badge, montrez votre QR code, retrouvez vos connexions apres l'evenement.
							</p>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Link
								href="/create"
								className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(2,132,199,0.28)]"
							>
								Creer mon badge
							</Link>
							<Link
								href="/"
								className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-base font-semibold text-neutral-900 shadow-[0_12px_30px_rgba(17,24,39,0.06)]"
							>
								Voir la demo
							</Link>
						</div>
					</div>

					<div className="relative mx-auto w-full max-w-sm">
						<div className="absolute inset-x-8 top-3 h-28 rounded-full bg-sky-200/40 blur-3xl" />
						<div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
							<div className="rounded-[1.6rem] bg-neutral-950 p-3 text-white shadow-inner">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
											Badge
										</p>
										<h2 className="mt-3 text-2xl font-bold">Sophie Martin</h2>
										<p className="mt-1 text-sm text-neutral-300">Partnerships • Startup meetup</p>
									</div>
									<div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
										Live
									</div>
								</div>
								<div className="mt-5 grid grid-cols-[96px_1fr] gap-3">
									<div className="grid h-24 w-24 grid-cols-6 gap-1 rounded-2xl bg-white p-2">
										{Array.from({ length: 36 }).map((_, index) => {
											const filled = [0, 1, 4, 5, 6, 8, 10, 12, 13, 15, 18, 20, 21, 22, 25, 27, 30, 31, 34, 35].includes(index);

											return (
												<div
													key={index}
													className={filled ? "rounded-[3px] bg-neutral-950" : "rounded-[3px] bg-sky-100"}
												/>
											);
										})}
									</div>
									<div className="space-y-3">
										<div className="rounded-2xl bg-white/6 p-3">
											<p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Pendant l'evenement</p>
											<p className="mt-2 text-sm text-neutral-200">Montrez votre QR code et laissez l'autre personne vous ajouter.</p>
										</div>
										<div className="flex gap-2">
											<div className="flex-1 rounded-2xl bg-white/6 p-3">
												<p className="text-xs text-neutral-400">Scans</p>
												<p className="mt-1 text-xl font-semibold">24</p>
											</div>
											<div className="flex-1 rounded-2xl bg-sky-400/12 p-3">
												<p className="text-xs text-sky-200">Connexions</p>
												<p className="mt-1 text-xl font-semibold text-white">18</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-4 grid grid-cols-2 gap-3">
								<div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-3">
									<p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Scan</p>
									<p className="mt-2 text-sm font-semibold text-neutral-900">Un geste simple</p>
								</div>
								<div className="rounded-2xl border border-sky-100 bg-sky-50 p-3">
									<p className="text-xs uppercase tracking-[0.18em] text-sky-600">Apres</p>
									<p className="mt-2 text-sm font-semibold text-neutral-900">Tous vos contacts retrouves</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-4">
					<Card>
						<div className="space-y-5">
							<div className="space-y-2">
								<p className="text-sm font-semibold text-sky-700">Comment ca marche</p>
								<h2 className="text-3xl font-bold tracking-[-0.04em]">Trois etapes, rien de plus</h2>
							</div>
							<div className="grid gap-3 md:grid-cols-3">
								{steps.map((step) => (
									<div key={step.eyebrow} className="rounded-3xl border border-neutral-100 bg-neutral-50 p-5">
										<p className="text-xs font-semibold tracking-[0.2em] text-sky-600 uppercase">{step.eyebrow}</p>
										<h3 className="mt-4 text-lg font-semibold text-neutral-900">{step.title}</h3>
										<p className="mt-2 text-sm leading-6 text-neutral-600">{step.description}</p>
									</div>
								))}
							</div>
						</div>
					</Card>
				</section>

				<section className="py-2">
					<div className="space-y-4">
						<div className="space-y-2">
							<p className="text-sm font-semibold text-sky-700">Pourquoi TapProfile</p>
							<h2 className="text-3xl font-bold tracking-[-0.04em]">Le bon reflexe pour un evenement</h2>
						</div>
						<div className="grid gap-3 md:grid-cols-3">
							{benefits.map((benefit) => (
								<Card key={benefit.title}>
									<h3 className="text-lg font-semibold text-neutral-900">{benefit.title}</h3>
									<p className="mt-2 text-sm leading-6 text-neutral-600">{benefit.description}</p>
								</Card>
							))}
						</div>
					</div>
				</section>

				<section className="py-2">
					<Card>
						<div className="space-y-4">
							<div className="space-y-2">
								<p className="text-sm font-semibold text-sky-700">Ou l'utiliser</p>
								<h2 className="text-3xl font-bold tracking-[-0.04em]">Concu pour les moments ou les rencontres vont vite</h2>
							</div>
							<div className="flex flex-wrap gap-3">
								{useCases.map((useCase) => (
									<div
										key={useCase}
										className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm"
									>
										{useCase}
									</div>
								))}
							</div>
						</div>
					</Card>
				</section>

				<section className="pb-10 pt-4">
					<div className="rounded-[2rem] border border-sky-100 bg-white px-5 py-8 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
						<p className="text-sm font-semibold text-sky-700">Pret pour votre prochain evenement ?</p>
						<h2 className="mx-auto mt-3 max-w-md text-3xl font-bold tracking-[-0.05em] text-neutral-950">
							Creez votre badge et commencez a echanger vos contacts tout de suite
						</h2>
						<div className="mt-6">
							<Link
								href="/create"
								className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-neutral-950 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(17,24,39,0.18)]"
							>
								Creer mon badge
							</Link>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
