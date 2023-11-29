import transactions from '../data/transactions.json';

export const fetchTransactions = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (transactions.length === 0) {
                reject(new Error('404 Not Found'));
            } else {
                resolve(transactions);
            }
        }, 2000);
    });
};