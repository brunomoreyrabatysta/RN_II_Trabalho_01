import react, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import styled from 'styled-components';
import Globais from '../components/Globais';
import { Loading } from '../components/loading';
import { createdOrder, createdOrders } from '../services/user-service';

type ButtonProps = {
    color: string;
};

type LabelProps = {
    color: string;
    align: string;
};

const Container = styled.View`
    flex: 1;
    background-color: #ededed;
`;

const HeaderContainer = styled.View`
    flex: 0.3;    
`;

const DetailsContainer = styled.View`
    flex: 2;
`;

const FooterContainer = styled.View`
    flex: 0.5;    
    justify-content: center;
    margin: 0px 0px 0px 0px;
    padding: 0px;
`;

const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${props => props.color};
  height: 50px;
  border-radius: 16px;
  justify-content: center;
  margin-top: 32px;
`;



const LabelTitulo = styled.Text<LabelProps>`
  color: ${props => props.color};
  font-size: 16px;
  text-align: right;
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
    margin-top: 8px;
    padding: 8px;
`;

const Item1 = styled.View`    
    margin: 0px 0px 0px 0px;
    padding: 0px;
    justify-content: center;
`;


const Image = styled.Image`
  width: 100px;
  height: 100px;
  align-self: center;
  margin-top: 0px;  
  border-radius: 16px;
`;

const Checkout = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function CalcularTotal() {
        return Globais.orderGlobal.items.reduce(getTotal, 0);
    }

    function getTotal(total: double, item: IItensOrder) {        
        return total + (item.price * item.quantity);
    }

    const validateFields = ():boolean => {        
        return true;
      };

    const createdOrder = async () => {
        // Realizando a validação dos campos    
        setIsLoading(true);
        try {
          if (!validateFields()) {
            return;
          }
              
          const response = await createdOrders(Globais.orderGlobal);      
          if (response == 201) {
            Alert.alert("Sucesso!",`Parabéns, pedido criado com sucesso!!!`);            
            Globais.orderGlobal.items = [];
          }
        } catch (error) {            
          Alert.alert("Atenção!",`Problema ao salvar o pedido!!!`);
        } finally {
          setIsLoading(false);
        }
    }

    return (
        <Container>
            <SafeAreaView />
            <HeaderContainer>     
                
                <Item1 style={styles.container}>
                    <LabelTitulo color="#000" >Cliente.: </LabelTitulo>
                    <Label color="#000"  align="left">{Globais.orderGlobal.customer.name}</Label>
                </Item1>    
                
                <Item1 style={styles.container}>
                    <LabelTitulo color="#000" >Data.: </LabelTitulo>
                    <Label color="#000"  align="left">13/10/2023</Label>
                </Item1>   
                
                <Item1 style={styles.container}>
                    <LabelTitulo color="#000" >Total.: </LabelTitulo>
                    <Label color="#000"  align="left">R$ {CalcularTotal().toPrecision(4)}</Label>
                </Item1>
            </HeaderContainer>
            <DetailsContainer>
                <FlatList
                    data={Globais.orderGlobal.items}
                    renderItem={({ item, index }) => (
                        <Item key={index}>
                            <Item1 style={styles.container}>                                
                                <Image source={ {uri: item.imageUrl} } />                                   
                                <Item1>
                                    <Label color="#000" align="left">{item.name}</Label>
                                    <Label color="#000" align="left">Ref.: {item.id}</Label>
                                    <Label color="#000" align="left">{item.quantity} / {item.unit} x R$ {item.price.toPrecision(3)}</Label>
                                </Item1>
                            </Item1>                            
                        </Item>                        
                        )}
                    keyExtractor={itemProduct => itemProduct.id}
                    ListEmptyComponent={<ActivityIndicator size={'large'} color={'red'} />}
                />
            </DetailsContainer>
            <FooterContainer>
                <Button
                    color="green"
                    activeOpacity={0.7}           
                    onPress={() => 
                        createdOrder()                        
                    }
                >
                    <Label color="#000" align="center">FINALIZAR</Label>
                </Button>
            </FooterContainer>
            {
                isLoading && (
                    <Loading backgroundColor='#FFF' isLoading loadingColor="#e77a6c" />
                )
            }
        </Container>
    );
}

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row"
      },
});