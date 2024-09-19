import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import TextBox from '../components/textbox';
import Botao from '../components/botao';
import api from '../services/api.js';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState(''); 
    const [tipoMensagem, setTipoMensagem] = useState(''); 

    const handleLogin = async () => {
        if (!email || !senha) {
            setMensagem('Por favor, preencha todos os campos.');
            setTipoMensagem('erro');
            return;
        }
        try {
            const response = await api.post('/paciente/login', {
                email: email,
                senha: senha,
            });
    
            if (response.data && response.data.length > 0) {
                console.log('Login bem-sucedido:', response.data);
                const idPaciente = response.data[0].ID_PACIENTE; 
                await AsyncStorage.setItem('ID_PACIENTE', idPaciente.toString()); 
                console.log('ID do Paciente armazenado:', idPaciente); 
                setMensagem('Login bem-sucedido!');
                setTipoMensagem('sucesso');
                navigation.navigate('EscolhaSeuHorario');
            } else {
                setMensagem('Erro ao fazer login. Verifique suas credenciais.');
                setTipoMensagem('erro');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
            setMensagem('Erro ao fazer login. Verifique suas credenciais.');
            setTipoMensagem('erro');
        }
    };
    

    return (
        <View style={styles.container}>
            <Header title="Acessar" />
            <TextBox 
                rotulo="email" 
                isSenha={false} 
                placeholder="digite seu email" 
                onChangeText={(text) => { setEmail(text) }} 
            />
            <TextBox 
                rotulo="senha" 
                isSenha={true} 
                placeholder="digite sua senha" 
                onChangeText={(text) => { setSenha(text) }} 
            />
            <Botao text="entrar" onPress={()=>{handleLogin()}} />
            <TouchableOpacity onPress={() => { navigation.navigate('Cadastro') }}>
                <Text style={styles.cadastrarText}>cadastrar</Text>
            </TouchableOpacity>
            {mensagem ? (
                <Text style={[styles.mensagem, tipoMensagem === 'sucesso' ? styles.sucesso : styles.erro]}>
                    {mensagem}
                </Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },
    cadastrarText: {
        color: "hotpink",
        textAlign: "center",
        fontSize: 16,
        marginTop: 60,
        bottom: 0,
        width: "100%"
    },
    mensagem: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    sucesso: {
        color: 'green', 
    },
    erro: {
        color: 'red', 
    },
});

export default Login;
