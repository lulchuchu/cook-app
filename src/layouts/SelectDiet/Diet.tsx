import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const message = require('../../../assets/images/message.png');

const Diet: React.FC = () => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        Inconsolata: require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconClose}>
                    <FontAwesomeIcon icon={faCircleXmark} size={26} color="#656361" />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Có gì mới?</Text>
            </View>

            <View style={styles.ctnImg}>
                <Image source={message} resizeMode="cover" style={styles.image} />
            </View>

            <View style={styles.ctnText}>
                <Text style={styles.text1}>Khám phá công thức nấu ăn theo sở thích của bạn!</Text>
                <Text style={styles.text2}>Có được công thức nấu ăn cá nhân của riêng bạn chỉ trong 10 giây.</Text>
            </View>

            <View style={styles.ctnButton}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textBtn}>Bắt đầu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Diet;
