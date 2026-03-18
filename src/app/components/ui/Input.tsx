import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
	return (
		<input
			className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none"
			{...props}
		/>
	);
}
