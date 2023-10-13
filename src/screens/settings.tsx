import React, {useEffect, useState} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import {Alert, ScrollView, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { created, fetchUsers, login } from '../services/user-service';
import { IUser } from '../common/user-interface';
import { Loading } from '../components/loading';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
import Globais from '../components/Globais';

type ButtonProps = {
    color: string;
};

const Container = styled.View`
    flex: 1;
    background-color: #ededed;
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

const Settings = () => {
    const parametro = Globais.userGlobal.email;

    const navigation = useNavigation();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const readUser = async () => {
        setIsLoading(true);
        try {
            const users = await fetchUsers();
            const listaUsuarios: Array<IUser> = JSON.parse(JSON.stringify(users));

            const user = listaUsuarios.find(u => u.email == parametro);
            
            if (user != undefined) {                
                setName(user.name);
                setEmail(user.email);
            }
        } catch (error) {
            Alert.alert("Atenção!",`Problema na consulta!!!`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {        
         readUser();  
      }, []);

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
    
          if (!listaUsuarios.find(u => u.email == email)) {
            Alert.alert('Atenção!', 'Por favor, verifique o e-mail, não existe cadastro para esse e-mail');
            return false;
          }      
        } catch {
    
        }
        return true;
      };
      
      const editUser = async () => {
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
          // Não contém método para realizar a alteração
            Alert.alert("Sucesso!",`Parabéns, usuário alterado com sucesso!!!`);            
          
        } catch (error) {
          Alert.alert("Atenção!",`Confira suas credencias!!!`);
        } finally {
          setIsLoading(false);
        }
      }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#242238'}}>
        <SafeAreaView />
        <StatusBar barStyle={'light-content'} />        
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
            <Button color="#e77a6c" activeOpacity={0.7} onPress={ editUser }>
            <Label>SALVAR</Label>
            </Button>
            {
                isLoading && (
                    <Loading backgroundColor='#FFF' isLoading loadingColor="#e77a6c" />
            )
            }
            
        </InputContainer>
        </ScrollView>
    );
}

export default Settings;