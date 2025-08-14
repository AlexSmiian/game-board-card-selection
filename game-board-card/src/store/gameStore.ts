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
    flippedCards: Set<string>;
    inventory: {
        cash: number;
        x2: number;
        zero: number;
        bomb: number;
        stop: number;
    };

    // Actions for updating state
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
    updateInventory: () => void;
    addFlippedCard: (cardId: string) => void;
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

    // Function to calculate total sum from all cards
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
    flippedCards: new Set(),
    inventory: {
        cash: 0,
        x2: 0,
        zero: 0,
        bomb: 0,
        stop: 0,
    },
    updateCounter: (amount: number) => set((state) => ({
        counter: state.counter + amount
    })),

            // Add to current counter
        addToCounter: (amount: number) => set((state) => ({
            counter: state.counter + amount
        })),

        // Set multiplier
        setMultiplier: (multiplier: number) => set({ multiplier }),

        // Multiply current counter by factor
        multiplyCounter: (factor: number) => set((state) => ({
            counter: state.counter * factor
        })),

        // Set "Game Over" state
        setGameOver: (gameOver: boolean) => set({ isGameOver: gameOver }),

        // Set "Game Stopped" state
        setGameStopped: (gameStopped: boolean) => set({ isGameStopped: gameStopped }),

        // Show STOP modal
        showStopModalAction: () => set({ showStopModal: true }),

        // Hide STOP modal
        hideStopModalAction: () => set({ showStopModal: false }),

        // Show BOMB modal
        showBombModalAction: () => set({ showBombModal: true }),

        // Hide BOMB modal
        hideBombModalAction: () => set({ showBombModal: false }),

        // Show save resources modal
        showBombSaveModalAction: () => {
            const { multiplier } = get();
            const totalFromAllCards = calculateTotalFromAllCards(multiplier);
            set({
                showBombSaveModal: true,
                counter: totalFromAllCards,
                // Don't set allCardsRevealed immediately - this will be done only with loseResources
            });
        },

        // Hide save resources modal
        hideBombSaveModalAction: () => set({ showBombSaveModal: false }),

    // Take hit from bomb
    takeHit: () => {
        const { multiplier } = get();
        const totalFromAllCards = calculateTotalFromAllCards(multiplier);
        
        set({ 
            showBombModal: false,
            allCardsRevealed: true,
            counter: totalFromAllCards, // Set total sum from all cards
            isGameOver: true // Game ends
        });
        
        // Don't show second modal - game just ends
    },

    // Defuse bomb
    defuseBomb: () => {
        set({ showBombModal: false });
    },

    // Save resources
    saveResources: () => {
        set({ 
            showBombSaveModal: false,
            // Don't set isGameOver: true - game continues
            // Don't change allCardsRevealed - cards remain in current state
        });
    },

    // Lose resources
    loseResources: () => {
        set({
            counter: 0,
            showBombSaveModal: false,
            isGameOver: true,
            allCardsRevealed: true // Reveal all cards when losing resources
        });
    },

    // Claim rewards
    claimRewards: () => {
        set({
            counter: 0,
            showStopModal: false,
            isGameOver: false,
            // Not resetting isGameStopped - game remains stopped
        });
    },

    // Start new game
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
            flippedCards: new Set(),
            inventory: {
                cash: 0,
                x2: 0,
                zero: 0,
                bomb: 0,
                stop: 0,
            },
        });
    },

    // Reveal all cards
    revealAllCards: () => {
        set({ allCardsRevealed: true });
    },

    // Reset game to initial values
    resetGame: () => set({
        counter: 0,
        multiplier: 1,
        isGameOver: false,
        isGameStopped: false,
        showStopModal: false,
        showBombModal: false,
        showBombSaveModal: false,
        allCardsRevealed: false,
        flippedCards: new Set(),
        inventory: {
            cash: 0,
            x2: 0,
            zero: 0,
            bomb: 0,
            stop: 0,
        },
    }),

    // Update inventory based on opened cards
    updateInventory: () => {
        const { flippedCards } = get();
        const newInventory = {
            cash: 0,
            x2: 0,
            zero: 0,
            bomb: 0,
            stop: 0,
        };

        // Count quantity of each card type
        cardData.forEach((card) => {
            if (flippedCards.has(card.id)) {
                if (card.cash && card.cash !== 0) {
                    newInventory.cash++;
                } else if (card.x2) {
                    newInventory.x2++;
                } else if (card.cash === 0) {
                    newInventory.zero++;
                } else if (card.bomb) {
                    newInventory.bomb++;
                } else if (card.stop) {
                    newInventory.stop++;
                }
            }
        });

        set({ inventory: newInventory });
    },

    addFlippedCard: (cardId: string) => {
        set((state) => ({
            flippedCards: new Set(state.flippedCards).add(cardId)
        }));
    },
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