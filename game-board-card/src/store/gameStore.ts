import { create } from 'zustand';
import { cardData } from './data-card';

interface GameState {
    counter: number;
    multiplier: number;
    isGameOver: boolean;
    isGameStopped: boolean;
    showStopModal: boolean;
    showBombModal: boolean;
    showBombSaveModal: boolean;
    defuseCost: number;
    saveCost: number;
    allCardsRevealed: boolean;

    // Дії для оновлення стану
    updateCounter: (amount: number) => void;
    addToCounter: (amount: number) => void;
    setMultiplier: (multiplier: number) => void;
    multiplyCounter: (factor: number) => void;
    setGameOver: (gameOver: boolean) => void;
    setGameStopped: (gameStopped: boolean) => void;
    showStopModalAction: () => void;
    hideStopModalAction: () => void;
    showBombModalAction: () => void;
    hideBombModalAction: () => void;
    showBombSaveModalAction: () => void;
    hideBombSaveModalAction: () => void;
    takeHit: () => void;
    defuseBomb: () => void;
    saveResources: () => void;
    loseResources: () => void;
    claimRewards: () => void;
    newGame: () => void;
    revealAllCards: () => void;
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

interface SpecialEffectsState {
    bombEffect: boolean;
    x2Effect: boolean;
    stopEffect: boolean;
    bombFieldEffect: boolean;
    triggerBombEffect: () => void;
    triggerX2Effect: () => void;
    triggerStopEffect: () => void;
    triggerBombFieldEffect: () => void;
    resetEffects: () => void;
}

// Функція для обчислення загальної суми з усіх карток
const calculateTotalFromAllCards = (multiplier: number) => {
    return cardData.reduce((total, card) => {
        if (card.cash && card.cash !== 0) {
            return total + (card.cash * multiplier);
        }
        return total;
    }, 0);
};

export const useGameStore = create<GameState>((set, get) => ({
    counter: 0,
    multiplier: 1,
    isGameOver: false,
    isGameStopped: false,
    showStopModal: false,
    showBombModal: false,
    showBombSaveModal: false,
    defuseCost: 49,
    saveCost: 99,
    allCardsRevealed: false,
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

    // Показує модальне вікно STOP
    showStopModalAction: () => set({ showStopModal: true }),

    // Приховує модальне вікно STOP
    hideStopModalAction: () => set({ showStopModal: false }),

    // Показує модальне вікно BOMB
    showBombModalAction: () => set({ showBombModal: true }),

    // Приховує модальне вікно BOMB
    hideBombModalAction: () => set({ showBombModal: false }),

    // Показує модальне вікно збереження ресурсів
    showBombSaveModalAction: () => {
        const { multiplier } = get();
        const totalFromAllCards = calculateTotalFromAllCards(multiplier);
        set({ 
            showBombSaveModal: true,
            counter: totalFromAllCards,
            // Не встановлюємо allCardsRevealed одразу - це буде зроблено тільки при loseResources
        });
    },

    // Приховує модальне вікно збереження ресурсів
    hideBombSaveModalAction: () => set({ showBombSaveModal: false }),

    // Прийняти удар від бомби
    takeHit: () => {
        const { multiplier } = get();
        const totalFromAllCards = calculateTotalFromAllCards(multiplier);
        
        set({ 
            showBombModal: false,
            allCardsRevealed: true,
            counter: totalFromAllCards, // Встановлюємо загальну суму з усіх карток
            isGameOver: true // Гра завершується
        });
        
        // Не показуємо другу модалку - гра просто завершується
    },

    // Знешкодити бомбу
    defuseBomb: () => {
        set({ showBombModal: false });
    },

    // Зберегти ресурси
    saveResources: () => {
        const { counter } = get();
        set({ 
            showBombSaveModal: false,
            // Не встановлюємо isGameOver: true - гра продовжується
            // Не змінюємо allCardsRevealed - картки залишаються в поточному стані
        });
    },

    // Втратити ресурси
    loseResources: () => {
        set({ 
            counter: 0,
            showBombSaveModal: false,
            isGameOver: true,
            allCardsRevealed: true // Відкриваємо всі картки при втраті ресурсів
        });
    },

    // Забрати винагороди
    claimRewards: () => {
        const { counter } = get();
        set({ 
            counter: 0, 
            showStopModal: false, 
            isGameOver: false, 
            // Не скидаємо isGameStopped - гра залишається зупиненою
        });
    },

    // Почати нову гру
    newGame: () => {
        set({ 
            counter: 0, 
            multiplier: 1,
            showStopModal: false, 
            isGameOver: false, 
            isGameStopped: false,
            showBombModal: false,
            showBombSaveModal: false,
            allCardsRevealed: false,
        });
    },

    // Відкрити всі картки
    revealAllCards: () => {
        set({ allCardsRevealed: true });
    },

    // Скидає гру до початкових значень
    resetGame: () => set({
        counter: 0,
        multiplier: 1,
        isGameOver: false,
        isGameStopped: false,
        showStopModal: false,
        showBombModal: false,
        showBombSaveModal: false,
        allCardsRevealed: false,
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

export const useSpecialEffectsStore = create<SpecialEffectsState>((set) => ({
    bombEffect: false,
    x2Effect: false,
    stopEffect: false,
    bombFieldEffect: false,
    triggerBombEffect: () => {
        set({ bombEffect: true });
        setTimeout(() => set({ bombEffect: false }), 2000);
    },
    triggerX2Effect: () => {
        set({ x2Effect: true });
        setTimeout(() => set({ x2Effect: false }), 1500);
    },
    triggerStopEffect: () => {
        set({ stopEffect: true });
        setTimeout(() => set({ stopEffect: false }), 2000);
    },
    triggerBombFieldEffect: () => {
        set({ bombFieldEffect: true });
        setTimeout(() => {
            set({ bombFieldEffect: false });
        }, 3000);
    },
    resetEffects: () => set({
        bombEffect: false,
        x2Effect: false,
        stopEffect: false,
        bombFieldEffect: false,
    }),
}));