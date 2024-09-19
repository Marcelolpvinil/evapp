import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/01login.js';
import Cadastro from './src/screens/02cadastro.js';
import EscolhaSeuHorario from './src/screens/03escolhaSeuHorario.js';
import ConfirmarHorario from './src/screens/04confirmarHorario.js';
import MeusHorarios from './src/screens/05meusHorarios.js';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
      <Stack.Screen name="EscolhaSeuHorario" component={EscolhaSeuHorario} options={{ headerShown: false }} />
      <Stack.Screen name="ConfirmarHorario" component={ConfirmarHorario} options={{ headerShown: false }}/>
      <Stack.Screen name="MeusHorarios" component={MeusHorarios} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

