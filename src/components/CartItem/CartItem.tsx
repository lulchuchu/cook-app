import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
const source =
    'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2Fempty-cart.png?alt=media&token=2f7637a3-a880-444a-a2ab-ff4017731306';
const shiper = require('../../../assets/images/delivery.png');

type Func = {
    data: any;
    checkout: () => void;
};

const CartItem: React.FC<Func> = ({ data, checkout }) => {
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
                    Nguyên liệu: {data.ingredient.ten?.join(',')}
                </Text>
                <TouchableOpacity style={styles.ctnCancel}>
                    <Text style={styles.textCancel}>Hủy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.item3}>
                <Text style={styles.textPrice}>
                    {(data.ingredient.ten?.length * 10000).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </Text>
                <TouchableOpacity style={{ marginBottom: 4 }} onPress={checkout}>
                    <Image source={shiper} style={styles.imgShiper} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartItem;
