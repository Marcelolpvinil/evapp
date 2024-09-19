import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import api from '../services/api'; 

const Lista = () => {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation(); // Inicializar o hook de navegação

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const response = await api.get('/horario'); // Atualize para a URL correta
                setHorarios(response.data); // Supondo que a resposta é um array de horários
            } catch (err) {
                console.error('Erro ao buscar horários:', err);
                setError('Erro ao buscar horários. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchHorarios();
    }, []);

    const handleHorarioPress = async (item) => {
      try {
          const ID_PSICOLOGO = 1; 
          const ID_PACIENTE = 2; 
          const ID_HORARIO = item.ID_HORARIO;
  
          // Aqui você pode fazer a chamada para a API se necessário
          await api.post('/consulta/confirmar', {
              ID_PSICOLOGO,
              ID_HORARIO,
              ID_PACIENTE,
          });
  
          // Navegar para a página de confirmação e passar o horário selecionado
          navigation.navigate('ConfirmarHorario', { horario: item });
      } catch (error) {
          console.error('Erro ao confirmar horário:', error);
          alert('Erro ao confirmar horário. Tente novamente.');
      }
  };

    const renderItem = ({ item }) => {
        
        const formattedHour = String(item.HORA).padStart(2, '0');
        const formattedMinutes = String(item.MINUTOS).padStart(2, '0');

        return (
            <TouchableOpacity onPress={() => handleHorarioPress(item)}>
                <View style={styles.item}>
                    <Text style={styles.title}>
                        {`ID: ${item.ID_HORARIO}, Hora: ${formattedHour}:${formattedMinutes} - ${item.SEMANA}`}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return <Text>Carregando...</Text>; 
    }

    if (error) {
        return <Text>{error}</Text>; 
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={horarios}
                renderItem={renderItem}
                keyExtractor={item => item.ID_HORARIO.toString()} 
            />
        </View>
    );
};

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
    },
    title: {
        fontSize: 22,
    },
});

export default Lista;