export function ProgressInfo({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <p className="text-sm text-muted-foreground">
      Soal {current} dari {total}
    </p>
  );
}
