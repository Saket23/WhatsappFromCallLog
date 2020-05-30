import React from 'react';
import {Alert, Modal, Image, TouchableOpacity} from 'react-native';

import {
  Inputs,
  ModalContainer,
  ModalView,
  TouchableHighlightStyle,
  ModalText,
  ButtonText,
  TextInputStyle,
  SignText,
} from './confirmModalStyle';

const ConfirmModal = ({
  modalVisible,
  onClose,
  onConfirm,
  number,
  countryCode,
  onChangeCountryCode,
  onChangeNumber,
}) => {
  return (
    <ModalContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <ModalContainer>
          <ModalView>
            <TouchableOpacity onPress={onClose}>
              <Image source={require(`../icons/cross.png`)} />
            </TouchableOpacity>
            <ModalText>Please confirm the country code</ModalText>
            <Inputs>
              <SignText>+</SignText>
              <TextInputStyle
                onChangeText={onChangeCountryCode}
                value={countryCode}
                keyboardType="numeric"
              />
              <SignText>-</SignText>
              <TextInputStyle
                onChangeText={onChangeNumber}
                value={number}
                keyboardType="numeric"
              />
            </Inputs>
            <TouchableHighlightStyle onPress={onConfirm}>
              <ButtonText>Confirm</ButtonText>
            </TouchableHighlightStyle>
          </ModalView>
        </ModalContainer>
      </Modal>
    </ModalContainer>
  );
};

export default ConfirmModal;
