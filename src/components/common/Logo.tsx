import Image from 'next/image';

export default function Logo({
  width = 500,
  className
}: {
  width?: number
  className?: string
}) {
  const height = Math.floor(width * (1652 / 1920));
  return (
    <Image
      src="/logo.png"
      width={width}
      height={height}
      alt="Pet Saving Hub"
      className={className || ""}
    />
  )
}