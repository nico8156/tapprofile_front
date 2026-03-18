import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button({ children, className = "", ...props }: Props) {
	return (
		<button
			className={`inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium border border-black bg-black text-white disabled:opacity-50 ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
