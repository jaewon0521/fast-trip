import TechBadge from "./tech-badge";

interface TechBadgeGroupProps {
  title: string;
  badges: { name: string; src: string }[];
}

export function TechBadgeGroup({ title, badges }: TechBadgeGroupProps) {
  return (
    <div className="mt-5">
      <span className="text-xl font-bold">{title}</span>
      <div className="flex flex-wrap gap-2 mt-2">
        {badges.map((badge) => (
          <TechBadge key={badge.name} name={badge.name} src={badge.src} />
        ))}
      </div>
    </div>
  );
}
