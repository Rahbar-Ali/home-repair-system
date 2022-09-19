import styled from 'styled-components';

import { Image, View, TextInput, Text, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
// colors

export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#6D28D9",
    green: "#fdbe61",
    gray: "#51a0de",
    black: '#112233',
    white: 'white',
    accent: 'white',
    green2: '#039a83',
    light: '#EEEEEE',
    gray: '#CCCCCC',
    red: '#ff5454',
    gold: 'gold',
    purple: 'purple',
    skyBlue: 'skyblue',
};

const { primary, secondary, tertiary, darkLight, brand, green, gray } = Colors;

const { height, width } = Dimensions.get('window');

export const StyledContainer = styled.View`
    flex: 1;
    background-color: ${secondary};
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

export const Card = styled.TouchableOpacity`
    height: 160px;
    width: 120px;
    margin-horizontal: 6px;
    margin-bottom: 20px;
    margin-top: 20px;
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
    font-weight: bold;
    text-align: center;
    margin-top: 5px;
`;

export const ContentCardTextExtra = styled.Text`
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    margin-top: 5px;
`;

export const ContentCardSlider = styled.View`
    height: 140px;
    width: 380px;
    margin-horizontal: 6px;
    margin-bottom: 20px;
    margin-top: 5px;
    border-radius: 15px;
    elevation: 13;
    background-color: white;
`;

export const ContentSliderImageView = styled.View`
    width: 380px;
    justify-content: center;
    align-items: center;
`;

export const ContentSliderImage = styled.Image`
    height: 100%;
    width: 380px;
    resizeMode: cover;
    
`;

export const ContentCardTopServies = styled.View`
height: 124px;
width: 95%;
margin-horizontal: 8px;
margin-bottom: 20px;
margin-top: 10px;
border-radius: 15px;
elevation: 13;
background-color: white;
`;

export const ScreenCartMain = styled.View`
height: 130px;
width: 100%;
flex-Direction: row;
    flex-Wrap: wrap;
    align-Items: flex-start;
`;


export const ScreenCart = styled.View`
    height: 130px;
    width: 20%;
`;

export const ScreenCartText = styled.View`
    height: 130px;
    width: 50%;
`;

export const ScreenCartTextInline = styled.View`
    height: 20px;
    width: 100%;
    flex-Direction: row;
    margin-left: 12px;
    margin-top: 8px;
    
`;

export const ScreenCartTextInlineView = styled.View`
    
    
`;

export const ScreenCartTextInlineViewFirst = styled.View`
    


width: 80%;
    flex-Direction: row;
    
`;




export const ScreenCartTextInlineMain = styled.View`
    height: 20px;
    width: 100%;
    flex-Direction: row;
    margin-left: 14px;
    margin-top: 8px;
    
`;

export const ScreenCartTextInlineExtra = styled.View`
height: 24px;
width: 68px;
padding: 2px;
justify-content: center;
    border-radius: 8px;
    background-color: #fdbe61;
`;
export const ScreenCartTextInlineExtraSec = styled.View`
   
    
    margin-left: 16px;
    
`;

export const ScreenCartTextList = styled.Text`

font-size: 16px;
`;

export const ScreenCartTextListMain = styled.Text`
font-size: 18px;
`;

export const CartLine = styled.View`
    height: 2px;
    width: 140%;
    background-color: ${darkLight};
    margin-vertical: 3;
`;

export const ContentCardServies = styled.View`
    height: 350px;
    width: 93%;
    margin-horizontal: 6px;
    margin-bottom: 20px;
    margin-top: 5px;
    border-radius: 15px;
    elevation: 13;
    background-color: white;
    flex-Direction: row;
    flex-Wrap: wrap;
    align-Items: flex-start;
`;

export const ContentCardServiesflex = styled.View`

