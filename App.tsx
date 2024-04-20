import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from './src/layouts/Intro/Intro';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import OptionLogin from './src/layouts/OptionLogin/OptionLogin';
import Home from './src/screens/Home/Home';
import Dish from './src/screens/Dish/Dish';
import CartScreen from './src/screens/Cart/Cart';
import Search from 'screens/Search/Search';
import Profile from './src/screens/Profile/Profile';
import Community from './src/screens/Community/Community';
import EditProfile from 'layouts/EditProfile/EditProfile';

export type RootStackParamList = {
    Intro: undefined;
    Login: { address: string };
    Register: undefined;
    OptionLogin: undefined;
    Home: { user: any; prevAddress: any };
    Profile: { user: any, updated: boolean};
    EditProfile: {user: any};
    Dish: { user: any; _id: string };
    Cart: { user: any };
    Community: { user: any};
    Search: { user: any };
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
                <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                <Stack.Screen name="Dish" component={Dish} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name = "EditProfile" component={EditProfile} options={{headerShown: false}} />
                <Stack.Screen name="Community" component={Community} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
