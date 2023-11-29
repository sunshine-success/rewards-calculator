import React from 'react';

const RewardsTable = ({ data }) => {

    // Function to get unique keys (months) from all customers' monthlyPoints
    const getUniqueMonths = (data) => {
        const allMonths = data.flatMap(customer => Object.keys(customer.monthlyPoints));
        return Array.from(new Set(allMonths)).sort();
    };

    const uniqueMonths = getUniqueMonths(data);

    return (
        <div data-testid="rewards-table">
            <h3>This shows reward points for the past 3 months.</h3>
            <table>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        {uniqueMonths.map(month => <th key={month}>{month}</th>)}
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(customer => (
                        <tr key={customer.customerId}>
                            <td>{customer.customerId}</td>
                            {uniqueMonths.map(month => (
                                <td key={month}>{customer.monthlyPoints[month] || 0}</td>
                            ))}
                            <td>{customer.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RewardsTable;