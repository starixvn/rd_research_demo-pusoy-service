export const defaultScoreConfig = {
    normal: 1,
    natural: {
        threeFlushes: 3,
        sixPairs: 6,
        dragon: 12,
        threeStraights: 3,
    },
    crack: 6,
    pusoy: {
        partial: 3,
        full: 6,
    },
    royalty: {
        front: {
            threeOfAKind: 3,
        },
        middle: {
            fullHouse: 2,
            fourOfAKind: 8,
            straightFlush: 10,
            royalFlush: 20,
        },
        back: {
            fourOfAKind: 4,
            straightFlush: 5,
            royalFlush: 10,
        },
    },
};
