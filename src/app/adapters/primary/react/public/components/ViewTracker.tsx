"use client";

import { useEffect } from "react";

type Props = {
	onTrack: () => Promise<void>;
};

export function ViewTracker({ onTrack }: Props) {
	useEffect(() => {
		void onTrack();
	}, [onTrack]);

	return null;
}
