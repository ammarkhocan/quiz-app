import type { Question } from "../types/quiz";

export async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple",
  );
  const data = await res.json();
  return data.results;
}
