import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from './src/layouts/Intro/Intro';
import Login from './src/pages/Login/Login';
import Register from './src/pages/Register/Register';
import OptionLogin from './src/layouts/OptionLogin/OptionLogin';
import Home from './src/pages/Home/Home';
import RecipeScreen from './src/pages/Recipe/Recipe';
import CartScreen from './src/pages/Cart/Cart';
import Profile from './src/pages/Profile/Profile';
import Community from './src/pages/Community/Community';

export type RootStackParamList = {
    Intro: undefined;
    Login: { address: string };
    Register: undefined;
    OptionLogin: undefined;
    Home: { user: any; prevAddress: any };
    Profile: { user: any };
    Recipe: { user: any; _id: string };
    Cart: { user: any };
    Community: { user: any };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#32363b" />
            <Stack.Navigator initialRouteName="Intro">
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="OptionLogin" component={OptionLogin} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Recipe" component={RecipeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="Community" component={Community} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
