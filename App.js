import React, {useEffect} from 'react';
import Container from './components';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <Container />;
};

export default App;
