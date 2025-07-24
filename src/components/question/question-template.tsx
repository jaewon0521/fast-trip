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
    <div className="w-full max-w-md mx-auto py-10 px-5">
      {header}
      <div className="flex flex-col gap-10">{body}</div>
      {footer}
    </div>
  );
}
