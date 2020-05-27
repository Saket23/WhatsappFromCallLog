import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Image, PermissionsAndroid} from 'react-native';
import styled from 'styled-components/native';
import CallLogs from 'react-native-call-log';
import {storeCallLog} from '../actions/storeCallLogs';

const StyledView = styled.View`
  background-color: blue;
`;

const StyledText = styled.Text`
  color: red;
`;

class Container extends PureComponent {
  componentDidMount() {
    const {storeCallLog} = this.props;
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
          CallLogs.load(25).then(c => {
            storeCallLog(c);
          });
        } else {
          console.log('Call Log permission denied');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }
  render() {
    const {data} = this.props;
    console.log(data);
    return (
      <StyledView>
        {data.length === 0 ? (
          <StyledText>No Call Log To show</StyledText>
        ) : (
          data.map((d, i) => {
            let path;
            if (d.type === 'OUTGOING') {
              path = require(`../icons/outgoing.png`);
            } else if (d.type === 'INCOMING') {
              path = require(`../icons/incoming.png`);
            } else if (d.type === 'MISSED') {
              path = require(`../icons/missed-call.png`);
            }
            return (
              <StyledView key={i}>
                <StyledText>{d.name ? d.name : d.phoneNumber}</StyledText>
                <StyledText>{d.name ? d.phoneNumber : ''}</StyledText>
                <Image source={path} />
              </StyledView>
            );
          })
        )}
      </StyledView>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.storedCallLog.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({storeCallLog}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
