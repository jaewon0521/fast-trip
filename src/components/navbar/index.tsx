import Link from "next/link";
import DrawerMenu from "./drawer-menu";
import Logo from "./logo";
import Responsive from "../responsive";

export default async function Navbar() {
  return (
    <nav className="sticky top-0 z-[9999] py-1.5 px-0 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-16 max-w-[768px]:py-0 px-4">
        <Logo />
        <DrawerMenu />
      </div>
    </nav>
  );
}
