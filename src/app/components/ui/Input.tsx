import { forwardRef, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input({ className = "", ...props }, ref) {
	return (
		<input
			ref={ref}
			className={`w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-base text-neutral-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 ${className}`}
			{...props}
		/>
	);
});
