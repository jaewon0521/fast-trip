import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <h1 className="font-bold text-2xl text-blue-500 text-decoration-none max-w-[768px]:text-sm">
          Fast Trip
        </h1>
      </Link>
    </div>
  );
}
