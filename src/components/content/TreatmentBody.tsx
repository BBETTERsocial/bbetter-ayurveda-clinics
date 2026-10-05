"use client";

import Image from "next/image";
import { useState } from "react";
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
  const [fit, setFit] = useState<Fit>(hintFit || "md");
  const [dimensions, setDimensions] = useState({
    width: imageWidth || 900,
    height: imageHeight || 600,
  });

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
      <div className="treatment-page__media">
        <Image
          src={imageSrc}
          alt={imageAlt || ""}
          width={dimensions.width}
          height={dimensions.height}
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
          className="treatment-page__image"
          onLoad={(event) => {
            const width = event.currentTarget.naturalWidth;
            const height = event.currentTarget.naturalHeight;
            if (!width || !height) return;

            setDimensions((current) =>
              current.width === width && current.height === height
                ? current
                : { width, height }
            );
            setFit(classifyTreatmentImageFit(width, height));
          }}
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
