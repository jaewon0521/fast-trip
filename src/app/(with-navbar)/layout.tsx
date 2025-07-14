export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1200px] mx-auto pl-8 pr-4 max-md:px-4 py-2">{children}</div>;
}
