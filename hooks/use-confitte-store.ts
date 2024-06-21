import { create } from "zustand";

type confetti = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useConfetti = create<confetti>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
