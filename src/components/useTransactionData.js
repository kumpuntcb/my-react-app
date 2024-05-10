import { useState, useEffect } from 'react';
import axios from 'axios';

const useTransactionData = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          'https://localhost:7147/api/Money_transctions',
          {
            headers: {
              'Access-Control-Allow-Origin': '*', // อนุญาตให้เข้าถึงจากทุกโดเมน
              'Content-Type': 'application/json' // ระบุ Content-Type เป็น JSON
            }
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return transactions;
};

export default useTransactionData;
