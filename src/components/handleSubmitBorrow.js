// handleSubmitBorrow.js
const handleSubmitBorrow = async (e) => {
    e.preventDefault();
  
    const borrower = e.target.elements.borrower.value;
    const lender = e.target.elements.lender.value;
    const amount = e.target.elements.amount.value;
    const type = e.target.elements[3].innerText;
  
    try {
      const response = await fetch('https://localhost:7147/api/Money_transctions/savedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          borrower_name: borrower,
          lender_name: lender,
          amount: parseFloat(amount),
          transaction_date: new Date().toISOString(),
          transaction_type: type
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit');
        
      }
    } catch (error) {
      console.error('Error:', error);
      alert('You have already returned all the borrowed money. There is no more debt to be returned.');
    }
  };
  
  export default handleSubmitBorrow;
  