import React from 'react';
import DebtSummaryTable from './components/DebtSummaryTable';
import useTransactionData from './components/useTransactionData';
import handleSubmitBorrow from './components/handleSubmitBorrow';

import './TransactionPage.css';

const UserTransactionsPage = () => {
    const transactions = useTransactionData();

    const handleBorrowSubmit = async (e) => {
        e.preventDefault();
        await handleSubmitBorrow(e);

    };

    const handleReturnSubmit = async (e) => {
        e.preventDefault();
        await handleSubmitBorrow(e);
        
    };

    return (
        <div className="container">
            <h1>Money Transactions</h1>

            <DebtSummaryTable />

            <div>
                <h2>Borrow Money</h2>
                <form onSubmit={handleBorrowSubmit}>
                    <label htmlFor="borrower">Borrower:</label>
                    <input type="text" id="borrower" name="borrower" />
                    <label htmlFor="lender">Lender:</label>
                    <input type="text" id="lender" name="lender" />
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" id="amount" name="amount" />
                    <button type="submit">Borrow</button>
                </form>
            </div>

            <div>
                <h2>Return Money</h2>
                <form onSubmit={handleReturnSubmit}>
                    <label htmlFor="borrower">Borrower:</label>
                    <input type="text" id="borrower" name="borrower" />
                    <label htmlFor="lender">Lender:</label>
                    <input type="text" id="lender" name="lender" />
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" id="amount" name="amount" />
                    <button type="submit">Return</button>
                </form>
            </div>

            <div>
                <h2>Transaction History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Borrower</th>
                            <th>Status</th>
                            <th>Lender</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.borrower_name}</td>
                                <td>{transaction.transaction_type}</td>
                                <td>{transaction.lender_name}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.transaction_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTransactionsPage;
