import { register } from 'react-native-bundle-splitter';

const Screen = register({
    require: () => require('./View')
});

export default Screen;