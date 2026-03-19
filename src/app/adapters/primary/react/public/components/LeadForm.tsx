"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";

type Props = {
  onSubmit: (input: { firstName: string; email: string; message: string }) => Promise<unknown>;
  success: boolean;
  error: string;
};

export function LeadForm({ onSubmit, success, error }: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await onSubmit({ firstName, email, message });
    setSubmitting(false);

    if ((result as { ok?: boolean })?.ok) {
      setFirstName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <Input
        placeholder="Ton prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Ton email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        className="min-h-28 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none"
        placeholder="Ton message (optionnel)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" disabled={submitting}>
        {submitting ? "Envoi..." : "Me contacter"}
      </Button>

      {success ? <p className="text-sm text-green-600">Merci, ton message a bien été envoyé.</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
