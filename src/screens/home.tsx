import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import Globais from "../components/Globais";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts, fetchUsers } from "../services/user-service";
import { IItensOrder, IProduct, IUser } from "../common/user-interface";
import { ActivityIndicator, Alert, FlatList, StyleSheet, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { beginAsyncEvent } from "react-native/Libraries/Performance/Systrace";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";
import { Loading } from "../components/loading";

type LabelProps = {
    color: string;
    align: string;
};

const Container = styled.View`
    flex: 1;
    background-color: #ededed;
`;

const StatusBar = styled.View`
    flex: 0.1;
    margin: 8px 8px 8px 8px;
`;

const SearchContainer = styled.View`
    flex: 0.3;
    margin: 8px 8px 8px 8px;
`;

const ProductsContainer = styled.View`
    flex: 2;    
    margin: 8px 8px 8px 8px;
`;

const TotalContainer = styled.View`
    flex: 0.1;    
    margin: 8px 8px 8px 8px;
`;

const Input = styled.TextInput`
  height: 60px;
  padding: 8px;
  background-color: #FFF;
  margin-bottom: 8px;
  color: #000;
  border-radius: 16px;
`;

const Label = styled.Text<LabelProps>`
  color: ${props => props.color};
  font-size: 16px;
  text-align: ${props => props.align};
  font-weight: bold;
`;

const LabelPreco = styled.Text<LabelProps>`
  color: ${props => props.color};
  font-size: 12px;
  text-align: ${props => props.align};  
`;

const LabelDetalhe = styled.Text<LabelProps>`
  color: ${props => props.color};
  font-size: 10px;
  text-align: ${props => props.align};  
`;

const Image = styled.Image`
  width: 190px;
  height: 150px;
  align-self: center;
  margin-top: 0px;
`;

const Item = styled.View`
    background-color: #FFF;
    margin-top: 8px;
    padding: 8px;
    width: 190px;
    margin: 4px 4px 4px 4px;
    border-radius: 8px;
`;

const Item1 = styled.View`            
    width: 30px;
`;

const Button = styled.TouchableOpacity`  
  height: 20px;  
  justify-content: center;  
`;

const Button1 = styled.TouchableOpacity`  
  height: 30px;
  justify-content: center;  
`;

const Button2 = styled.TouchableOpacity`  
  justify-content: center;  
`;

const Home = () => {  
    const parametro = Globais.userGlobal.email; 

    const navigation = useNavigation();
    const [listProducts, setListProducts] = useState<IProduct[]>([]);

    const [name, setName] = useState<string>('');
    const [search, setSearch] = useState<string>('');    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function CalcularTotal() {
        return Globais.orderGlobal.items.reduce(getTotal, 0);
    }

    function getTotal(total: double, item: IItensOrder) {        
        return total + (item.price * item.quantity);
    }
    
    const QuantidadeItem = (Item: IProduct) => {
        var quant: Int32 = 0;

        if (Globais.orderGlobal.items.length != 0) {
            
            var it: IItensOrder = Globais.orderGlobal.items.find(e => e.id == Item._id);            

            if (it != undefined) {
                quant = it.quantity;
            }
        }

        return quant;
    }
    
    const RemoverCarrinho = (Item: IProduct) => {        
        if (Globais.orderGlobal.items.length != 0) {
            var it: IItensOrder = {
                id: "",
                quantity: 0,
                total: 0,
                imageUrl: "",
                name: "",
                price: 0,
                unit: "",
            };

            it = Globais.orderGlobal.items.find(e => e.id == Item._id);

            if (it != undefined) {
                if (it.quantity > 1) {
                    it.quantity -= 1;
                    it.price = Item.price;
                    it.total = Item.price * it.quantity;
                } else {                    
                    Globais.orderGlobal.items.forEach( (i, index) => {
                        if(i.id === Item._id) Globais.orderGlobal.items.splice(index,1);
                    });
                }
            }            
        }
    }

    const AdicionarCarrinho = (Item: IProduct) => {        
        var add: boolean = false;        
        var it: IItensOrder;

        if (Globais.orderGlobal.items.length == 0) {
            add = true;          
        } else {
            var posicao = -1;
            Globais.orderGlobal.items.forEach( (i, index) => {
                if(i.id === Item._id)  {
                    posicao = index;
                };
            });
            
            if (posicao== -1) {
                add = true;                
            } else {
                Globais.orderGlobal.items.forEach( (i, index) => {
                    if(i.id === Item._id)  {
                        i.quantity = i.quantity + 1;
                        i.price = Item.price;
                        i.total = Item.price * i.quantity;
                    };
                });
            }
        }

        if (add) {
            it = {
                id: Item._id,
                quantity: 1,
                total: Item.price,
                imageUrl: Item.imageUrl,
                name: Item.name,
                price: Item.price,
                unit: Item.unit,
            };

            Globais.orderGlobal.items.push(it);
        }             
    }

    const readProducts = async () => {        
        try {
            const products = await fetchProducts();                        
            setListProducts(products);
        } catch (error) {
            Alert.alert("Atenção!",`Problema na consulta dos produtos!!!`);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        try {
            setName(Globais.userGlobal.name);
            readProducts();   
        } catch (error) {
            
        } finally{
            setIsLoading(false);
        }        
     }, []);

    const openProductDetails = (prod: string) => {
        Globais.productGlobal = prod;
        navigation.navigate('ProductDetailScreen');
    }

    return (
        <Container>
            <SafeAreaView />            
            <StatusBar style={ styles.container }>

            </StatusBar>            
            <StatusBar style={ styles.container }>
                <Label align="left" color="#000">Olá, {name}</Label>
                <Button1 onPress={() => navigation.navigate('CheckoutScreen')}>
                    <Ionicons name={ 'cart-outline' } size={30}  />
                </Button1>                
            </StatusBar>            
            <SearchContainer>
                <Input
                    placeholder="Busca pelo nome do produto..."
                    placeholderTextColor={'#000'}
                    autoCapitalize="none"
                    onChangeText={e => setSearch(e)}
                    value={search}/>
            </SearchContainer>

            <ProductsContainer>
                <FlatList
                    numColumns="2"
                    data={listProducts}
                    renderItem={({ item, index }) => (    
                        <Item key={index}>
                            <Button2 onPress={() => openProductDetails(item)}>
                                <Image source={ {uri: item.imageUrl} } />
                            </Button2>                            
                            <Label align="left" color="#000">{item.name}</Label>
                            <LabelDetalhe align="left" color="#000">{item.category.name}</LabelDetalhe>
                            <View style={styles.container}>
                                <LabelPreco align="left" color="green">R$ {item.price.toPrecision(3)} / {item.unit}</LabelPreco>                                
                                <Item1></Item1>
                                <Item1 style={styles.container}>
                                    <Button onPress={() => RemoverCarrinho(item)}>
                                        <Ionicons name={ 'remove-circle-outline' } size={20}  />
                                    </Button>
                                    <LabelPreco align="left" color="#000"> {QuantidadeItem(item)}</LabelPreco>
                                    <Button onPress={() => AdicionarCarrinho(item)}>
                                        <Ionicons name={ 'add-circle' } size={20} color="green" />
                                    </Button>
                                </Item1>                                
                            </View>
                            
                        </Item>
                    )}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<ActivityIndicator size={'large'} color={'red'} />}
                />

            </ProductsContainer>

            {
                isLoading && (
                    <Loading backgroundColor='#FFF' isLoading loadingColor="#e77a6c" />
                )
            }

            <TotalContainer>
                <Label align="right" color="green">R$ {CalcularTotal().toPrecision(3)}</Label>
            </TotalContainer>
            
        </Container>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row"
      },
});