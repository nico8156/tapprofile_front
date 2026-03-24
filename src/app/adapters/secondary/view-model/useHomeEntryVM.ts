"use client";

import { useEffect, useState } from "react";
import { readLocalIdentity, type LocalIdentity } from "@/app/adapters/secondary/browser/localIdentity";

export function useHomeEntryVM() {
	const [identity, setIdentity] = useState<LocalIdentity | null>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setIdentity(readLocalIdentity());
		setReady(true);
	}, []);

	return {
		ready,
		identity,
	};
}
