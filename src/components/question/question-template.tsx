interface QuestionTemplateProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}
export default function QuestionTemplate({
  header,
  body,
  footer,
}: QuestionTemplateProps) {
  return (
    <div className="w-full max-w-md mx-auto pt-10 pb-40 px-5">
      {header}
      <div className="flex flex-col gap-10">{body}</div>
      <div className="fixed bottom-0 left-0 right-0 px-10 pb-5 bg-white">
        <div className="max-w-md mx-auto">{footer}</div>
      </div>
    </div>
  );
}
