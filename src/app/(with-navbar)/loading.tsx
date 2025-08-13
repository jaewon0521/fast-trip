export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <span className="mr-1 text-2xl font-bold text-blue-400">Loading</span>
        <span className="loading loading-dots loading-md text-blue-400"></span>
      </div>
    </div>
  );
}
