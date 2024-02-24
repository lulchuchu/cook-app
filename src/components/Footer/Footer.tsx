import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import styles from './styles';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Footer: React.FC<Navigation> = ({ navigation }) => {
    const handleNavigateToSetting = () => {
        navigation.navigate('Setting');
    };
    const handleNavigateToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={handleNavigateToHome}>
                <FontAwesomeIcon size={20} icon={faHouse} color="#da7e4f" />
                <Text style={[styles.text, { color: '#da7e4f' }]}>Trang chủ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <FontAwesomeIcon size={20} icon={faMagnifyingGlass} color="#747678" />
                <Text style={styles.text}>Tìm kiếm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={handleNavigateToSetting}>
                <FontAwesomeIcon size={20} icon={faUser} color="#747678" />
                <Text style={styles.text}>Cá nhân</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
