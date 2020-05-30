import React from 'react';
import {Image} from 'react-native';
import {
  TouchableOpacityLog,
  StyledIcon,
  StyledHeader,
  StyledText,
  StyledViewDetails,
  StyledViewLeft,
} from './singleCallLogStyles';

function SingleCallLog({data, onCallLogPress}) {
  if (data.type === 'OUTGOING') {
    path = require(`../icons/outgoing.png`);
  } else if (data.type === 'INCOMING') {
    path = require(`../icons/incoming.png`);
  } else if (data.type === 'MISSED') {
    path = require(`../icons/missed-call.png`);
  }
  return (
    <TouchableOpacityLog onPress={onCallLogPress(data)}>
      <StyledViewLeft>
        <StyledIcon>
          <Image source={path} />
        </StyledIcon>
        <StyledViewDetails>
          <StyledHeader>
            {data.name ? data.name : data.phoneNumber}
          </StyledHeader>
          <StyledText>{data.name ? data.phoneNumber : ''}</StyledText>
          <StyledText>{data.dateTime}</StyledText>
        </StyledViewDetails>
      </StyledViewLeft>
      <Image source={require(`../icons/whatsapp.png`)} />
    </TouchableOpacityLog>
  );
}

export default SingleCallLog;