`;

export const FirstCardContent = styled.View`
margin-top: 3px;
margin-bottom: 10px;
`;

export const CardContent = styled.TouchableOpacity`
 
    height: 80px;
    width: 75px;
    border-radius: 100px;
`;

export const StyledCardContent = styled.View`
 
align-content: center;
align-items: center;    
`;

export const StyledCardContentImageView = styled.View`
   
    margin-top: 10px;
`;

export const StyledContentCardImage = styled.Image`
    width: 60px;
    height: 60px;
    resizeMode: cover;
`;

export const StyledCardContentText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-top: 3px;
`;

export const ServiceContentCardServies = styled.View`
    height: 1000px;
    width: 93%;
    margin-horizontal: 6px;
    margin-bottom: 20px;
    margin-top: 5px;
    border-radius: 15px;
    elevation: 13;
    background-color: white;
    flex-Direction: row;
    flex-Wrap: wrap;
    align-Items: flex-start;
`;

export const ServiceFirstCardContent = styled.View`
margin-top: 3px;
margin-left: 16px;
margin-bottom: 10px;
`;

export const ServiceCardContent = styled.TouchableOpacity`
 
    height: ${height / 11};
    width: ${width / 6 + 10};
    border-radius: 100px;
`;

export const ServiceStyledCardContent = styled.View`
 
align-content: center;
align-items: center;    
`;

export const ServiceStyledCardContentImageView = styled.View`
   
    margin-top: 10px;
`;

export const ServiceStyledContentCardImage = styled.Image`
    width: 60px;
    height: 60px;
    resizeMode: cover;
`;

export const ServiceStyledCardContentText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-top: 3px;
`;

export const Center = styled.View`
    margin-top: 12px;
    margin-left: 50px;
`;

export const CenterText = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: white;
`;

export const ContentCardAllServies = styled.View`
    height: 1000px;
    width: 100%;
    background-color: white;
`;

export const ContentCardAllServiesTop = styled.View`
    height: 180px;
    width: 100%;
    background-color: gray;
`;

export const ContentCardAllServiesBottom = styled.View`
    height: 600px;
    width: 100%;
`;

export const ContentCardListServiceMain = styled.View`
    height: 120px;
    width: 80%;
    background-color: ${green};
    margin-top: 110px;
    margin-left: 40px;
    border-radius: 15px;
    elevation: 13;
`;

export const ContentCardListServiceProfile = styled.View`
    height: 110px;
    width: 120px;
    background-color: white;
    border-radius: 15px;
    elevation: 13;
    margin-left: 110px;
    margin-vertical: -50px;
`;

export const ContentCardListServiceProfileText = styled.View`
    height: 50px;
    width: 300px;
    margin-left: 20px;
    margin-top: 52px;
`;

export const ContentCardListServiceText = styled.Text`
font-size: 22px;
text-align: center;
color: white;
`;

export const ContentCardListServiceTextExtra = styled.Text`
font-size: 14px;
text-align: center;
color: white;
`;

export const ContentCardAllServiesBottomList = styled.View`
    height: 330px;
    width: 90%;
    
    margin-top: 65px;
    margin-left: 20px;
    border-radius: 15px;
    elevation: 8;
    background-color: white;

`;

export const ContentCardAllServiesBottomTouch = styled.TouchableOpacity`
    height: 28px;
align-items: center;    
flex-Direction: row;

margin: 10px;
`;

export const ContentCardListServiceTextTocuh = styled.Text`
font-size: 16px;
margin-left: 10px;
`;

export const ContentCardAllServiesBottomListIcon = styled.View`
    height: 40px;
    width: 40px;
    border-radius: 5px;
    background-color: ${brand};
padding-top: 4px;
    align-items: center;
`;

export const ContentCardAllServiesBottomListSec = styled.View`
    height: 330px;
    width: 90%;
    
    margin-top: 30px;
    margin-left: 20px;
    border-radius: 15px;
    elevation: 8;
    background-color: white;

`;