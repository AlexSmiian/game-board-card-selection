import { useGameStore } from '../store/gameStore';

export const useGameState = () => {
    const gameState = useGameStore((state) => ({
        counter: state.counter,
        isGameOver: state.isGameOver,
        isGameStopped: state.isGameStopped,
        multiplier: state.multiplier,
        flippedCards: new Set(),
        shuffledCards: [],
    }));

    const getGameStateString = () => {
        if (gameState.isGameOver) return 'bomb';
        if (gameState.isGameStopped) return 'stop';
        if (gameState.counter > 0) return 'playing';
        return 'idle';
    };

    return {
        ...gameState,
        gameStateString: getGameStateString(),
    };
};