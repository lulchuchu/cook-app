import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import axios from 'axios';
const source =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2Fempty-cart.png?alt=media&token=2f7637a3-a880-444a-a2ab-ff4017731306';
const shiper = require('../../../assets/images/delivery.png');
const delivery =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2Ffood-delivery.png?alt=media&token=bc882880-abac-42c2-b34b-85f443118b73';
const cancel =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2Fdelete.png?alt=media&token=74fc1352-5430-4909-ad17-92e3bd948838';

type Func = {
    data: any;
    checkout: () => void;
    cancelModal: () => void;
};

const CartItem: React.FC<Func> = ({ data, checkout, cancelModal }) => {
    const [state, setState] = useState(data.state);

    useEffect(() => setState(data.state), [data.state]);

    if (state === 'Đang giao') {
        setTimeout(() => {
            setState('Giao thành công');
            axios
                .post('http://192.168.34.109:3056/user/confirm-cart', {
                    idCart: data._id,
                    state: 'Giao thành công',
                })
                .then()
                .catch((err) => {
                    console.log(err.message);
                });
        }, 900000);
    }

    return (
        <View style={styles.containerCart}>
            <View style={styles.item1}>
                <Image source={{ uri: data?.img || source }} resizeMode="cover" style={styles.img} />
            </View>

            <View style={styles.item2}>
                <Text style={styles.textName} numberOfLines={1} ellipsizeMode="tail">
                    {data?.nameDish}
                </Text>
                <Text style={styles.textIngre} numberOfLines={2} ellipsizeMode="tail">
                    Nguyên liệu: {data.ingredient.name?.join(',')}
                </Text>
                <TouchableOpacity style={styles.ctnCancel} onPress={state === 'Đang chờ' ? cancelModal : () => {}}>
                    <Text style={styles.textCancel}>{state === 'Đang chờ' ? 'Hủy' : state}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.item3}>
                <Text style={styles.textPrice}>
                    {(data.ingredient.name?.length * 10000).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </Text>
                <TouchableOpacity style={{ marginBottom: 4 }} onPress={state === 'Đang chờ' ? checkout : () => {}}>
                    <Image
                        source={
                            state === 'Đang chờ' ? shiper : state === 'Đã hủy' ? { uri: cancel } : { uri: delivery }
                        }
                        style={styles.imgShiper}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartItem;
