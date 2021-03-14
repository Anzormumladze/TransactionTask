import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Transaction from '../modules/transaction/transaction';
import TransactionDetails from '../modules/transactionDetails/transactionDetails';

const RootStack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="transaction"
        screenOptions={{unmountOnBlur: true, gestureEnabled: false}}>
        <RootStack.Screen
          name="transaction"
          component={Transaction}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="transactionDetails"
          component={TransactionDetails}
          options={{title: 'Transaction Detail'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
