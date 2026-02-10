type Props = {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
};

export function QuizCard({ question, options, onAnswer }: Props) {
  return (
    <div className="space-y-4">
      <h2
        className="text-lg font-semibold"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      {options.map((opt) => (
        <button
          key={opt}
          className="w-full p-3 border rounded hover:bg-muted text-left"
          onClick={() => onAnswer(opt)}
          dangerouslySetInnerHTML={{ __html: opt }}
        />
      ))}
    </div>
  );
}
