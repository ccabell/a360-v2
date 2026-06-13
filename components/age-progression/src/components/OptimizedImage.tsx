import React, { useState, useCallback } from "react";
import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

const shimmerKeyframes = keyframes`
  50% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

export interface OptimizedImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "srcSet" | "sizes"
> {
  /** Main image URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional low-res URL for blurred placeholder (defaults to derived from src for picsum) */
  placeholderSrc?: string;
  /** Optional srcset for responsive images (e.g. "url1 400w, url2 800w") */
  srcSet?: string;
  /** Optional sizes attribute (e.g. "(max-width: 600px) 100vw, 400px") */
  sizes?: string;
  /** Enable lazy loading (default: true for below-fold usage) */
  lazy?: boolean;
  /** Aspect ratio for placeholder (e.g. "4/3") to prevent layout shift */
  aspectRatio?: string;
  /** Additional className */
  className?: string;
}

/**
 * Derive a tiny placeholder URL for blurred preview. Supports picsum.photos and Unsplash.
 */
const getPlaceholder = (src: string): string | undefined => {
  try {
    const url = new URL(
      src,
      typeof window !== "undefined"
        ? window.location.origin
        : "https://example.com",
    );
    if (url.hostname.includes("picsum.photos")) {
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (pathParts[0] === "seed" && pathParts[1]) {
        return `https://picsum.photos/seed/${pathParts[1]}/20/15`;
      }
      if (pathParts[0] === "id" && pathParts[1]) {
        return `https://picsum.photos/id/${pathParts[1]}/20/15`;
      }
    }
    if (
      url.hostname.includes("unsplash.com") ||
      url.hostname.includes("images.unsplash.com")
    ) {
      url.searchParams.set("w", "20");
      url.searchParams.set("h", "15");
      url.searchParams.set("fit", "crop");
      return url.toString();
    }
  } catch {
    /* ignore */
  }
  return undefined;
};

/**
 * Build srcset for responsive images. Supports picsum.photos and Unsplash.
 */
const getSrcSet = (src: string): string | undefined => {
  try {
    const url = new URL(src);
    if (url.hostname.includes("picsum.photos")) {
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (pathParts[0] === "seed" && pathParts[1]) {
        const seed = pathParts[1];
        return [
          `https://picsum.photos/seed/${seed}/200/150 200w`,
          `https://picsum.photos/seed/${seed}/400/300 400w`,
          `https://picsum.photos/seed/${seed}/800/600 800w`,
        ].join(", ");
      }
      if (pathParts[0] === "id" && pathParts[1]) {
        const id = pathParts[1];
        return [
          `https://picsum.photos/id/${id}/200/150 200w`,
          `https://picsum.photos/id/${id}/400/300 400w`,
          `https://picsum.photos/id/${id}/800/600 800w`,
        ].join(", ");
      }
    }
    if (
      url.hostname.includes("unsplash.com") ||
      url.hostname.includes("images.unsplash.com")
    ) {
      const base = url.origin + url.pathname;
      const extra = new URLSearchParams(url.searchParams);
      extra.delete("w");
      extra.delete("h");
      extra.set("fit", "crop");
      const suffix = extra.toString() ? `&${extra.toString()}` : "";
      return [
        `${base}?w=200&h=150${suffix} 200w`,
        `${base}?w=400&h=300${suffix} 400w`,
        `${base}?w=800&h=600${suffix} 800w`,
      ].join(", ");
    }
  } catch {
    /* ignore */
  }
  return undefined;
};

/**
 * OptimizedImage: blurred thumbnail placeholder, responsive srcset, lazy loading.
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  placeholderSrc,
  srcSet: srcSetProp,
  sizes,
  lazy = true,
  aspectRatio,
  className,
  style,
  onLoad,
  onError,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const effectivePlaceholder = placeholderSrc ?? getPlaceholder(src);
  const effectiveSrcSet = srcSetProp ?? getSrcSet(src);

  const useBlurUntilLoaded = !effectivePlaceholder;

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(e);
    },
    [onLoad],
  );

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setHasError(true);
      onError?.(e);
    },
    [onError],
  );

  const containerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    ...(aspectRatio && { aspectRatio }),
  };

  const placeholderStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "blur(12px)",
    transform: "scale(1.1)",
    opacity: loaded ? 0 : 1,
    transition: "opacity 0.3s ease-out",
  };

  const mainImageStyle: React.CSSProperties = useBlurUntilLoaded
    ? {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: hasError ? "none" : "block",
        filter: loaded ? "none" : "blur(12px)",
        transform: loaded ? "none" : "scale(1.05)",
        opacity: loaded ? 1 : 0.7,
        transition:
          "opacity 0.3s ease-in, filter 0.3s ease-out, transform 0.3s ease-out",
      }
    : {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.3s ease-in",
        display: hasError ? "none" : "block",
      };

  return (
    <Box
      component="span"
      sx={{
        display: "block",
        ...containerStyle,
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
      className={className}
    >
      {!loaded && !hasError && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background: (theme) =>
              `linear-gradient(110deg, ${theme.palette.grey[200]} 25%, ${theme.palette.grey[100]} 50%, ${theme.palette.grey[200]} 75%)`,
            backgroundSize: "200% 100%",
            animation: `${shimmerKeyframes} 1.5s ease-in-out infinite`,
          }}
        />
      )}
      {effectivePlaceholder && !loaded && !hasError && (
        <img
          src={effectivePlaceholder}
          alt=""
          aria-hidden
          style={placeholderStyle}
          loading="eager"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        srcSet={effectiveSrcSet}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        style={{ ...mainImageStyle, ...style }}
        {...rest}
      />
    </Box>
  );
};

export default OptimizedImage;
