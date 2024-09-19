import { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/header';
import TextBox from '../components/textbox';
import api from '../services/api.js';
import Botao from '../components/botao.js';

function Cadastro({ navigation }) {
    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    const handleCadastro = async () => {
    
        if (!nome || !telefone || !email || !senha || !senhaRepetida) {
            setMensagem('Por favor, preencha todos os campos.');
            setTipoMensagem('erro');
            return;
        }

        if (senha !== senhaRepetida) {
            setMensagem('As senhas não coincidem.');
            setTipoMensagem('erro');
            return;
        }

        try {
            const response = await api.post('/paciente', {
                nome,
                telefone,
                email,
                senha,
            });
            console.log('Cadastro bem-sucedido:', response.data);
            setMensagem('Cadastro bem-sucedido!');
            setTipoMensagem('sucesso');

          
            navigation.navigate('EscolhaSeuHorario');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            setMensagem('Erro ao cadastrar. Tente novamente.');
            setTipoMensagem('erro');
        }
    };

    return (
        <ScrollView>
            <View style={estilos.geral}>
                <View style={{ flex: 1, marginTop: 40 }}></View>
                <Header title="Cadastro" />
                <TextBox
                    style={estilos.caixas}
                    rotulo="nome"
                    isSenha={false}
                    placeholder="digite seu nome"
                    onChangeText={setNome}
                />
                <TextBox
                    style={estilos.caixas}
                    rotulo="telefone"
                    isSenha={false}
                    placeholder="digite seu telefone"
                    onChangeText={setTelefone}
                />
                <TextBox
                    style={estilos.caixas}
                    rotulo="email"
                    isSenha={false}
                    placeholder="digite seu email"
                    onChangeText={setEmail}
                />
                <TextBox
                    style={estilos.caixas}
                    rotulo="senha"
                    isSenha={true}
                    placeholder="crie uma senha"
                    onChangeText={setSenha}
                />
                <TextBox
                    style={estilos.caixas}
                    rotulo="repita sua senha"
                    isSenha={true}
                    placeholder="repita a senha criada"
                    onChangeText={setSenhaRepetida}
                />
                <Botao
                    style={estilos.caixas}
                    text='Cadastrar'
                    onPress={handleCadastro}
                />
                {mensagem ? (
                    <Text style={[estilos.mensagem, tipoMensagem === 'sucesso' ? estilos.sucesso : estilos.erro]}>
                        {mensagem}
                    </Text>
                ) : null}
            </View>
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    geral: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    caixas: {
        marginTop: 10,
        paddingTop: 0,
        width: '80%', 
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

export default Cadastro;
