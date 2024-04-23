import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

type Props = {
    cart: any;
    cancel: () => void;
    updateCartCancel: (cart: CartInterface) => void;
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

const ConfirmCancel: React.FC<Props> = ({ cart, cancel, updateCartCancel }) => {
    const handleCancel = () => {
        axios
            .post('https://7732-113-160-14-39.ngrok-free.app/user/cancel-cart', {
                idCart: cart._id,
            })
            .then((response) => {
                if (response.status === 200) {
                    const data = cart;
                    data.state = 'Đã hủy';
                    updateCartCancel(data);
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
                cancel();
            });
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View></View>
                <Text style={styles.textHeader}>Thông báo</Text>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 4,
                        paddingVertical: 4,
                        marginRight: -4,
                    }}
                    onPress={cancel}
                >
                    <FontAwesomeIcon icon={faXmark} size={22} color="#686868" />
                </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
                <Text style={styles.textConfirm}>Bạn xác nhận hủy đơn hàng {cart.nameDish}?</Text>
            </View>

            <TouchableOpacity style={styles.btnConfirm} onPress={handleCancel}>
                <Text style={styles.textBtn}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ConfirmCancel;
