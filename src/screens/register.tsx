import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styled from 'styled-components/native';

import WelcomeImage from '../../assets/images/welcome-image.png';
import {useNavigation} from '@react-navigation/native';
import { created, fetchUsers, login } from '../services/user-service';
import { IUser } from '../common/user-interface';
import { Loading } from '../components/loading';

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
  margin-top: 16px;
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

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateFields = async (): Promise<boolean> => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Atenção!', 'Por favor, preencha todos os campos');
      return false;
    }

    if (password != confirmPassword) {
      Alert.alert('Atenção!', 'Por favor, verifique a senha e a sua confirmação');
      return false;
    }

    try
    {
      const users = await fetchUsers();
      const listaUsuarios: Array<IUser> = JSON.parse(JSON.stringify(users));

      if (listaUsuarios.find(u => u.email == email) != undefined) {
        Alert.alert('Atenção!', 'Por favor, verifique o e-mail, já existe cadastrado');
        return false;
      }
    } catch {

    }
    return true;
  };
  
  const createdUser = async () => {
    // Realizando a validação dos campos    
    setIsLoading(true);
    try {
      if (!await validateFields()) {
        return;
      }

      const user: IUser = {
        name,
        email,
        password,
      }      
      const response = await created(user);      
      if (response == 201) {
        Alert.alert("Sucesso!",`Parabéns, usuário criado com sucesso!!!`);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      Alert.alert("Atenção!",`Confira suas credencias!!!`);
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
          placeholder="nome"
          placeholderTextColor={'#fefefe'}
          autoCapitalize="none"
          onChangeText={e => setName(e)}
          value={name}
        />
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
        <Input
          placeholder="confirmar a senha"
          placeholderTextColor={'#fefefe'}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={p => setConfirmPassword(p)}
          value={confirmPassword}
        />
        <Button color="#e77a6c" activeOpacity={0.7} onPress={ createdUser }>
          <Label>CADASTRAR</Label>
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
            navigation.navigate("Login")
          }
        >
          <Label>VOLTAR PARA O LOGIN</Label>
        </Button>
      </FooterContainer>
    </ScrollView>
  );
};

export default Register;