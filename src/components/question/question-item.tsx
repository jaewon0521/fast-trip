import { Button } from "@/components/ui/button";

interface QuestionItemProps {
  content: string;
  selectedContent: string;
  onContentSelect: (content: string) => void;
}

export function QuestionItem({
  content,
  selectedContent,
  onContentSelect,
}: QuestionItemProps) {
  return (
    <li key={content}>
      <div>
        <Button
          variant={selectedContent === content ? "default" : "outline"}
          size="lg"
          type="button"
          className="w-full"
          color="blue"
          onClick={() => onContentSelect(content)}
        >
          <span>{content}</span>
        </Button>
      </div>
    </li>
  );
}
