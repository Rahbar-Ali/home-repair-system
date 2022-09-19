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
    gray: "#51a0de",
};

const { primary, secondary, tertiary, darkLight, brand, green, gray } = Colors;

export const StyledContainer = styled.View`
    width: 100%;
    height: 240px;
`;

export const StyledInnerContainer = styled.View`
    width: 100%;
    height: 180px;
    align-items: center;
    border-bottom-end-radius: 20px;
    border-bottom-start-radius: 20px;
    background-color: ${green};
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
    margin-left: 11px;
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
    margin-left: 5px;
    height: 60px;
    width: 180px;
    
${(props) => props.chat == true && `
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

export const Card = styled.View`
    height: 95px;
    width: 90px;
    margin-left: 30px;
    border-radius: 15px;
    elevation: 13;
    background-color: white;
`;

export const StyledCard = styled.View`
    height: 160px;
    width: 100%;
    flexDirection: column;
`;

export const ContentCardImageView = styled.View`
    width: 100%;
    height: 125px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;

export const ContentCardImage = styled.Image`
    width: 110px;
    height: 125px;
    resizeMode: cover;
`;

export const ContentCardText = styled.Text`
    font-size: 15px;
    text-align: center;
    color: ${darkLight};
`;

export const ContentCardTextExtra = styled.Text`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-top: 40px;
`;

export const ContentCardListText = styled.Text`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    color: #176ba7;
    
    margin-top: 24px;
`;

export const ContentCard = styled.View`
    height: 140px;
    width: 380px;
    margin-horizontal: 6px;
    margin-bottom: 20px;
    margin-top: 5px;
    border-radius: 15px;
    elevation: 13px;
    background-color: white;
`;

export const ContentSliderImageView = styled.View`
    width: 380px;
    justify-content: center;
    align-items: center;
`;

export const ContentSliderImage = styled.Image`
    height: 140px;
    width: 380px;
    resizeMode: cover;
`;

export const ContentCardServies = styled.View`
    height: 350px;
    width: 90%;
    margin-horizontal: 6px;
    margin-bottom: 20px;
    margin-top: 5px;
    border-radius: 15px;
    elevation: 13px;
    background-color: white;
`;

export const ContentCardTopServies = styled.View`
    height: 300px;
    width: 90%;
    margin-horizontal: 6px;
    margin-bottom: 20px;
    margin-top: 5px;
    border-radius: 15px;
    elevation: 13px;
    background-color: white;
`;

export const ContentCardSlider = styled.View`
    height: 100px;
    width: 400px;
    margin-left: 5px;
    margin-top: 38px;
    flexDirection: row;
`;

export const StyledMainContainer = styled.View`

    border-bottom-end-radius: 20px;
    border-bottom-start-radius: 20px;
`;

export const StyledMainContainerSecond = styled.View`
    border-bottom-end-radius: 20px;
    border-bottom-start-radius: 20px;
`;

export const StyledButtonContainer = styled.TouchableOpacity`
    
    
    
    height: 80px;
    width: 100%;
    flex-direction: row;
    `;

export const LeftListIcon = styled.View`
    left: 32px;
    position: absolute;
    z-index: 1;
    top: 3px;
`;