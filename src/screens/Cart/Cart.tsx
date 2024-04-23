import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import Footer from '../../components/Footer/Footer';
import CartItem from 'components/CartItem/CartItem';
import FormCheckOut from '../../layouts/FormCheckOut/FormChekout';
import ConfirmCancel from 'components/ConfirmCancel/ConfirmCancel';
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
    _id: string;
    img: string;
    nameDish: string;
    dish: string;
    ingredient: object;
    meal: number;
    state: string;
}

const CartScreen: React.FC<Navigation> = ({ navigation, route }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [carts, setCart] = useState<CartInterface[]>([]);
    const [checkLogin, setCheckLogin] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [indexSelect, setIndexSelect] = useState(0);
    const [modalCancel, setModalCancel] = useState(false);
    const [itemCancel, setItemCancel] = useState(0);

    useEffect(() => {
        if (route.params.user._id !== '') {
            setCheckLogin(true);
            axios
                .get('https://7732-113-160-14-39.ngrok-free.app/user/get-all-cart', {
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
                    if (cart.state === 'Đang chờ') {
                        setShowCheckOut(true);
                        setIndexSelect(index);
                    } else {
                        return;
                    }
                }}
                key={index}
            >
                <CartItem
                    checkout={() => setShowCheckOut(true)}
                    data={cart}
                    cancelModal={() => {
                        setModalCancel(true);
                        setItemCancel(index);
                    }}
                    key={cart._id}
                />
            </TouchableOpacity>
        );
    });

    const updateCart = (cart: CartInterface) => {
        var arr = Array.from(carts);
        arr[indexSelect] = cart;
        setCart(arr);
    };

    const updateCartCancel = (updatedCart: CartInterface) => {
        const updatedCarts = carts.map((cart) => (cart._id === updatedCart._id ? updatedCart : cart));
        setCart(updatedCarts);
    };

    const handleCancel = () => {
        axios
            .post('https://7732-113-160-14-39.ngrok-free.app/user/cancel-cart', {
                idCart: carts[itemCancel]._id,
            })
            .then((response) => {
                if (response.status === 200) {
                    carts[itemCancel].state = 'Đã hủy';
                    const updateCart = [...carts];
                    setCart(updateCart);
                }
            })
            .catch((error) => {
                if (error.response) {
                    Alert.alert(error.response.data.message);
                } else if (error.request) {
                    Alert.alert('Network error. Please check your internet connection.');
                } else {
                    Alert.alert('An unexpected error occurred. Please try again later.');
                }
            })
            .finally(() => {
                setModalCancel(false);
            });
    };
    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {modalCancel && (
                <View style={styles.ctnModal}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalCancel}
                        onRequestClose={() => {
                            setModalCancel(false);
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                            }}
                        >
                            <ConfirmCancel
                                cart={carts[itemCancel]}
                                cancel={() => setModalCancel(false)}
                                updateCartCancel={(cart: CartInterface) => updateCartCancel(cart)}
                            />
                        </View>
                    </Modal>
                </View>
            )}

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
                        <TouchableOpacity style={styles.btn} 
                            onPress={() => navigation.navigate('Login', {address: 'Cart'})}
                        >
                            <Text style={styles.textBtn}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                ) : carts.length > 0 ? (
                    <View style={styles.ctnContent}>{renderCart}</View>
                ) : (
                    <View style={styles.ctnContent}>
                        <Image source={{ uri: uri }} resizeMode="contain" style={styles.emtyCart} />
                        <Text style={styles.textNotice}>Bạn chưa có nguyên liệu nào cần mua trong giỏ hàng!</Text>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Search', {user: route.params.user})}>
                            <Text style={styles.textBtn}>Tiếp tục tìm kiếm</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {showCheckOut && (
                <FormCheckOut
                    cancel={() => setShowCheckOut(false)}
                    data={carts[indexSelect]}
                    user={route.params.user}
                    updateCart={(cart: CartInterface) => updateCart(cart)}
                />
            )}
            <Footer navigation={navigation} address={'Cart'} user={route.params.user} />
        </View>
    );
};

export default CartScreen;
