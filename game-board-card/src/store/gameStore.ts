import { create } from 'zustand';

interface GameState {
    counter: number;
    multiplier: number;
    isGameOver: boolean;
    isGameStopped: boolean;

    // Дії для оновлення стану
    updateCounter: (amount: number) => void;
    addToCounter: (amount: number) => void;
    setMultiplier: (multiplier: number) => void;
    multiplyCounter: (factor: number) => void;
    setGameOver: (gameOver: boolean) => void;
    setGameStopped: (gameStopped: boolean) => void;
    resetGame: () => void;
}

interface CashAnimation {
    id: number;
    start: { x: number; y: number };
    end: { x: number; y: number };
    src: string;
}

interface CashAnimationState {
    animations: CashAnimation[];
    addAnimation: (start: { x: number; y: number }, end: { x: number; y: number }, src: string) => void;
    removeAnimation: (id: number) => void;
}

export const useGameStore = create<GameState>((set, ) => ({
    counter: 0,
    multiplier: 1,
    isGameOver: false,
    isGameStopped: false,
    updateCounter: (amount: number) => set((state) => ({
        counter: state.counter + amount
    })),

    // Додає до поточного counter
    addToCounter: (amount: number) => set((state) => ({
        counter: state.counter + amount
    })),

    // Встановлює множник
    setMultiplier: (multiplier: number) => set({ multiplier }),

    // Помножує поточний counter на фактор
    multiplyCounter: (factor: number) => set((state) => ({
        counter: state.counter * factor
    })),

    // Встановлює стан "Гра закінчена"
    setGameOver: (gameOver: boolean) => set({ isGameOver: gameOver }),

    // Встановлює стан "Гра зупинена"
    setGameStopped: (gameStopped: boolean) => set({ isGameStopped: gameStopped }),

    // Скидає гру до початкових значень
    resetGame: () => set({
        counter: 0,
        multiplier: 1,
        isGameOver: false,
        isGameStopped: false,
    }),
}));

let idCounter = 0;

export const useCashAnimationStore = create<CashAnimationState>((set) => ({
    animations: [],
    addAnimation: (start, end, src) => {
        set((state) => {
            const newAnimation = { id: idCounter++, start, end, src };
            return {
                animations: [...state.animations, newAnimation]
            };
        });
    },
    removeAnimation: (id) => {
        set((state) => ({
            animations: state.animations.filter((a) => a.id !== id)
        }));
    },
}));