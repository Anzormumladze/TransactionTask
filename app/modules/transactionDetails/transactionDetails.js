import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {currencyStatus} from '../transaction/components/transactionSection';
import {TContext} from '../../context/transactionsContext';
import {launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';

const TransactionDetails = ({route}) => {
  const {transactionsReceipt} = useContext(TContext);
  const data = route?.params?.item;

  const currencySign = props => {
    if (props.currency == currencyStatus.USD) {
      return <Text style={styles.amountText}>{`${props.amount} $`}</Text>;
    } else if (props.currency === currencyStatus.GEL) {
      return <Text style={styles.amountText}>{`${props.amount} ₾`}</Text>;
    } else if (props.currency === currencyStatus.ILS) {
      return <Text style={styles.amountText}>{`${props.amount} ₪`}</Text>;
    }
  };

  const addReceipt = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      e => {
        transactionsReceipt(data.id, e.uri);
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.merchantContainer}>
        <Image
          source={{uri: data?.merchant_logo}}
          style={styles.merchantLogo}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.dataTextContainer}>
          <Text>{data.status}</Text>
          <Text style={styles.merchantText}>{data.merchant}</Text>
          <Text>{currencySign(data)}</Text>
        </View>
        <View style={styles.receiptContainer}>
          {data?.receipt_url ? (
            <Image
              source={{uri: data?.receipt_url}}
              style={styles.receiptImage}
            />
          ) : (
            <View style={styles.addReceiptContainer}>
              <TouchableOpacity
                onPress={addReceipt}
                style={styles.buttonContainer}>
                <Text style={styles.addReceiptText}>ADD RECEIPT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {moment(data.date).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 3,
  },
  merchantLogo: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  merchantContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  dataTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  merchantText: {
    color: '#0d244d',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  receiptImage: {
    width: 350,
    height: 350,
  },
  receiptContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  dateContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    overflow: 'hidden',
    width: '100%',
    height: 60,
    justifyContent: 'center',
  },
  dateText: {
    color: '#fff',
  },
  addReceiptContainer: {
    position: 'absolute',
    top: 50,
  },
  buttonContainer: {
    backgroundColor: '#18a0fb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    width: 350,
  },
  addReceiptText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
