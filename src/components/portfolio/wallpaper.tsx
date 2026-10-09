import techLight from "@/assets/tech-wallpaper-light.jpg";
import techDeep from "@/assets/tech-wallpaper-deep.jpg";

export function Wallpaper({ variant = "current", priority = false }: { variant?: "tech" | "current"; priority?: boolean }) {
  return <div className={`ocean-wallpaper ocean-wallpaper-${variant}`} aria-hidden="true">
    <img src={variant === "tech" ? techDeep : techLight} alt="" width={1920} height={1088} loading={priority ? "eager" : "lazy"} />
  </div>;
}