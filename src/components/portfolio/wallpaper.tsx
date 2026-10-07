import oceanTech from "@/assets/ocean-tech-wallpaper.jpg";
import oceanCurrent from "@/assets/ocean-current-wallpaper.jpg";

export function Wallpaper({ variant = "current", priority = false }: { variant?: "tech" | "current"; priority?: boolean }) {
  return <div className={`ocean-wallpaper ocean-wallpaper-${variant}`} aria-hidden="true">
    <img src={variant === "tech" ? oceanTech : oceanCurrent} alt="" width={1920} height={1088} loading={priority ? "eager" : "lazy"} />
  </div>;
}