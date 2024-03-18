import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import Footer from '../../components/Footer/Footer';
import CartItem from 'components/CartItem/CartItem';
import FormCheckOut from '../../layouts/FormCheckOut/FormChekout';

const emtyCart = require('../../../assets/images/empty-cart.png');

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const CartScreen: React.FC<Navigation> = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [showCheckOut, setShowCheckOut] = useState(false);

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.ctnSearch}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#7d7d80" />
                    </TouchableOpacity>
                    <TextInput placeholder="Tìm kiếm" placeholderTextColor="#7d7d80" style={styles.input} />
                </View>

                <View>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faSliders} size={26} color="#5a5a5a" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.ctnText}>
                <Text style={styles.textIn}>Kitchen Stories</Text>
            </View>

            <View style={styles.ctnContent}>
                {/* <Image source={emtyCart} resizeMode='contain' style = {styles.emtyCart}/>
                <Text style = {styles.textNotice}>Bạn chưa có nguyên liệu nào cần mua trong giỏ hàng!</Text>
                <TouchableOpacity style = {styles.btn}>
                    <Text style = {styles.textBtn}>Tiếp tục tìm kiếm</Text>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => setShowCheckOut(true)}>
                    <CartItem checkout={() => setShowCheckOut(true)} />
                </TouchableOpacity>
            </View>

            {showCheckOut && <FormCheckOut cancel={() => setShowCheckOut(false)} />}
            <Footer navigation={navigation} address={'Cart'} />
        </View>
    );
};

export default CartScreen;
