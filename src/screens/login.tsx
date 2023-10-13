import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styled from 'styled-components/native';

import WelcomeImage from '../../assets/images/welcome-image.png';
import {useNavigation} from '@react-navigation/native';
import { fetchUsers, login } from '../services/user-service';
import { ILoginUser, IUser } from '../common/user-interface';
import { Loading } from '../components/loading';
import Globais from '../components/Globais';

type ButtonProps = {
  color: string;
};

const Image = styled.Image`
  width: 320px;
  height: 240px;
  align-self: center;
  margin-top: 16px;
`;

const InputContainer = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
`;

const Input = styled.TextInput`
  height: 60px;
  padding: 8px;
  background-color: #1a182b;
  margin-bottom: 8px;
  color: #fff;
  border-radius: 16px;
`;

const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${props => props.color};
  height: 50px;
  border-radius: 16px;
  justify-content: center;
  margin-top: 32px;
`;

const Label = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

const FooterContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateFields = (): boolean => {
    if (!email || !password) {
      Alert.alert('Atenção!', 'Por favor, preencha todos os campos');
      return false;
    }
    return true;
  };
  
  const readUser = async (email: String) => {        
    try {
        const users = await fetchUsers();
        const listaUsuarios: Array<IUser> = JSON.parse(JSON.stringify(users));

        const user = listaUsuarios.find(u => u.email == email);
        
        if (user != undefined) {
            Globais.userGlobal = user;
        }        
    } catch (error) {
        Alert.alert("Atenção!",`Problema na consulta do usuário!!!`);
    }
}

  const loginUser = async () => {
    // Realizando a validação dos campos
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);
    try {
      const user: ILoginUser = {
        email,
        password,
      }      
      const response = await login(user);      
      if (response == 200) {
          await readUser(user.email);
          Globais.orderGlobal = {customer: {id: "1",name: "Bruno Moreira Batista"}, items: []};
          navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert("Atenção!",`Confira suas credencias!!!`)      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: '#242238'}}>
      <SafeAreaView />
      <StatusBar barStyle={'light-content'} />
      <Image source={WelcomeImage} />
      <InputContainer>
        <Input
          placeholder="e-mail"
          placeholderTextColor={'#fefefe'}
          autoCapitalize="none"
          onChangeText={e => setEmail(e)}
          value={email}
        />
        <Input
          placeholder="senha"
          placeholderTextColor={'#fefefe'}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={p => setPassword(p)}
          value={password}
        />
        <Button color="#e77a6c" activeOpacity={0.7} onPress={loginUser}>
          <Label>LOGIN</Label>
        </Button>
        {
          isLoading && (
            <Loading backgroundColor='#FFF' isLoading loadingColor="#e77a6c" />
          )
        }
        
      </InputContainer>
      <FooterContainer>
        <Button
          color="#1a182b"
          activeOpacity={0.7}           
          onPress={() => 
            navigation.navigate("Register")
          }
        >
          <Label>QUERO ME CADASTRAR</Label>
        </Button>
      </FooterContainer>
    </ScrollView>
  );
};

export default Login;