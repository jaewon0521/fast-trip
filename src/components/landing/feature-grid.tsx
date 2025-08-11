export default function FeatureGrid({
  features,
}: {
  features: { title: React.ReactNode; description: React.ReactNode }[];
}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
      {features.map((feature, i) => (
        <article
          key={`feature-grid-${i}`}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500 hover:-translate-y-1"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
          <p className="text-gray-500 leading-relaxed">{feature.description}</p>
        </article>
      ))}
    </section>
  );
}
