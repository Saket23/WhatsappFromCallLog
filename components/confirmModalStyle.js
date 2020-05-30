import styled from 'styled-components/native';

export const Inputs = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
  align-items: center;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const TouchableHighlightStyle = styled.TouchableHighlight`
  background-color: #0f4519;
  border-radius: 20px;
  padding: 10px;
  elevation: 2;
`;

export const ModalText = styled.Text`
  margin-bottom: 15px;
  text-align: center;
  font-size: 20px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

export const TextInputStyle = styled.TextInput`
  height: 40px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0px 5px;
`;

export const SignText = styled.Text`
  font-weight: 600;
  color: black;
  font-size: 18px;
  margin: 0px 5px;
`;
