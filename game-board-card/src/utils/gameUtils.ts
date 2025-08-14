export const calculateCashValue = (cash: string | null): number => {
    if (!cash || cash === "0") return 0;

    if (cash.includes('k')) {
        return parseInt(cash.replace('k', '')) * 1000;
    }
    if (cash.includes('M')) {
        return parseInt(cash.replace('M', '')) * 1000000;
    }

    return parseInt(cash) || 0;
};

export const formatCash = (amount: number): string => {
    if (amount === 1000000) {
        return `${(amount / 1000000).toFixed(0)}M`;
    }

    if (amount > 1000100) {
        return `${(amount / 1000000).toFixed(6)}M`;
    }
    if (amount >= 1000) {
        return `${(amount / 1000).toFixed(1)}k`;
    }
    return amount.toString();
};