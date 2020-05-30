import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PermissionsAndroid, FlatList, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import CallLogs from 'react-native-call-log';

import {storeCallLog} from '../actions/storeCallLogs';
import SingleCallLog from './SingleCalLog';
import ConfirmModal from './ConfirmModal';
import {ifCountryCodeIsAdded} from '../utils/verify';
import {
  StyledSafeAreaView,
  StyledView,
  StyledText,
  StyledTextBack,
  Back,
} from './styles';

class Container extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openWebView: false,
      number: '1',
      modalVisible: false,
      countryCode: '91',
    };
  }

  onCallLogPress = d => e => {
    if (ifCountryCodeIsAdded(d.phoneNumber)) {
      this.setState({openWebView: true, number: d.phoneNumber});
    } else {
      this.setState({modalVisible: true, number: d.phoneNumber});
    }
  };

  handleOnClickBack = () => {
    this.setState({openWebView: false});
  };

  onModalClose = () => {
    this.setState({modalVisible: false, number: 1});
  };

  onModalConfirm = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        openWebView: true,
        modalVisible: false,
        number: `+${prevState.countryCode}${prevState.number}`,
        countryCode: '91',
      };
    });
  };

  onChangeCountryCode = v => {
    this.setState({countryCode: v});
  };

  onChangeNumber = v => {
    this.setState({number: v});
  };

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
          CallLogs.load(50).then(c => {
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
    const {openWebView, modalVisible, countryCode, number} = this.state;
    return (
      <StyledSafeAreaView>
        {!openWebView && (
          <StyledView>
            {data.length === 0 ? (
              <StyledText>No Call Log To show</StyledText>
            ) : (
              <>
                <StyledText>Touch on call log to open WhatsApp</StyledText>
                <FlatList
                  data={data}
                  renderItem={({item}) => {
                    return (
                      <SingleCallLog
                        data={item}
                        onCallLogPress={this.onCallLogPress}
                      />
                    );
                  }}
                  extraData={data}
                  keyExtractor={(item, index) => `${index}`}
                />
              </>
            )}
          </StyledView>
        )}
        {modalVisible && (
          <ConfirmModal
            modalVisible={modalVisible}
            countryCode={countryCode}
            number={number}
            onClose={this.onModalClose}
            onChangeCountryCode={this.onChangeCountryCode}
            onChangeNumber={this.onChangeNumber}
            onConfirm={this.onModalConfirm}
          />
        )}
        {openWebView && number !== '1' && (
          <>
            <Back onPress={this.handleOnClickBack}>
              <Image source={require(`../icons/back.png`)} />
              <StyledTextBack>Back</StyledTextBack>
            </Back>
            <WebView
              source={{
                uri: `https://api.whatsapp.com/send?phone=${number}`,
              }}
            />
          </>
        )}
      </StyledSafeAreaView>
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
