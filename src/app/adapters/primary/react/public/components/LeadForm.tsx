"use client";

import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useState } from "react";

type Props = {
	ctaLabel: string;
	onSubmit: (input: { name: string; email: string }) => Promise<unknown>;
	success: boolean;
	error: string;
};

export function LeadForm({ ctaLabel, onSubmit, success, error }: Props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		await onSubmit({ name, email });
		setSubmitting(false);
	};

	return (
		<form className="space-y-3" onSubmit={handleSubmit}>
			<Input
				placeholder="Ton prénom"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				type="email"
				placeholder="Ton email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Button type="submit" disabled={submitting}>
				{submitting ? "Envoi..." : ctaLabel}
			</Button>

			{success ? <p className="text-sm text-green-600">Merci, c’est envoyé.</p> : null}
			{error ? <p className="text-sm text-red-600">{error}</p> : null}
		</form>
	);
}
