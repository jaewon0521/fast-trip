import Link from "next/link";

interface NavbarLinkProps {
  href: string;
  title: React.ReactNode;
}

export default function NavbarLink({ href, title }: NavbarLinkProps) {
  return (
    <Link
      className="flex py-5 border-t-1 border-gray-200 hover:bg-gray-100"
      href={href}
    >
      <span className="text-md font-medium text-black">{title}</span>
    </Link>
  );
}
