export default function ActionQuiz({
  onClick,
  icon: Icon,
  title,
  description,
}: {
  onClick: () => void;
  icon: React.ElementType;
  title: string;
  description?: string;
}) {
  return (
    <button
      className="group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:transform hover:border-gray-600/50 hover:shadow-2xl"
      onClick={onClick}
    >
      <div className="relative z-10 flex flex-col items-center gap-4 text-gray-100">
        <div className="rounded-2xl bg-gray-800/60 p-4 transition-colors duration-300 group-hover:bg-gray-700/60">
          <Icon className="text-4xl" />
        </div>
        <div className="text-center">
          <h3 className="mb-1 text-lg font-bold">{title}</h3>
          {description && (
            <p className="text-sm text-gray-300">{description}</p>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gray-700/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </button>
  );
}
