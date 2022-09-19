import styled from 'styled-components';

import { Image, View, TextInput, Text, TouchableOpacity } from 'react-native';
// colors

export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#6D28D9",
    green: "#fdbe61",
    red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    background-color: black;
    
`;

export const StyledInnerContainer = styled.View`
width: 100%;
margin-left: auto;

margin-right: auto;
`;

export const PageImageLogo = styled.Image`

    width: 100px;
    height: 00px;
`;

export const PageText = styled.Text`
    font-size: 50px;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
    margin-top: 60px;
`;

export const PageTextExtra = styled.Text`
    margin-top: 100px;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
`;

export const SubTitle = styled.Text`
    margin-top: 3px;
    margin-left: 135px;
    font-size: 14px;
    letter-spacing: 1px;
    color: ${tertiary};
    
    font-weight: bold;
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
    height: 80%;
`;
export const StyledFormArea = styled.View`
    width: 94%;
`;

export const StyledTextInput = styled.TextInput`
    padding: 15px;
    padding-left: 48px;
    padding-right: 55px;
    font-size: 16px;
    height: 60px;
    width: 260px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
    border-bottom-color: ${brand};
    border-bottom-width: 1px;
    ${(props) => props.width == true && `
    width: 380px;
`}
    
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
    
    margin-left: 130px;
    padding: 15px;
    background-color: ${green};
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    margin-top: 32px;
    height: 60px;
    width: 240px;
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 20px;
    font-weight: bold;
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