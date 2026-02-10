import { Clock } from "lucide-react";

export function Timer({ time }: { time: number }) {
  return (
    <div className="flex items-center gap-2 text-red-500 font-bold">
      <Clock size={18} />
      {time}s
    </div>
  );
}
