import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuestionHeaderProps {
  title: string;
  description?: string;
  stepCurrent: number;
  stepTotal: number;
}

export default function QuestionHeader({
  title,
  description,
  stepCurrent,
  stepTotal,
}: QuestionHeaderProps) {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  return (
    <div className="flex flex-col items-center gap-2 mb-10">
      <div className="flex justify-between w-full">
        <button className="cursor-pointer" onClick={onBack}>
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-0.5">
          <span className="text-md text-gray-500 font-semibold">
            {stepCurrent}
          </span>
          <span className="text-md text-gray-500">/</span>
          <span className="text-md text-gray-500 font-semibold">
            {stepTotal}
          </span>
        </div>
      </div>
      <h1 className="text-2xl font-bold max-sm:text-xl">{title}</h1>
      <span className="text-md text-gray-500 text-center max-sm:text-sm">
        {description}
      </span>
    </div>
  );
}
