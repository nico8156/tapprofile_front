import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/app/components/ui/Card";

type ProductLandingVariant = "control" | "pain" | "outcome";

const controlSteps = [
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

const controlBenefits = [
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
const painPoints = ["Vous oubliez les noms", "Vous perdez les cartes", "Vous ne recontactez jamais"];
const painSolution = [
	{
		title: "Un badge pret a montrer",
		description: "Votre QR code remplace les echanges improvises et les cartes qui disparaissent dans une poche.",
	},
	{
		title: "Un scan qui garde la trace",
		description: "La connexion est enregistree tout de suite, sans ressaisie ni recherche LinkedIn plus tard.",
	},
	{
		title: "Une liste exploitable apres l'evenement",
		description: "Vous retrouvez vos contacts dans le dashboard pendant que la rencontre est encore fraiche.",
	},
];
const outcomeMoments = [
	"Vous discutez",
	"Vous scannez",
	"C'est enregistre",
];
const outcomeHighlights = [
	{
		title: "Zero carte de visite",
		description: "Le badge devient le point d'entree naturel pour echanger en quelques secondes.",
	},
	{
		title: "Zero friction apres",
		description: "Les contacts sont deja ranges, vous n'avez rien a recopier en rentrant.",
	},
];

type ProductLandingPageProps = {
	variant?: ProductLandingVariant;
};

export function ProductLandingPage({ variant = "control" }: ProductLandingPageProps) {
	if (variant === "pain") {
		return <PainDrivenLanding />;
	}

	if (variant === "outcome") {
		return <ExperienceLanding />;
	}

	return <ControlLanding />;
}

function BaseLayout({ children }: { children: ReactNode }) {
	return (
		<main
			className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f7f8fc_52%,_#eef2ff_100%)] text-neutral-950"
			style={{ fontFamily: "\"Avenir Next\", \"Segoe UI\", sans-serif" }}
		>
			<div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-4 sm:px-6">{children}</div>
		</main>
	);
}

function SiteHeader({
	primaryHref = "/create",
	primaryLabel = "Creer mon badge",
}: {
	primaryHref?: string;
	primaryLabel?: string;
}) {
	return (
		<header className="flex items-center justify-between py-2">
			<Link href="/" className="text-sm font-semibold tracking-[0.18em] text-neutral-500 uppercase">
				TapProfile
			</Link>
			<Link
				href={primaryHref}
				className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-[0_12px_30px_rgba(17,24,39,0.06)]"
			>
				{primaryLabel}
			</Link>
		</header>
	);
}

function ControlLanding() {
	return (
		<BaseLayout>
			<SiteHeader />

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
									<p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">Badge</p>
									<h2 className="mt-3 text-2xl font-bold">Sophie Martin</h2>
									<p className="mt-1 text-sm text-neutral-300">Partnerships • Startup meetup</p>
								</div>
								<div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
									Live
								</div>
							</div>
							<div className="mt-5 grid grid-cols-[96px_1fr] gap-3">
								<QrPreview />
								<div className="space-y-3">
									<div className="rounded-2xl bg-white/6 p-3">
										<p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Pendant l'evenement</p>
										<p className="mt-2 text-sm text-neutral-200">
											Montrez votre QR code et laissez l'autre personne vous ajouter.
										</p>
									</div>
									<div className="flex gap-2">
										<MetricCard label="Scans" value="24" />
										<MetricCard label="Connexions" value="18" accent />
									</div>
								</div>
							</div>
						</div>
						<div className="mt-4 grid grid-cols-2 gap-3">
							<MiniPanel label="Scan" title="Un geste simple" />
							<MiniPanel label="Apres" title="Tous vos contacts retrouves" accent />
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
							{controlSteps.map((step) => (
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
						{controlBenefits.map((benefit) => (
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
							<h2 className="text-3xl font-bold tracking-[-0.04em]">
								Concu pour les moments ou les rencontres vont vite
							</h2>
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
		</BaseLayout>
	);
}

function PainDrivenLanding() {
	return (
		<BaseLayout>
			<SiteHeader primaryLabel="Garder mes contacts" />

			<section className="grid gap-4 py-6 md:grid-cols-[1.15fr_0.85fr] md:items-start md:py-10">
				<div className="space-y-5">
					<div className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
						Apres chaque meetup, des contacts se perdent
					</div>
					<div className="space-y-3">
						<h1 className="max-w-xl text-4xl font-extrabold tracking-[-0.06em] text-balance sm:text-6xl">
							Vous perdez vos contacts apres chaque meetup ?
						</h1>
						<p className="max-w-lg text-base leading-7 text-neutral-600 sm:text-lg">
							Cartes de visite oubliees, LinkedIn jamais retrouves. Gardez chaque contact en un scan.
						</p>
					</div>
					<div className="flex flex-col gap-3 sm:flex-row">
						<Link
							href="/create"
							className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-neutral-950 px-5 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(17,24,39,0.18)]"
						>
							Garder mes contacts
						</Link>
						<div className="inline-flex min-h-12 items-center rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm text-neutral-600">
							Le probleme commence apres l'evenement, pas pendant.
						</div>
					</div>
				</div>

				<Card>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold text-rose-700">Ce qui fuit apres un meetup</p>
							<p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Trop souvent</p>
						</div>
						<div className="space-y-3">
							{painPoints.map((point, index) => (
								<div
									key={point}
									className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 px-4 py-4"
								>
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-700">
										{index + 1}
									</div>
									<p className="pt-1 text-sm font-medium text-neutral-800">{point}</p>
								</div>
							))}
						</div>
					</div>
				</Card>
			</section>

			<section className="py-2">
				<div className="rounded-[2rem] border border-rose-100 bg-white p-5 shadow-sm">
					<div className="space-y-2">
						<p className="text-sm font-semibold text-rose-700">Ce qui se passe aujourd'hui</p>
						<h2 className="text-3xl font-bold tracking-[-0.04em] text-neutral-950">
							Vous rencontrez du monde, puis tout se dilue
						</h2>
					</div>
					<div className="mt-5 grid gap-3">
						{painPoints.map((point) => (
							<div key={point} className="rounded-2xl bg-neutral-950 px-4 py-4 text-white">
								<p className="text-base font-semibold">{point}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-4">
				<div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
					<Card>
						<div className="space-y-4">
							<p className="text-sm font-semibold text-sky-700">La solution simple</p>
							<h2 className="text-3xl font-bold tracking-[-0.04em] text-neutral-950">
								TapProfile remplace les oublis par une action claire
							</h2>
							<p className="text-sm leading-6 text-neutral-600">
								Un badge, un QR code, une connexion enregistree. Vous sortez du meetup avec une vraie liste
								de contacts, pas avec des intentions.
							</p>
							<Link
								href="/create"
								className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(2,132,199,0.24)]"
							>
								Garder mes contacts
							</Link>
						</div>
					</Card>

					<div className="grid gap-3">
						{painSolution.map((item) => (
							<div
								key={item.title}
								className="rounded-[1.75rem] border border-neutral-200 bg-white px-5 py-5 shadow-sm"
							>
								<h3 className="text-lg font-semibold text-neutral-950">{item.title}</h3>
								<p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="pb-10 pt-2">
				<div className="rounded-[2rem] bg-neutral-950 px-5 py-8 text-white">
					<p className="text-sm font-semibold text-rose-200">Apres l'evenement</p>
					<h2 className="mt-3 max-w-md text-3xl font-bold tracking-[-0.05em]">
						Retrouvez qui vous avez croise avant que le meetup soit deja loin.
					</h2>
					<div className="mt-6 grid gap-3 sm:grid-cols-3">
						<DarkStat title="Scan" value="1 geste" />
						<DarkStat title="Perte" value="0 carte" />
						<DarkStat title="Relance" value="plus simple" />
					</div>
				</div>
			</section>
		</BaseLayout>
	);
}

function ExperienceLanding() {
	return (
		<BaseLayout>
			<SiteHeader />

			<section className="overflow-hidden rounded-[2rem] border border-sky-100 bg-[linear-gradient(135deg,_#f0f9ff_0%,_#ffffff_52%,_#ecfeff_100%)] px-5 py-6 md:px-8 md:py-8">
				<div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
					<div className="space-y-5">
						<div className="inline-flex rounded-full border border-white bg-white/90 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm">
							Une experience de meetup plus fluide
						</div>
						<div className="space-y-3">
							<h1 className="max-w-xl text-4xl font-extrabold tracking-[-0.06em] text-balance sm:text-6xl">
								Un scan. Et le contact est enregistre.
							</h1>
							<p className="max-w-lg text-base leading-7 text-neutral-600 sm:text-lg">
								Pas de carte de visite. Pas d'effort. Juste une connexion instantanee.
							</p>
						</div>
						<Link
							href="/create"
							className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(2,132,199,0.24)]"
						>
							Creer mon badge
						</Link>
					</div>

					<div className="grid gap-3">
						<div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-4 shadow-[0_20px_50px_rgba(14,116,144,0.10)]">
							<p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Flux</p>
							<div className="mt-4 flex items-center gap-3">
								{outcomeMoments.map((moment, index) => (
									<div key={moment} className="flex min-w-0 flex-1 items-center gap-3">
										<div className="rounded-2xl bg-sky-600 px-3 py-3 text-sm font-semibold text-white">{moment}</div>
										{index < outcomeMoments.length - 1 ? (
											<div className="h-px flex-1 bg-sky-200" aria-hidden="true" />
										) : null}
									</div>
								))}
							</div>
						</div>
						<div className="grid gap-3 sm:grid-cols-2">
							<div className="rounded-[1.75rem] bg-neutral-950 p-4 text-white">
								<p className="text-xs uppercase tracking-[0.18em] text-sky-200">Badge</p>
								<h2 className="mt-3 text-2xl font-bold">Camille Leroy</h2>
								<p className="mt-1 text-sm text-neutral-300">Product • Community night</p>
								<div className="mt-4">
									<QrPreview dark />
								</div>
							</div>
							<div className="grid gap-3">
								<MiniPanel label="Connexion" title="Instantanee" accent />
								<MiniPanel label="Apres" title="Deja rangee" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-4">
				<div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
					<Card>
						<div className="space-y-4">
							<p className="text-sm font-semibold text-sky-700">Imaginez un meetup</p>
							<h2 className="text-3xl font-bold tracking-[-0.04em] text-neutral-950">
								Vous discutez. Vous scannez. C'est enregistre.
							</h2>
							<p className="text-sm leading-6 text-neutral-600">
								La conversation continue, mais l'echange est deja fait. Vous n'avez rien a noter, rien a
								retrouver plus tard.
							</p>
						</div>
					</Card>

					<div className="grid gap-3">
						{outcomeMoments.map((moment, index) => (
							<div
								key={moment}
								className="flex items-center gap-4 rounded-[1.75rem] border border-neutral-200 bg-white px-5 py-5 shadow-sm"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
									{index + 1}
								</div>
								<div>
									<h3 className="text-lg font-semibold text-neutral-950">{moment}</h3>
									<p className="mt-1 text-sm text-neutral-600">{getOutcomeStepDescription(index)}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-2">
				<div className="grid gap-3 md:grid-cols-2">
					{outcomeHighlights.map((highlight) => (
						<div
							key={highlight.title}
							className="rounded-[1.9rem] border border-sky-100 bg-white px-5 py-6 shadow-sm"
						>
							<p className="text-sm font-semibold text-sky-700">{highlight.title}</p>
							<p className="mt-3 text-sm leading-6 text-neutral-600">{highlight.description}</p>
						</div>
					))}
				</div>
			</section>

			<section className="pb-10 pt-4">
				<div className="rounded-[2rem] border border-sky-100 bg-white px-5 py-8 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
					<p className="text-sm font-semibold text-sky-700">Pret pour un echange plus fluide ?</p>
					<h2 className="mx-auto mt-3 max-w-md text-3xl font-bold tracking-[-0.05em] text-neutral-950">
						Creez votre badge avant le prochain meetup.
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
		</BaseLayout>
	);
}

function QrPreview({ dark = false }: { dark?: boolean }) {
	return (
		<div className={`grid h-24 w-24 grid-cols-6 gap-1 rounded-2xl p-2 ${dark ? "bg-white" : "bg-white"}`}>
			{Array.from({ length: 36 }).map((_, index) => {
				const filled = [0, 1, 4, 5, 6, 8, 10, 12, 13, 15, 18, 20, 21, 22, 25, 27, 30, 31, 34, 35].includes(index);

				return (
					<div
						key={index}
						className={filled ? "rounded-[3px] bg-neutral-950" : `rounded-[3px] ${dark ? "bg-sky-100" : "bg-sky-100"}`}
					/>
				);
			})}
		</div>
	);
}

function MetricCard({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
	return (
		<div className={`flex-1 rounded-2xl p-3 ${accent ? "bg-sky-400/12" : "bg-white/6"}`}>
			<p className={`text-xs ${accent ? "text-sky-200" : "text-neutral-400"}`}>{label}</p>
			<p className={`mt-1 text-xl font-semibold ${accent ? "text-white" : "text-white"}`}>{value}</p>
		</div>
	);
}

function MiniPanel({ label, title, accent = false }: { label: string; title: string; accent?: boolean }) {
	return (
		<div className={`rounded-2xl border p-3 ${accent ? "border-sky-100 bg-sky-50" : "border-neutral-100 bg-neutral-50"}`}>
			<p className={`text-xs uppercase tracking-[0.18em] ${accent ? "text-sky-600" : "text-neutral-400"}`}>{label}</p>
			<p className="mt-2 text-sm font-semibold text-neutral-900">{title}</p>
		</div>
	);
}

function DarkStat({ title, value }: { title: string; value: string }) {
	return (
		<div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
			<p className="text-xs uppercase tracking-[0.18em] text-neutral-400">{title}</p>
			<p className="mt-2 text-lg font-semibold text-white">{value}</p>
		</div>
	);
}

function getOutcomeStepDescription(index: number) {
	if (index === 0) {
		return "Vous rencontrez quelqu'un sans casser le rythme avec une carte de visite.";
	}

	if (index === 1) {
		return "Le QR code fait l'echange en un geste naturel.";
	}

	return "Le contact apparait ensuite dans votre espace, deja pret a etre retrouve.";
}
