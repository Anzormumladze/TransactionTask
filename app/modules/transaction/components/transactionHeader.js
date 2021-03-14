import React from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';

const customHeaderInput = ({setSearchTerm}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={{
            uri:
              'https://cdn1.iconfinder.com/data/icons/pixel-perfect-at-16px-volume-1/16/5023-512.png',
          }}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          onChangeText={text => {
            setSearchTerm(text);
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    width: '100%',
  },
  searchContainer: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f4f7',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    fontSize: 16,
    paddingStart: 45,
    padding: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 12,
  },
  filterIcon: {
    width: 32,
    height: 32,
    marginLeft: 8,
    backgroundColor: '#f2f4f7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  filterImg: {
    width: 16,
    height: 16,
  },
});

export default customHeaderInput;
