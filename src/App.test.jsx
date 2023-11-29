import React from 'react';
import { render, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { fetchTransactions } from './services/transactionService';

jest.mock('./services/transactionService');

describe('App Component', () => {
    test('displays loading message', async () => {
        fetchTransactions.mockResolvedValueOnce([]); // Mock an empty response
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
    });

    test('displays error message on fetch failure', async () => {
        fetchTransactions.mockRejectedValueOnce(new Error('404 Not Found'));
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText('404 Not Found')).toBeInTheDocument();
        });
    });

    test('renders TransactionList on successful data fetch', async () => {
        const mockData = [
            {
                customerId: 'C001',
                transactions: [
                    { date: '2023-11-01', amount: 120 },
                    { date: '2023-11-15', amount: 60 },
                ]
            }
        ];
        fetchTransactions.mockResolvedValueOnce(mockData);
        render(<App />);
        await waitFor(() => {
            expect(screen.getByTestId('rewards-table')).toBeInTheDocument();
        });
    });

});
