import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionList from './RewardsTable';

describe('TransactionList', () => {
    const mockData = [
        {
            customerId: 'C001',
            monthlyPoints: { '2023-09': 10, '2023-10': 20, '2023-11': 30 },
            totalPoints: 60
        }
    ];

    test('renders without crashing', () => {
        render(<TransactionList data={mockData} />);
        expect(screen.getByText('This shows reward points for the past 3 months.')).toBeInTheDocument();
    });

    test('renders correct number of rows', () => {
        render(<TransactionList data={mockData} />);
        const rows = screen.getAllByRole('row');
        // Including header row
        expect(rows.length).toBe(mockData.length + 1);
    });

    test('displays monthly points and total points correctly', () => {
        render(<TransactionList data={mockData} />);
        expect(screen.getByText('60')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
    });

    test('table headers are correct', () => {
        render(<TransactionList data={mockData} />);
        expect(screen.getByText('Customer ID')).toBeInTheDocument();
        expect(screen.getByText('2023-09')).toBeInTheDocument();
        expect(screen.getByText('2023-10')).toBeInTheDocument();
        expect(screen.getByText('2023-11')).toBeInTheDocument();
        expect(screen.getByText('Total Points')).toBeInTheDocument();
    });
});
