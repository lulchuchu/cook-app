import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from "./style";
import { useFonts } from 'expo-font';
const source = require('../../../assets/images/R1016-final-photo-1.jpg');
const shiper = require('../../../assets/images/delivery.png');

type Func = {
    checkout: () => void;
}

const CartItem : React.FC<Func> = ({checkout}) => {

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    if (!fontLoaded) {
        return null;
    };

    return (
        <View style = {styles.containerCart}>
            <View style = {styles.item1}>
                <Image source={source} resizeMode='cover' style = {styles.img}/>
            </View>
            
            <View style = {styles.item2}>
                <Text style = {styles.textName} numberOfLines={1} ellipsizeMode='tail' >Bánh hạnh nhân dừa</Text>
                <Text style = {styles.textIngre} numberOfLines={3} ellipsizeMode='tail'>
                    Nguyên liệu: dừa, đường, rau, trứng, sữa, socola
                </Text>
                <TouchableOpacity style = {styles.ctnCancel}>
                    <Text style = {styles.textCancel}>Hủy</Text>
                </TouchableOpacity>
            </View>
            
            <View style = {styles.item3}>
                <Text style = {styles.textPrice}>120.000đ</Text>
                <TouchableOpacity style = {{marginBottom: 4}} onPress={checkout}>
                    <Image source={shiper} style = {styles.imgShiper}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartItem;