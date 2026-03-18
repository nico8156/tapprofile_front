type Props = {
	displayName: string;
	headline: string;
	bio: string;
};

export function ProfileHero({ displayName, headline, bio }: Props) {
	return (
		<section className="space-y-3">
			<h1 className="text-3xl font-bold">{displayName}</h1>
			<p className="text-lg text-neutral-700">{headline}</p>
			<p className="text-sm text-neutral-600">{bio}</p>
		</section>
	);
}
