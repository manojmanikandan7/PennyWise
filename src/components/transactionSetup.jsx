import { useEffect } from 'react';
import axios from 'axios';

function TransactionSetup({ setDataAvailable, user_id }) {
  const setupTransactions = async () => {
    await axios.post("http://localhost:3000/checkBills", { user_id });
  }
  const writeRecentTransactions = async () => {
    await axios.post("http://localhost:3000/recentTransactions", { user_id });
    setDataAvailable(true);
  }

  useEffect(() => {
    setupTransactions();
    const timeoutId = setTimeout(() => {
      writeRecentTransactions();
    }, 500); // 0.5 second delay to allow database to be written to before it is read from. Not sure why `await` isn't helping here

    return () => clearTimeout(timeoutId);
  }, []);


  // Component renders nothing
  return null;
}

export default TransactionSetup;
