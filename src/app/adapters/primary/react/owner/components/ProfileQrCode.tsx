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

  return <img src={src} alt="QR code du badge" className="h-56 w-56 rounded-2xl border" />;
}
