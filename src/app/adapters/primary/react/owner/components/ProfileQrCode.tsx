"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type Props = {
  url: string;
};

export function ProfileQrCode({ url }: Props) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    QRCode.toDataURL(url).then(setSrc).catch(() => setSrc(""));
  }, [url]);

  if (!src) return <div>QR code...</div>;

  return <img src={src} alt="QR code du profil" className="h-40 w-40 rounded-xl border" />;
}
