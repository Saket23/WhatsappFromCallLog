import React, {useEffect} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import CallLogs from 'react-native-call-log';

const Container = () => {
  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message: 'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          CallLogs.load(25).then(c => console.log(c));
        } else {
          console.log('Call Log permission denied');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <View>
      <Text>Hi Everyone</Text>
    </View>
  );
};

export default Container;
