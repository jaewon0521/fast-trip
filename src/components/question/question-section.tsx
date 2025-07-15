import { QuestionItem } from "./question-item";

interface QuestionSectionProps {
  title: string;
  contents: string[];
  onContentSelect: (city: string) => void;
  selectedContent: string;
}

export function QuestionSection({
  title,
  contents,
  onContentSelect,
  selectedContent,
}: QuestionSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-md font-bold">{title}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {contents.map((content) => (
          <QuestionItem
            key={content}
            content={content}
            selectedContent={selectedContent}
            onContentSelect={onContentSelect}
          />
        ))}
      </ul>
    </section>
  );
}
