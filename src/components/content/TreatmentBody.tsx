"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { classifyTreatmentImageFit } from "@/lib/wpContent";

type Fit = "sm" | "md" | "lg" | "full";

export function TreatmentBody({
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  afterHtml,
  className = "",
}: {
  imageSrc?: string | null;
  imageAlt?: string;
  imageWidth?: number | null;
  imageHeight?: number | null;
  afterHtml: string;
  className?: string;
}) {
  const hintFit =
    imageWidth && imageHeight
      ? classifyTreatmentImageFit(imageWidth, imageHeight)
      : null;
  const hintRatio =
    imageWidth && imageHeight && imageHeight > 0
      ? imageWidth / imageHeight
      : null;

  const [fit, setFit] = useState<Fit>(hintFit || "md");
  const [ratio, setRatio] = useState<number | null>(hintRatio);

  useEffect(() => {
    if (!imageSrc) return;

    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth || imageWidth || 1;
      const h = img.naturalHeight || imageHeight || 1;
      setRatio(w / h);
      setFit(classifyTreatmentImageFit(w, h));
    };
    img.onerror = () => {
      if (cancelled) return;
      setFit(hintFit || "md");
    };
    img.src = imageSrc;

    return () => {
      cancelled = true;
    };
  }, [imageSrc, imageWidth, imageHeight, hintFit]);

  if (!imageSrc) {
    return afterHtml ? (
      <div
        className={`wp-prose treatment-page__body ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: afterHtml }}
      />
    ) : null;
  }

  return (
    <div
      className={`wp-prose treatment-page__body is-fit-${fit} ${className}`.trim()}
      data-fit={fit}
    >
      <div
        className="treatment-page__media"
        style={ratio ? { aspectRatio: String(ratio) } : undefined}
      >
        <Image
          src={imageSrc}
          alt={imageAlt || ""}
          fill
          priority
          sizes={
            fit === "full"
              ? "(max-width: 768px) 100vw, 960px"
              : fit === "lg"
                ? "(max-width: 768px) 90vw, 360px"
                : fit === "sm"
                  ? "(max-width: 768px) 55vw, 180px"
                  : "(max-width: 768px) 70vw, 260px"
          }
          className="object-contain"
        />
      </div>
      {afterHtml ? (
        <div
          className="treatment-page__flow"
          dangerouslySetInnerHTML={{ __html: afterHtml }}
        />
      ) : null}
    </div>
  );
}
