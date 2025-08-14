import Image from "next/image";

export default function TechBadge({
  name,
  src,
}: {
  name: string;
  src: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Image src={src} alt={name} width={20} height={20} />
      <span className="text-md font-semibold">{name}</span>
    </div>
  );
}
