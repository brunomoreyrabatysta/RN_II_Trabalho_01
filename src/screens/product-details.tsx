import { RouteProp, useRoute } from '@react-navigation/native';
import react, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components';
import Globais from '../components/Globais';
import { IProduct } from '../common/user-interface';
import { fetchProducts } from '../services/user-service';
import { Loading } from '../components/loading';

type LabelProps = {
    color: string;
    align: string;
};

const Container = styled.View`
    flex: 1;    
`;

const Item = styled.View`
    background-color: #FFF;
    margin-top: 8px;
    padding: 8px;
    margin: 4px 4px 4px 4px;
`;

const Label = styled.Text<LabelProps>`
  color: ${props => props.color};
  font-size: 20px;
  text-align: ${props => props.align};
  font-weight: bold;
`;

const Label1 = styled.Text<LabelProps>`
  color: ${props => props.color};
  font-size: 16px;
  text-align: ${props => props.align};  
`;

const Image = styled.Image`
  align-self: center;
  margin-top: 0px;
  margin: 8px 8px 8px 8px;
  width: 100%;
  height: 300px;
`;

const ProductDetails = () => {   
    const [product, setProduct] = useState<IProduct>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {        
        setIsLoading(true);
        try {            
            setProduct(Globais.productGlobal); 
        } catch (error) {
            
        } finally{
            setIsLoading(false);
        }        
     }, []);

    const readProducts = async () => {        
        try {            
            const products = await fetchProducts();                        
            //const prod = products.find(e => e._id == Globais.idProductGlobal);
            // if (prod != undefined) {
            //     setProduct(prod);                
            // }
        } catch (error) {
            Alert.alert("Atenção!",`Problema na consulta dos produtos!!!`);
        }
    } 

    return (
        <Container>            
            <SafeAreaView />
            <ScrollView>
                <Image source={ { uri: Globais.productGlobal.imageUrl } } />            
                <Label align="left" color="#000">{product.name}</Label>
                
                <Label1 align="left" color="#000">{product.category.name}</Label1>                
                
                <Label align="left" color="#000">Descrição</Label>
                <Label1 align="left" color="#000">{product.description}</Label1>
                <Label1 align="left" color="#000">Preço</Label1>
                <Label align="left" color="#000">R$ {product.price.toPrecision(3)} / {product.unit}</Label>
            </ScrollView>            
                  

            {
                isLoading && (
                    <Loading backgroundColor='#FFF' isLoading loadingColor="#e77a6c" />
                )
            }
        </Container>
    );
}

export default ProductDetails;