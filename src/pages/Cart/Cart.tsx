import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import styles from './styles';
import Footer from '../../components/Footer/Footer';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const CartScreen: React.FC<Navigation> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Footer navigation={navigation} />
        </View>
    );
};

export default CartScreen;
