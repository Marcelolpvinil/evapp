import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Botao from '../components/botao';
import Header from '../components/header';
import Lista from '../components/flatlist';
import api from '../services/api.js';

 function EscolhaSeuHorario() {
     return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top', paddingTop: 50 }}>
         <Header title="Escolha seu horário" />
        <Lista/>
     </View>
     );
 }

 export default EscolhaSeuHorario;