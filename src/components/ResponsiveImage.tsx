import type { ImgHTMLAttributes } from "react";
import type { SiteImage } from "@/data/siteData";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  image: SiteImage;
};

export default function ResponsiveImage({ image, sizes = "100vw", loading = "lazy", decoding = "async", ...props }: Props) {
  return <img src={image.src} srcSet={image.srcSet} sizes={sizes} width={image.width} height={image.height} loading={loading} decoding={decoding} {...props} />;
}