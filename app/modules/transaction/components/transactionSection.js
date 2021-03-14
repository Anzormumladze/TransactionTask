import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';

const transactionStatus = {
  CLEARED: 'CLEARED',
  PENDING: 'PENDING',
  DECLINED: 'DECLINED',
};

export const currencyStatus = {
  USD: 'USD',
  GEL: 'GEL',
  ILS: 'ILS',
};

const transactionSection = ({item, navigation}) => {
  const setTextBold = text => {
    return <Text style={styles.boldText}>{text}</Text>;
  };

  const currencySign = props => {
    if (props.currency == currencyStatus.USD) {
      return <Text style={styles.amountText}>{`${props.amount} $`}</Text>;
    } else if (props.currency === currencyStatus.GEL) {
      return <Text style={styles.amountText}>{`${props.amount} ₾`}</Text>;
    } else if (props.currency === currencyStatus.ILS) {
      return <Text style={styles.amountText}>{`${props.amount} ₪`}</Text>;
    }
  };

  const checkReceipt = props => {
    if (props.receipt_url === '') {
      return (
        <Image
          source={{
            uri: 'https://img.icons8.com/cotton/2x/receipt-declined.png',
          }}
          style={styles.noReceiptIcon}
        />
      );
    } else {
      return (
        <Image
          source={{
            uri:
              'https://pics.freeicons.io/uploads/icons/png/10946275291544610484-512.png',
          }}
          style={styles.receiptIcon}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      {item.status === transactionStatus.CLEARED ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('transactionDetails', {item});
          }}>
          <View style={styles.transactionContainer}>
            <Image
              source={{uri: item.merchant_logo}}
              style={styles.merchantLogoContainer}
              width={45}
              height={45}
            />
            <View style={{marginLeft: 10, marginBottom: 5}}>
              <Text style={styles.transactionText}>
                {setTextBold(item?.merchant)}
              </Text>
              {checkReceipt(item)}
              <Text style={styles.date}>
                {moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}
              </Text>
            </View>
            <View style={styles.keyContainer}>
              {currencySign(item)}
              <View style={styles.roundButton} />
            </View>
          </View>
          <View style={styles.bottomLine} />
        </TouchableOpacity>
      ) : item.status === transactionStatus.PENDING ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('transactionDetails', {item});
          }}>
          <View style={styles.transactionContainer}>
            <Image
              source={{uri: item.merchant_logo}}
              style={styles.merchantLogoContainer}
              width={45}
              height={45}
            />
            <View style={{marginLeft: 10, marginBottom: 5}}>
              <Text style={styles.transactionText}>
                {setTextBold(item?.merchant)}
              </Text>
              {checkReceipt(item)}
              <Text style={styles.date}>
                {moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}
              </Text>
            </View>
            <View style={styles.keyContainer}>
              {currencySign(item)}
              <View style={[styles.roundButton, {backgroundColor: 'blue'}]} />
            </View>
          </View>
          <View style={styles.bottomLine} />
        </TouchableOpacity>
      ) : item.status === transactionStatus.DECLINED ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('transactionDetails', {item});
          }}>
          <View style={styles.transactionContainer}>
            <Image
              source={{uri: item.merchant_logo}}
              style={styles.merchantLogoContainer}
              width={45}
              height={45}
            />
            <View style={{marginLeft: 10, marginBottom: 5}}>
              <Text style={styles.transactionText}>
                {setTextBold(item?.merchant)}
              </Text>
              <Text style={styles.date}>
                {moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}
              </Text>
            </View>
            <View style={styles.keyContainer}>
              {currencySign(item)}
              <View style={[styles.roundButton, {backgroundColor: 'red'}]} />
            </View>
          </View>
          <View style={styles.bottomLine} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default transactionSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#5d697f',
    opacity: 0.5,
  },
  transactionText: {
    fontSize: 16,
    color: '#5d697f',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3e4b63',
  },
  keyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#5d697f',
    marginRight: 2.5,
  },
  bottomLine: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    borderTopWidth: 2,
    borderTopColor: 'rgba(56, 72, 98, 0.05)',
  },
  roundButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'green',
    marginLeft: 15,
    marginRight: 5,
  },
  merchantLogoContainer: {
    borderRadius: 20,
    marginHorizontal: 5,
  },
  receiptIcon: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 0,
    top: 2.5,
  },
  noReceiptIcon: {
    position: 'absolute',
    right: -40,
    top: 2.5,
    width: 30,
    height: 30,
  },
});
