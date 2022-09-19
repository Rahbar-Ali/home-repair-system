import styled from 'styled-components';

import { Image, View, TextInput, Text, TouchableOpacity } from 'react-native';
// colors

export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#6D28D9",
    green: "#108981",
    red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    background-color: black;
`;

export const StyledInnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageImageLogo = styled.Image`
    width: 350px;
    height: 300px;
    margin-vertical: 5px;
`;

export const PageText = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 45px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`;

export const SubTitleError = styled.Text`
    margin-top: -10;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: bold;
    color: red;
`;

export const BackImage = styled.Image`
    flex: 1;
    resizeMode: cover;
    position: absolute;
    width: 100%;
    height: 100%;
`;
export const StyledFormArea = styled.View`
    width: 90%;
`;
export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 48px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
    
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-weight: bold;
    font-size: 14px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 8px;
    top:34px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top:38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
    
${(props) => props.register == true && `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
`}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 20px;
`;

export const Line = styled.View`
    height: 4px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 2;
`;

export const AppText = styled.Text`
    justify-content: center;
    flex-direction: row;
    background-color: red;
`;

export const LineExtra = styled.View`
`;