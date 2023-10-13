import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { ICustomer, IItensOrder, IOrder } from "../common/user-interface";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fecthOrders } from '../services/user-service';

type LabelProps = {
    color: string;
    align: string;        
};

const Container = styled.View`
    flex: 1;
    background-color: #ededed;
`;

const LabelTitulo = styled.Text<LabelProps>`
  color: ${props => props.color};
  font-size: 16px;
  text-align: ${props => props.align};
  font-weight: bold;  
  width: 100px;
`;

const Label = styled.Text<LabelProps>`
  color: ${props => props.color};
  font-size: 16px;
  text-align: ${props => props.align};
  font-weight: bold;
`;

const Item = styled.View`
    background-color: #000;
    margin-top: 8px;
    padding: 8px;
`;

const Item1 = styled.View`    
    margin: 0px 0px 0px 0px;
    padding: 0px;
`;

const OrderList = () => {
    const { navigate } = useNavigation();
    
    const [listOrder, setListOrder] = useState<IOrder[]>([]);

    useEffect(() => {
        const listOrders: IItensOrder = fecthOrders();

        setListOrder(listOrders);
    }, []);

    return (        
            <Container>
                <SafeAreaView />

                <FlatList
                    data={listOrder}
                    renderItem={({ item, index }) => (
                        <Item key={index}>
                            <Item1 style={ styles.container }>
                                <LabelTitulo align="right" color="#FFF">Código.: </LabelTitulo>
                                <Label align="left" color="#FFF">{item.customer.id}</Label>
                            </Item1>
                            <Item1 style={ styles.container }>
                                <LabelTitulo align="right" color="#FFF">Nome.: </LabelTitulo>
                                <Label align="left" color="#FFF">{item.customer.name}</Label>
                            </Item1>                            
                            <Label align="center" color="#FFF">-----------------------------------------------------</Label>
                            <FlatList
                                data={item.items}
                                renderItem={({ item, index }) => (
                                    <Item key={index}>
                                        <Item1 style={ styles.container }>
                                            <LabelTitulo align="right" color="#FFF">Código.: </LabelTitulo>
                                            <Label align="left" color="#FFF">{item.id}</Label>
                                        </Item1>
                                        <Item1 style={ styles.container }>
                                            <LabelTitulo align="right" color="#FFF">Descrição.: </LabelTitulo>
                                            <Label align="left" color="#FFF">{item.name}</Label>
                                        </Item1>
                                        <Item1 style={ styles.container }>
                                            <LabelTitulo align="right" color="#FFF">Preço.: </LabelTitulo>
                                            <Label align="left" color="#FFF">R$ {item.price.toPrecision(3)}</Label>
                                        </Item1>                                        
                                        <Item1 style={ styles.container }>
                                            <LabelTitulo align="right" color="#FFF">Quantidade.: </LabelTitulo>
                                            <Label align="left" color="#FFF">{item.quantity.toPrecision(3)}</Label>
                                        </Item1>                                        
                                        <Item1 style={ styles.container }>
                                            <LabelTitulo align="right" color="#FFF">Total.: </LabelTitulo>
                                            <Label align="left" color="#FFF">R$ {item.total.toPrecision(3)}</Label>
                                        </Item1>                                        
                                    </Item>                                    
                                )}
                                keyExtractor={itemProduct => itemProduct.id}
                                ListEmptyComponent={<ActivityIndicator size={'large'} color={'red'} />}
                            />
                        </Item>
                        )}
                    keyExtractor={item => item.customer.id}
                    ListEmptyComponent={<ActivityIndicator size={'large'} color={'red'} />}
                />
            </Container>
        
    );
}

export default OrderList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
      },
});