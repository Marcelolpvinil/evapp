import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import Header from '../components/header';
import Botao from '../components/botao';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

function MeusHorarios() {
    const navigation = useNavigation();
    const route = useRoute();
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedHorarios, setSelectedHorarios] = useState([]);
    const [mensagemConfirmacao, setMensagemConfirmacao] = useState('');
    const [horarioConfirmadoId, setHorarioConfirmadoId] = useState(null); 
    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const idPaciente = await AsyncStorage.getItem('ID_PACIENTE');
                const response = await api.get(`/consulta/${idPaciente}`);
                console.log('Resposta da API:', response.data);
                setHorarios(response.data);

                const horariosSelecionadosIds = JSON.parse(await AsyncStorage.getItem('horariosSelecionados')) || [];
                console.log('IDs de Horários Selecionados:', horariosSelecionadosIds);

                const horariosSelecionados = response.data.filter(item => 
                    horariosSelecionadosIds.includes(item.ID_HORARIO)
                );

                console.log('Horários Selecionados:', horariosSelecionados);
                setSelectedHorarios(horariosSelecionados);
            } catch (err) {
                console.error('Erro ao buscar horários:', err);
                setError('Erro ao buscar horários. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchHorarios();
    }, []);

    useEffect(() => {
                if (route.params?.horarioConfirmado) {
            const { horarioConfirmado } = route.params;
            const formattedHour = String(horarioConfirmado.HORA).padStart(2, '0');
            const formattedMinutes = String(horarioConfirmado.MINUTOS).padStart(2, '0');
            setMensagemConfirmacao(`Consulta confirmada: ID: ${horarioConfirmado.ID_HORARIO}, Hora: ${formattedHour}:${formattedMinutes} - ${horarioConfirmado.SEMANA}`);
            setHorarioConfirmadoId(horarioConfirmado.ID_HORARIO); 
        }
    }, [route.params]);

    const handleDelete = async (idHorario) => {
        try {
            const response = await api.delete(`/consulta/${idHorario}`);
            console.log('Resposta da API ao deletar:', response.data);
            setSelectedHorarios(prev => prev.filter(item => item.ID_HORARIO !== idHorario));
            setMensagemConfirmacao('Consulta deletada com sucesso!'); 
            setHorarioConfirmadoId(null); 
        } catch (err) {
            console.error('Erro ao deletar horário:', err);
            setError('Erro ao deletar horário. Tente novamente.');
        }
    };

    const renderItem = ({ item }) => {
        if (!item || !item.ID_HORARIO) {
            return null;
        }

        const formattedHour = String(item.HORA).padStart(2, '0');
        const formattedMinutes = String(item.MINUTOS).padStart(2, '0');

        return (
            <View style={styles.item}>
                <Text style={styles.title}>
                    {`ID: ${item.ID_HORARIO}, Hora: ${formattedHour}:${formattedMinutes} - ${item.SEMANA}`}
                </Text>
                <TouchableOpacity onPress={() => handleDelete(item.ID_HORARIO)}>
                    <Text style={styles.deleteButton}>Deletar</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top', paddingTop: 50 }}>
            <Header title="Meus Horários" />
            {mensagemConfirmacao ? (
                <Text style={{ color: 'green', marginBottom: 30, fontSize: 17, paddingTop: 30 }}>
                    {mensagemConfirmacao}
                </Text>
            ) : null}
            {horarioConfirmadoId && ( 
                <Botao text="Deletar Consulta Confirmada" onPress={() => handleDelete(horarioConfirmadoId)} />
            )}
            <FlatList
                data={selectedHorarios}
                renderItem={renderItem}
                keyExtractor={item => item.ID_HORARIO.toString()}
                style={styles.container}
            />
            <Botao text="voltar" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: 'lemonchiffon',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width: 330,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
    },
    deleteButton: {
        color: 'red',
        fontSize: 16,
    },
});

export default MeusHorarios;



