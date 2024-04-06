import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import Item1 from '../../components/SelectDiet/Item1';
import Item2 from '../../components/SelectDiet/Item2';
const message = require('../../../assets/images/message.png');

type Func = {
    close: () => void;
    user: any;
};

const Diet: React.FC<Func> = ({ close, user }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        Inconsolata: require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [showItem1, setShowItem1] = useState(false);
    const [showItem2, setShowItem2] = useState(false);

    const handleClick = () => {
        setShowItem1(true);
    };

    const handleNextLayout = () => {
        setShowItem1(false);
        setShowItem2(true);
    };

    if (!fontLoaded) {
        return null;
    }

    return showItem1 || showItem2 ? (
        showItem1 ? (
            <Item1 func={handleNextLayout} close={close} user={user} />
        ) : (
            <Item2 close={close} user={user} />
        )
    ) : (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconClose} onPress={close}>
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
                <TouchableOpacity style={styles.button} onPress={handleClick}>
                    <Text style={styles.textBtn}>Bắt đầu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Diet;
