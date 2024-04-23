import React, { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { faChevronLeft, faHouse, faMinus, faPlus, faSquarePhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './style';
import FormConfirm from '../../components/FomConfirm/FormConfirm';
import axios from 'axios';

type Func = {
    data: any;
    user: any;
    cancel: () => void;
    updateCart: (cart: CartInterface) => void;
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

interface Store {
    tel: string;
    staf: string;
    address: string;
}

const FormCheckOut: React.FC<Func> = ({ data, cancel, user, updateCart }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [arr, setArr] = useState(new Array(data.ingredient?.name.length).fill(true));
    const [price, setPrice] = useState(data.ingredient?.name.length * 10000);
    const [defaultPortion, setDefaultPortion] = useState(data.meal);
    const [quantityIngredient, setQunatityIngre] = useState<string[]>(data.ingredient.quantity);
    const [ration, setRation] = useState(0);
    const [tel, setTel] = useState<string>(user.tel);
    const [address, setAddress] = useState<string>(user.address || '');
    const [distance, setDistance] = useState(0);
    const [store, setStore] = useState<Store>({
        tel: '',
        address: '',
        staf: '',
    });
    const [checkTel, setCheckTel] = useState(true);
    const [checkAddress, setCheckAddress] = useState(true);
    useEffect(() => {
        if (address !== '') {
            axios
                .get('https://7732-113-160-14-39.ngrok-free.app/store/calculate-distance', {
                    params: { address },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const data = response.data;
                        setStore(data.nearStore);
                    } else {
                        Alert.alert(response.data.message);
                    }
                })
                .catch((err) => {
                    Alert.alert(err.message);
                });
        }
    }, []);

    const getStore = () => {
        if (address.length < 5) {
            Alert.alert('Địa chỉ cần chi tiết hơn!');
            setStore({tel: '',
            address: '',
            staf: '',});
        }
        else {
            axios
                .get('https://7732-113-160-14-39.ngrok-free.app/store/calculate-distance', {
                    params: { address },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const data = response.data;
                        setStore(data.nearStore);
                        setDistance(data.minDistance);
                    } else {
                        Alert.alert(response.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        Alert.alert(err.response.data.message);
                    } else if (err.request) {
                        Alert.alert('Network error. Please check your internet connection.');
                    } else {
                        Alert.alert('An unexpected error occurred. Please try again later.');
                    }
                });
        }
    };

    const checkBox = (value: number) => {
        const prevArr = Array.from(arr);
        prevArr[value] = !arr[value];
        var count = prevArr.reduce((acc, curr) => {
            if (curr === true) {
                return acc + 1;
            } else {
                return acc;
            }
        }, 0);
        setPrice(count * 10000);
        setArr(prevArr);
    };

    const renderIngre = quantityIngredient.map((quantity: any, index: number) => {
        return (
            <View style={styles.ctnItemIngre} key={index}>
                <View>
                    <Text style={styles.nameIngre}>{data?.ingredient.name[index]}</Text>
                    <Text style={styles.textQuantity}>
                        Số lượng: {quantity} {data?.ingredient.unit[index]}
                    </Text>
                </View>
                <View>
                    <Checkbox value={arr[index]} color={'green'} onValueChange={() => checkBox(index)} />
                </View>
            </View>
        );
    });

    const confirmCheckout = () => {
        axios
            .post('https://7732-113-160-14-39.ngrok-free.app/user/confirm-cart', {
                idCart: data._id,
                state: 'Đang giao',
            })
            .then((response) => {
                if (response.status === 200) {
                    var cart = data;
                    cart['state'] = 'Đang giao';
                    updateCart(cart);
                    cancel();
                }
            })
            .catch((err) => {
                if (err.response) {
                    Alert.alert(err.response.data.message);
                } else if (err.request) {
                    Alert.alert('Network error. Please check your internet connection.');
                } else {
                    Alert.alert('An unexpected error occurred. Please try again later.');
                }
            });
    };

    const handleTouch = () => {
        if (checkTel && store.address !== '') {
            setModalVisible(true);
            setCheckTel(true);
            setCheckAddress(true);
        } 
        else if (!checkTel && address.length === 0) {
            setCheckTel(false);
            setCheckAddress(false);
        }
        else if (address.length === 0 && checkTel) {
            setCheckAddress(false);
            setCheckTel(true);
        }
        else if (address.length > 0 && !checkTel) {
            setCheckTel(false);
            setCheckAddress(true);
        }
        else {
            Alert.alert('Địa chỉ cần chi tiết hơn');
        }
    };

    const increaseRations = () => {
        if (defaultPortion === ration * 5) {
            return;
        }
        setDefaultPortion(defaultPortion + 1);
        var arr = Array.from(quantityIngredient);
        for (let i = 0; i < arr.length; i++) {
            if (Number.isNaN(parseInt(arr[i]) * 2)) {
                arr[i] = arr[i];
            } else {
                arr[i] = (parseInt(arr[i]) * 2).toString();
            }
        }
        setQunatityIngre(arr);
        setPrice(price * 3/2);
    };

    const reduceRation = () => {
        if (defaultPortion === ration) {
            return;
        }
        setDefaultPortion(defaultPortion - 1);
        var arr = Array.from(quantityIngredient);
        for (let i = 0; i < arr.length; i++) {
            if (Number.isNaN(parseInt(arr[i]) / 2)) {
                arr[i] = arr[i];
            } else {
                arr[i] = (parseInt(arr[i]) / 2).toString();
            }
        }
        setQunatityIngre(arr);
        setPrice(price / 1.5);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack} onPress={cancel}>
                    <FontAwesomeIcon icon={faChevronLeft} size={22} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Đơn hàng</Text>
                <View></View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} bounces={false}>
                <View style={styles.ctnBody}>
                    <View style={styles.mb20}>
                        <Text style={styles.textTitle}>Nguyên liệu</Text>
                        <View style={styles.ctnAdjust}>
                            <Text style={styles.numberAdjust}>{defaultPortion} phần</Text>
                            <View style={styles.adjustQuantity}>
                                <TouchableOpacity style={styles.btnAdjust} onPress={reduceRation}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </TouchableOpacity>
                                <Text style={styles.textAdjust}>{defaultPortion}</Text>
                                <TouchableOpacity style={styles.btnAdjust} onPress={increaseRations}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {renderIngre}
                    </View>
                    <View style={styles.mb32}>
                        <Text style={styles.textTitle}>Thông tin người nhận</Text>
                        <View style={styles.ctnInforCus}>
                            <View style={styles.flexRow}>
                                <Text style={styles.textIn}>Tên: </Text>
                                <Text style={styles.name}>{user.username}</Text>
                            </View>
                            <View style={[styles.flexRow, { alignItems: 'flex-start' }]}>
                                <FontAwesomeIcon
                                    icon={faSquarePhone}
                                    size={22}
                                    color="#61b2e3"
                                    style={{ marginTop: 12 }}
                                />
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            !checkTel
                                                ? {
                                                      borderColor: '#ff4500',
                                                  }
                                                : {},
                                        ]}
                                        value={tel}
                                        onChangeText={(text) => {
                                            setTel(text);
                                            if (text.length === 10 && text.substring(0, 1) === '0') {
                                                setCheckTel(true);
                                            } else {
                                                setCheckTel(false);
                                            }
                                        }}
                                        editable = {!checkTel}
                                        textContentType="telephoneNumber"
                                        keyboardType="numeric"
                                        placeholder="Nhập số điện thoại!"
                                    />
                                    {!checkTel && <Text style={styles.err}>Số điện thoại không hợp lệ!</Text>}
                                </View>
                            </View>
                            <View style={styles.flexRow}>
                                <FontAwesomeIcon icon={faHouse} size={22} color="#00ab56" />
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            !checkAddress
                                                ? {
                                                      borderColor: '#ff4500',
                                                  }
                                                : {},
                                        ]}
                                        value={address}
                                        onChangeText={(text) => {
                                            setAddress(text);
                                            if (text.length > 0) {
                                                setCheckAddress(true);
                                            }
                                        }}
                                        textContentType="addressCity"
                                        placeholder="Nhập địa chỉ!"
                                        onBlur={getStore}
                                    />
                                    {!checkAddress && <Text style={styles.err}>Địa chỉ không được bỏ trống!</Text>}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mb32}>
                        <Text style={styles.textTitle}>Thông tin giao hàng</Text>
                        {store.staf !== '' ? (
                            <View style={styles.ctnInforCus}>
                                <View style={styles.flexRow}>
                                    <Text style={styles.textIn}>Nhân viên: </Text>
                                    <Text style={styles.name}>{store.staf}</Text>
                                </View>
                                <View style={styles.flexRow}>
                                    <FontAwesomeIcon icon={faSquarePhone} size={20} color="#61b2e3" />
                                    <Text style={styles.address}>{store.tel}</Text>
                                </View>

                                <View style={styles.flexRow}>
                                    <FontAwesomeIcon icon={faClock} size={20} color="#61b2e3" />
                                    <Text style={styles.address}>
                                        {Math.round((distance / 1000 / 45) * 60 + 10)} phút
                                    </Text>
                                </View>

                                <View style={styles.flexRow}>
                                    <FontAwesomeIcon icon={faHouse} size={22} color="#00ab56" />
                                    <Text style={styles.address}>{store.address}</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.ctnInforCus}>
                                <Text style={styles.address}>Đang tìm kiếm!</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.ctnFooter}>
                <View>
                    <Text style={styles.textIn}>Tổng tiền</Text>
                    <Text style={styles.textMoney}>
                        {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Text>
                </View>

                <TouchableOpacity style={styles.btnConfirm} onPress={handleTouch}>
                    <Text style={styles.textBtn}>Đặt đơn</Text>
                </TouchableOpacity>
            </View>

            {modalVisible && (
                <View style={styles.ctnModal}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                            }}
                        >
                            <FormConfirm
                                cancelModal={() => setModalVisible(false)}
                                text="Bạn đã kiểm tra và xác nhận với những thông tin của đơn hàng!"
                                button="Xác nhận"
                                func={confirmCheckout}
                            />
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    );
};

export default FormCheckOut;
