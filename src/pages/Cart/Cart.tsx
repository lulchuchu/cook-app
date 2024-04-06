import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import Footer from '../../components/Footer/Footer';
import CartItem from 'components/CartItem/CartItem';
import FormCheckOut from '../../layouts/FormCheckOut/FormChekout';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
const uriLogin =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2Flog-in.png?alt=media&token=7bb59e32-1848-437d-9e14-8505955ecfd2';
const uri =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2Fempty-cart.png?alt=media&token=2f7637a3-a880-444a-a2ab-ff4017731306';

type Route = RouteProp<RootStackParamList, 'Cart'>;

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
    route: Route;
};

interface CartInterface {
    img: string;
    nameDish: string;
    dish: string;
    ingredient: string;
    meal: number;
}

const CartScreen: React.FC<Navigation> = ({ navigation, route }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [carts, setCart] = useState<CartInterface[]>([
        {
            img: '',
            nameDish: '',
            dish: '',
            ingredient: '',
            meal: 0,
        },
    ]);

    const [data, setData] = useState<CartInterface>({
        img: '',
        nameDish: '',
        dish: '',
        ingredient: '',
        meal: 0,
    });
    const [checkLogin, setCheckLogin] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);

    useEffect(() => {
        if (route.params.user._id !== '') {
            setCheckLogin(true);
            axios
                .get('http://192.168.34.109:3056/user/get-all-cart', {
                    params: { idUser: route.params.user._id },
                })
                .then((response) => {
                    setCart(response.data);
                })
                .catch((error) => {
                    if (error.response) {
                        Alert.alert(error.response.data.message);
                    } else if (error.request) {
                        Alert.alert('Network error. Please check your internet connection.');
                    } else {
                        Alert.alert('An unexpected error occurred. Please try again later.');
                    }
                });
        } else {
            setCheckLogin(false);
        }
    }, []);

    const renderCart = carts.map((cart: CartInterface, index: number) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setShowCheckOut(true);
                    setData(cart);
                }}
                key={index}
            >
                <CartItem checkout={() => setShowCheckOut(true)} data={cart} />
            </TouchableOpacity>
        );
    });

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

            <ScrollView>
                {!checkLogin ? (
                    <View style={styles.ctnContent}>
                        <Image source={{ uri: uriLogin }} resizeMode="contain" style={styles.emtyCart} />
                        <Text style={styles.textNotice}>Hãy đăng nhập để sử dụng dịch vụ của chúng tôi!</Text>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.textBtn}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.ctnContent}>
                        {carts.length > 0 ? (
                            <View>{renderCart}</View>
                        ) : (
                            <View>
                                <Image source={{ uri: uri }} resizeMode="contain" style={styles.emtyCart} />
                                <Text style={styles.textNotice}>
                                    Bạn chưa có nguyên liệu nào cần mua trong giỏ hàng!
                                </Text>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.textBtn}>Tiếp tục tìm kiếm</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            {showCheckOut && (
                <FormCheckOut cancel={() => setShowCheckOut(false)} data={data} user={route.params.user} />
            )}
            <Footer navigation={navigation} address={'Cart'} user={route.params.user} />
        </View>
    );
};

export default CartScreen;
