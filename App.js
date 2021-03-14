import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {TProvider, TContext} from './app/context/transactionsContext';
import RootNavigation from './app/navigation/rootNavigation';

const App = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TProvider>
        <TContext.Consumer>{() => <RootNavigation />}</TContext.Consumer>
      </TProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
