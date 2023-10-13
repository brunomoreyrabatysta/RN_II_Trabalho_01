import React from "react";
import styled from "styled-components/native";

type Props = {
    buttonColor: string;
    labelColor: string;
    title: string;
    activeOpacity: number;
    onPress: () => void;
}

const Touchable = styled.TouchableOpacity<{color: string}>`
    background-color: ${ props => props.color };
    height: 50px;
    border-radius: 16px;
    justify-content: center;
    /* margin-top: 32px; */
`;

const Label = styled.Text<{color: string}>`
    color: ${ props => props.color };
    font-size: 16px;
    text-align: center;
    font-weight: bold;
`;

const Button = ({
    buttonColor,
    labelColor,
    title,
    onPress,
    activeOpacity
}: Props) => {
    return (
        <Touchable 
            color={buttonColor}
            activeOpacity={activeOpacity}
            onPress={onPress}>
            <Label color={labelColor}>{title}</Label>
        </Touchable>
    );
}

export default Button;