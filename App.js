import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigator from './navigation/AppNavigator';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (

    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </Provider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default App;
