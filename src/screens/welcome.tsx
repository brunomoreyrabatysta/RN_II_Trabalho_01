import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import WelcomeImage from "../../assets/images/welcome-image.png"
import Button from "../components/button";

type TextProps = {
    color: string;
}

const Container = styled.View`
    flex: 1;
    //background-color: red;
`;

const ImageContainer = styled.View`
    background-color: #f9faff;
    flex: 2;
    padding: 16px;
`;

const Logo = styled.Image`
    width: 100%;
    height: 100%;
`;

const ContentWrapper = styled.View`
    background-color: #242238;
    flex: 0.3;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding: 16px;
`;

const Row = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const Title = styled.Text<TextProps>`
    font-size: 32px;
    color: ${ props => props.color };
    text-align: center;
    margin: 24px 0 0 0;
`;

const SubTitle = styled.Text`
    font-size: 22px;
    color: #fff;
    margin: 8px 0 32px 0;
    text-align: center;
    opacity: 0.7;
`;

const Welcome = () => {
    const { navigate } = useNavigation();
    
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <SafeAreaView />
            <ImageContainer>
                <Logo source={ WelcomeImage } resizeMode="contain"/>
            </ImageContainer>
            <ContentWrapper>
                <Row>
                    <Title color="#fff">Mercado</Title>
                    <Title color="#D6796C">Online</Title>
                </Row>
                <SubTitle>Sua solução de mercado completa!</SubTitle>
                <Button 
                    activeOpacity={0.7}
                    buttonColor="#e77a6c"
                    labelColor="#fff"
                    title="Quero conhecer"
                    onPress={() => 
                        navigate("Login")
                    }
                />
            </ContentWrapper>
        </ScrollView>
    );
};

export default Welcome;