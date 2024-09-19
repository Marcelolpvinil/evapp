import React, { useState } from 'react';
import Header from '../components/header';
import Botao from '../components/botao';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import api from '../services/api.js';

function ConfirmarHorario() {
    const navigation = useNavigation();
    const route = useRoute();
    const { horario, idPsicologo, idPaciente } = route.params;
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    const handleConfirmar = async () => {
        try {
            const response = await api.post('/consulta/confirmar', {
                ID_PSICOLOGO: idPsicologo,
                ID_HORARIO: horario.ID_HORARIO,
                ID_PACIENTE: idPaciente,
            });

            if (response.data) {
                setMensagem('Consulta confirmada com sucesso!');
                setTipoMensagem('sucesso');
                navigation.navigate('MeusHorarios', {
                    horarioConfirmado: horario,
                });
            } else {
                setMensagem('Erro ao confirmar a consulta.');
                setTipoMensagem('erro');
            }
        } catch (error) {
            console.error('Erro ao confirmar a consulta:', error.response ? error.response.data : error.message);
            setMensagem('Erro ao confirmar a consulta. Tente novamente.');
            setTipoMensagem('erro');
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top', paddingTop: 50 }}>
            <Header title="Confirmar Horário" />
            <Text style={{ fontSize: 22, marginBottom: 20 }}>
                {`ID: ${horario.ID_HORARIO}, Hora: ${horario.HORA}:${horario.MINUTOS} - ${horario.SEMANA}`}
            </Text>
            <Botao text="confirmar" onPress={handleConfirmar} />
            <Botao text="voltar" onPress={() => { console.log("Botão voltar pressionado"); navigation.goBack(); }} />
            {mensagem ? (
                <Text style={{ color: tipoMensagem === 'sucesso' ? 'green' : 'red', marginTop: 20 }}>
                    {mensagem}
                </Text>
            ) : null}
        </View>
    );
}

export default ConfirmarHorario;

