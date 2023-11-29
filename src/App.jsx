import './App.css';
import React, { useState, useEffect } from 'react';
import { fetchTransactions } from './services/transactionService';
import { aggregatePoints } from './utils/calculatePoints';
import RewardsTable from './components/RewardsTable';

function App() {
    const [rewardsData, setRewardsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetchTransactions()
            .then(transactions => {
                const processedData = transactions.map(customer => {
                    const { monthlyPoints, totalPoints } = aggregatePoints(customer.transactions);
                    return {
                        customerId: customer.customerId,
                        monthlyPoints,
                        totalPoints
                    };
                });
                setRewardsData(processedData);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <RewardsTable data={rewardsData} />
        </div>
    );
}

export default App;