"use client";

import { useState } from "react";

export function DetailHeroVisual({
  image,
  imageAlt
}: {
  image?: string;
  imageAlt?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(image && !imageFailed);

  return (
    <div
      className="mb-12 overflow-hidden border border-border bg-forest text-on-forest"
      aria-label="Article visual"
    >
      <div className="relative min-h-48 overflow-hidden sm:min-h-64">
        {showImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={imageAlt || ""}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="relative min-h-48 p-5 sm:min-h-64">
            <div className="absolute inset-5 border border-on-forest/20" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-on-forest/15" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-on-forest/15" />
            <div className="absolute bottom-8 left-8 h-20 w-20 border border-olive/70" />
            <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-olive/70" />
          </div>
        )}
      </div>
    </div>
  );
}
