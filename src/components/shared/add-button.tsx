import { Button } from "@/components/ui/button";

export function AddButton() {
  function handleClick() {
    console.log("Test click");
  }

  return <Button onClick={handleClick}>test</Button>;
}
