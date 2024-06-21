"use client";
import ReactConfetti from "react-confetti";

import { useConfetti } from "@/hooks/use-confitte-store";

export const ConfettiProvider = () => {
  const confetti = useConfetti();
  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[300]"
      numberOfPieces={1000}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};
