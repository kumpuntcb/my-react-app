import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DebtSummaryTable = () => {
    const [debts, setDebts] = useState([]);

    useEffect(() => {
        const fetchDebts = async () => {
            try {
                const response = await axios.get('https://localhost:7147/api/Money_transctions');
                setDebts(response.data);
            } catch (error) {
                console.error('Error fetching debts:', error);
            }
        };

        fetchDebts();
    }, []);

    // สร้างอ็อบเจ็กต์เพื่อเก็บยอดหนี้ของแต่ละบุคคล
    const debtByDebtor = {};
    debts.forEach(debt => {
        const borrowerName = debt.borrower_name;
        const creditorName = debt.lender_name;
        const amount = debt.amount;
        const transactionType = debt.transaction_type;

        if (!debtByDebtor[borrowerName]) {
            debtByDebtor[borrowerName] = { totalDebt: 0, creditorName: '' };
        }

        // นำจำนวนเงินเข้าหนี้หรือลดหนี้ตามการทำธุรกรรม
        if (transactionType === 'Borrow') {
            debtByDebtor[borrowerName].totalDebt += amount;
        } else if (transactionType === 'Return') {
            debtByDebtor[borrowerName].totalDebt -= amount;
        }

        debtByDebtor[borrowerName].creditorName = creditorName;
    });

    return (
        <div>
            <h2>Debt Summary</h2>
            <table>
                <thead>
                    <tr>
                        <th>Debtor Name</th>
                        <th>Creditor Name</th>
                        <th>Total Debt</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(debtByDebtor).map(([debtorName, { totalDebt, creditorName }]) => (
                        // เช็คเงื่อนไขก่อนแสดง JSX
                        totalDebt !== 0 && (
                            <tr key={debtorName}>
                                <td>{debtorName}</td>
                                <td>{creditorName}</td>
                                <td>{totalDebt}</td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DebtSummaryTable;
