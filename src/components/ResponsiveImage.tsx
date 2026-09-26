import type { ImgHTMLAttributes } from "react";
import type { SiteImage } from "@/data/siteData";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  image: SiteImage;
  fetchPriority?: "high" | "low" | "auto";
};

export default function ResponsiveImage({ image, sizes = "100vw", loading = "lazy", decoding = "async", fetchPriority, ...props }: Props) {
  return <img src={image.src} srcSet={image.srcSet} sizes={sizes} width={image.width} height={image.height} loading={loading} decoding={decoding} fetchPriority={fetchPriority} {...props} />;
}