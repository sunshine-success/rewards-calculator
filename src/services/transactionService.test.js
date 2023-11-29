import { fetchTransactions } from './transactionService';

// Mock the data file
jest.mock('../data/transactions.json', () => ({
    __esModule: true,
    default: [
        {
            "customerId": "C001",
            "transactions": [
                {   "date": "2023-08-05", "amount": 120 },
                {   "date": "2023-08-07", "amount": 60  },
                {   "date": "2023-09-05", "amount": 120 },
                {   "date": "2023-09-20", "amount": 40  },
                {   "date": "2023-10-01", "amount": 20  },
                {   "date": "2023-10-30", "amount": 210  },
                {   "date": "2023-11-20", "amount": 300  },
                {   "date": "2023-11-25", "amount": 200 }
            ]
        }
    ],
}));

describe('fetchTransactions', () => {
    test('successfully fetches transactions', async () => {
        await expect(fetchTransactions()).resolves.toEqual(expect.arrayContaining([
            // Match objects in the array
            expect.objectContaining({
                "customerId": "C001",
                "transactions": [
                    {   "date": "2023-08-05", "amount": 120 },
                    {   "date": "2023-08-07", "amount": 60  },
                    {   "date": "2023-09-05", "amount": 120 },
                    {   "date": "2023-09-20", "amount": 40  },
                    {   "date": "2023-10-01", "amount": 20  },
                    {   "date": "2023-10-30", "amount": 210  },
                    {   "date": "2023-11-20", "amount": 300  },
                    {   "date": "2023-11-25", "amount": 200 }
                ]
            })
        ]));
    });

    test('returns an error if no transactions are found', async () => {
        // Override the mock to simulate no transactions
        require('../data/transactions.json').default = [];
        await expect(fetchTransactions()).rejects.toThrow('404 Not Found');
    });
});