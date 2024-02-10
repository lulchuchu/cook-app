import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from './src/layouts/Intro/Intro';
import Login from './src/pages/Login/Login';
import Register from './src/pages/Register/Register';
import OptionLogin from './src/layouts/OptionLogin/OptionLogin';
import Home from './src/pages/Home/Home';

export type RootStackParamList = {
    Intro: undefined;
    Login: undefined;
    Register: undefined;
    OptionLogin: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#32363b" />
            <Stack.Navigator initialRouteName="Intro">
                <Stack.Screen name = "Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name = "Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name = "Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name = "OptionLogin" component={Home} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
