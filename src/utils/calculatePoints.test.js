import { calculateUnitPoints, aggregatePoints } from './calculatePoints';
import { POINTS_THRESHOLD, REWARD_MULTIPLIER } from './constants';

describe('calculateUnitPoints', () => {
    test('returns 0 points for amounts less than the lower threshold', () => {
        expect(calculateUnitPoints(POINTS_THRESHOLD.LOWER - 1)).toBe(0);
    });

    test('returns standard points for amounts between lower and upper thresholds', () => {
        const amount = POINTS_THRESHOLD.LOWER + 10;
        expect(calculateUnitPoints(amount)).toBe(amount - POINTS_THRESHOLD.LOWER);
    });

    test('returns double points for amounts exceeding the upper threshold', () => {
        const amount = POINTS_THRESHOLD.UPPER + 10;
        expect(calculateUnitPoints(amount)).toBe((amount - POINTS_THRESHOLD.UPPER) * REWARD_MULTIPLIER + POINTS_THRESHOLD.LOWER);
    });
});

describe('aggregatePoints', () => {
    test('correctly aggregates monthly and total points from transactions', () => {
        const transactions = [
            { date: '2023-09-01', amount: 110 },
            { date: '2023-10-15', amount: 60 },
            { date: '2023-11-20', amount: 200 }
        ];
        const result = aggregatePoints(transactions);

        // Check total points
        expect(result.totalPoints).toBe(330);

        // Check monthly points
        expect(result.monthlyPoints['2023-09']).toBe(70);
        expect(result.monthlyPoints['2023-10']).toBe(10);
        expect(result.monthlyPoints['2023-11']).toBe(250);
    });
});