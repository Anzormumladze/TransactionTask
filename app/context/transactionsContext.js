import React, {useState, useCallback} from 'react';
import TransactionsData from '../modules/mockData/transactions.json';
import Moment from 'moment';

const sortedArray = TransactionsData.sort(
  (a, b) =>
    new Moment(a.date).format('MMMM Do YYYY, h:mm:ss a') -
    new Moment(b.date).format('MMMM Do YYYY, h:mm:ss a'),
); //sort data by date

const TContext = React.createContext();

const TProvider = ({children}) => {
  const [transactionData, setTransactionData] = useState(sortedArray);

  const transactionsReceipt = useCallback(
    (id, url) => {
      const index = transactionData.findIndex(item => item.id === id);
      setTransactionData(() => {
        const updated = [...transactionData];
        updated[index].receipt_url = url;
        return updated;
      });
    },
    [transactionData, setTransactionData],
  );
  return (
    <TContext.Provider
      value={{
        transactionData,
        transactionsReceipt,
      }}>
      {children}
    </TContext.Provider>
  );
};

export {TProvider, TContext};
