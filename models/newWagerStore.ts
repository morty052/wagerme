import { create } from 'zustand';

type newWagerProps = {
  title: string;
  description: string;
  type: string;
  category: string;
  amount: string;
  deadline: string;
  thumbnail: string;
  seats: number;
  setWagerTitle: (title: string) => void;
  setWagerDescription: (description: string) => void;
  setWagerType: (type: string) => void;
  setWagerCategory: (category: string) => void;
  setWagerAmount: (amount: string) => void;
  setWagerDeadline: (deadline: string) => void;
  setWagerThumbnail: (thumbnail: string) => void;
  setWagerSeats: (seats: number) => void;
};

export const useNewWagerStore = create<newWagerProps>((set) => ({
  title: '',
  description: '',
  type: '',
  category: '',
  amount: '',
  deadline: '',
  thumbnail: '',
  seats: 1,
  setWagerTitle: (title: string) => set(() => ({ title })),
  setWagerDescription: (description: string) => set(() => ({ description })),
  setWagerType: (type: string) => set(() => ({ type })),
  setWagerCategory: (category: string) => set(() => ({ category })),
  setWagerAmount: (amount: string) => set(() => ({ amount })),
  setWagerDeadline: (deadline: string) => set(() => ({ deadline })),
  setWagerThumbnail: (thumbnail: string) => set(() => ({ thumbnail })),
  setWagerSeats: (seats: number) => set(() => ({ seats })),
}));
