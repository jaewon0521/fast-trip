interface QuestionHeaderProps {
  title: string;
  description?: string;
}

export default function QuestionHeader({
  title,
  description,
}: QuestionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 mb-10">
      <h1 className="text-2xl font-bold max-sm:text-xl">
       {title}
      </h1>
      <span className="text-md text-gray-500 text-center max-sm:text-sm">
        {description}
      </span>
    </div>
  );
}
