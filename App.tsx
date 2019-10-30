import React from 'react';
import { SafeAreaView } from 'react-native';
import { register } from 'react-native-bundle-splitter';

const Screen = register({
    require: () => require('./HelloWorld')
});

const App = () => {
  return (
    <>
      <SafeAreaView>
          <Screen />
      </SafeAreaView>
    </>
  );
};

export default App;
