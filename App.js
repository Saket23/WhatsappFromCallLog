import React, {useEffect} from 'react';
import Container from './components';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import SplashScreen from 'react-native-splash-screen';
import reducer from './reducers';

const store = createStore(reducer);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
};

export default App;
