import clsx from "clsx";

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
  const isSelected = selectedContent === content;

  return (
    <li>
      <div>
        <button
          type="button"
          className={clsx("w-full btn btn-outline  text-sm", {
            "border-gray-400 text-gray-600": !isSelected,
            "bg-blue-500 border-blue-500 text-white": isSelected,
          })}
          onClick={() => onContentSelect(content)}
        >
          <span>{content}</span>
        </button>
      </div>
    </li>
  );
}
