export interface CardData {
    src: string;
    cash: number | null;
    id: string;
    x2?: boolean;
    stop?: boolean;
    bomb?: boolean;
    onFlip?: (cardData: CardData) => void;
}

export interface GameState {
    counter: number;
    isGameOver: boolean;
    isGameStopped: boolean;
    multiplier: number;
    flippedCards:Set<string>;
    shuffledCards: CardData[];
}
