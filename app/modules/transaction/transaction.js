import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import TransactionData from '../mockData/transactions.json';
import TransactionSection from './components/transactionSection';
import TransactionHeader from './components/transactionHeader';
import useDebounce from '../../utils/hooks/useDebounce';
import {TContext} from '../../context/transactionsContext';

const Transaction = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [data, setData] = useState(TransactionData);
  const {transactions} = useContext(TContext);

  const searchedResult = async keywoard => {
    const filtered = data.filter(transaction =>
      transaction.merchant.toLowerCase().includes(keywoard.toLowerCase()),
    );
    return filtered;
  };

  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Set isSearching state
        searchedResult(debouncedSearchTerm).then(result => {
          setData(result);
        });
      }
      if (searchTerm === '') {
        setData(TransactionData);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm],
  );
  return (
    <SafeAreaView style={styles.container}>
      <TransactionHeader setSearchTerm={setSearchTerm} />
      <View style={styles.bottomLine} />

      <View style={{flex: 1}}>
        <Text style={styles.allTransactionText}>All Transactions</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TransactionSection item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  allTransactionText: {
    color: '#5d697f',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  bottomLine: {
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 5,
    borderTopColor: 'rgba(56, 72, 98, 0.05)',
  },
});
