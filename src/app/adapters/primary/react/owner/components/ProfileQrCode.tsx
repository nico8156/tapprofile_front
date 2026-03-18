"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

type Props = {
	url: string;
};

export function ProfileQrCode({ url }: Props) {
	const [src, setSrc] = useState("");

	useEffect(() => {
		QRCode.toDataURL(url).then(setSrc);
	}, [url]);

	if (!src) return <div>QR code...</div>;

	return <img src={src} alt="QR code du profil" className="h-40 w-40 rounded-xl border" />;
}
