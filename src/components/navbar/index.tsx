import DrawerMenu from "./drawer-menu";
import Logo from "./logo";

export default async function Navbar() {
  return (
    <nav className="fixed right-0 left-0 top-0 z-[9999] py-1.5 bg-white border-b border-gray-200 shadow-md overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-16 max-w-[768px]:py-0 px-4">
        <Logo />
        <DrawerMenu />
      </div>
    </nav>
  );
}
