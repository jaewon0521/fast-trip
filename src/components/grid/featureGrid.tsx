export default function FeatureGrid({
  features,
}: {
  features: { title: React.ReactNode; description: React.ReactNode }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {features.map((feature, i) => (
        <div
          key={`feature-grid-${i}`}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500 hover:-translate-y-1"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">{feature.title}</h3>
          <p className="text-gray-500 leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
