import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { faHouse, faMagnifyingGlass, faCartShopping, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import styles from './styles';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Footer: React.FC<Navigation> = ({ navigation }) => {
    const [index, setIndex] = useState(1);

    const handleClick = (index: number, address: any) => {
        navigation.navigate(address);
        setIndex(index);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => handleClick(1, "Home")}>
                <FontAwesomeIcon size={20} icon={faHouse} color={index === 1 ? '#da7e4f' : '#747678'} />
                <Text style={index === 1 ? styles.textClick : styles.text}>Trang chủ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => handleClick(2, "Home")}>
                <FontAwesomeIcon size={20} icon={faMagnifyingGlass} color={index === 2 ? '#da7e4f' : '#747678'} />
                <Text style={index === 2 ? styles.textClick : styles.text}>Tìm kiếm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => handleClick(3, "Home")}>
                <FontAwesomeIcon size={20} icon={faUsers} color={index === 3 ? '#da7e4f' : '#747678'} />
                <Text style={index === 3 ? styles.textClick : styles.text}>Cộng đồng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => handleClick(4, "Cart")}>
                <FontAwesomeIcon size={20} icon={faCartShopping} color={index === 4 ? '#da7e4f' : '#747678'} />
                <Text style={index === 4 ? styles.textClick : styles.text}>Giỏ hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => handleClick(5, "Setting")}>
                <FontAwesomeIcon size={20} icon={faUser} color={index === 5 ? '#da7e4f' : '#747678'} />
                <Text style={index === 5 ? styles.textClick : styles.text}>Cá nhân</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
