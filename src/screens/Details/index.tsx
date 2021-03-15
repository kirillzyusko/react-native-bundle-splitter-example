import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {register} from 'react-native-bundle-splitter';

export default register({
  loader: () => import('./View'),
  placeholder: () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0398fc" />
    </View>
  ),
});
