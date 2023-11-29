import { POINTS_THRESHOLD, REWARD_MULTIPLIER } from './constants';

export const calculateUnitPoints = (amount) => {
    // No points for amounts less than the lower threshold
    if (amount <= POINTS_THRESHOLD.LOWER) {
        return 0;
        // Standard points for amounts between lower and upper thresholds
    } else if (amount <= POINTS_THRESHOLD.UPPER) {
        return amount - POINTS_THRESHOLD.LOWER;
        // Double points for amounts exceeding the upper threshold
    } else {
        return (amount - POINTS_THRESHOLD.UPPER) * REWARD_MULTIPLIER + POINTS_THRESHOLD.LOWER;
    }
};

// This function calculate the monthly points and total point for 3 month
export const aggregatePoints = (transactions) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const monthlyPoints = {};
    let totalPoints = 0;

    transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        const transactionYear = transactionDate.getFullYear();
        const transactionMonth = transactionDate.getMonth();

        // Calculate difference in months from the current month
        const monthDiff = (currentYear - transactionYear) * 12 + (currentMonth - transactionMonth);

        // Consider only transactions from the last 3 months
        if (monthDiff >= 0 && monthDiff < 3) {
            const points = calculateUnitPoints(transaction.amount);
            // Adjust month for the year-month key
            const adjustedMonth = transactionMonth + 1;
            const monthYearKey = `${transactionYear}-${adjustedMonth.toString().padStart(2, '0')}`;

            monthlyPoints[monthYearKey] = (monthlyPoints[monthYearKey] || 0) + points;
            totalPoints += points;
        }
    });

    return { monthlyPoints, totalPoints };
};