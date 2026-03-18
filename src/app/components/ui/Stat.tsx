type Props = {
	label: string;
	value: string | number;
};

export function Stat({ label, value }: Props) {
	return (
		<div className="rounded-2xl border border-neutral-200 bg-white p-4">
			<div className="text-xs text-neutral-500">{label}</div>
			<div className="mt-1 text-2xl font-semibold">{value}</div>
		</div>
	);
}
