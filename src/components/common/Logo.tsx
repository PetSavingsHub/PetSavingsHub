import Image from 'next/image';

export default function Logo({
  width = 500,
  className,
  color = "black"
}: {
  width?: number
  className?: string
  color?: "black" | "white"
}) {
  const height = Math.floor(width * (1652 / 1920));
  return (
    <Image
      src={color == "black" ? "/logo-trans.png" : "/logo-white.png"}
      width={width}
      height={height}
      alt="Pet Saving Hub"
      className={className || ""}
    />
  )
}