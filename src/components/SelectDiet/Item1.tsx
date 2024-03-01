import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import { useFonts } from 'expo-font';
const dinner = require('../../../assets/images/dinner.png');
const vegan = require('../../../assets/images/diet.png');
const kidFood = require('../../../assets/images/baby.png');

type Func = {
    func: () => void;
    close: () => void;
}

const Item1: React.FC<Func> = ({func, close}) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.ctnIcon}>
                <TouchableOpacity style={styles.iconXMark} onPress={close}>
                    <FontAwesomeIcon icon={faXmark} size={20} color="#888" />
                </TouchableOpacity>
            </View>

            <View style={styles.paging}>
                <View style={styles.item1}></View>
                <View style={styles.item2}></View>
            </View>

            <View style={styles.ctnText}>
                <Text style={styles.textHeader}>Sở thích ăn uống của tôi là...</Text>
            </View>

            <View style={styles.ctnSelect}>
                <TouchableOpacity style={styles.itemSelect}>
                    <Text style={styles.textSelect}>Tôi ăn chay</Text>
                    <Image source={vegan} style={styles.imgSelect} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemSelect}>
                    <Text style={styles.textSelect}>Tôi nấu cho trẻ em</Text>
                    <Image source={kidFood} style={styles.imgSelect} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemSelect}>
                    <Text style={styles.textSelect}>Tôi ăn mọi thứ</Text>
                    <Image source={dinner} style={styles.imgSelect} />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnSkip} onPress={close}>
                    <Text style={styles.textSkip}>Bỏ qua câu hỏi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnNext} onPress={func}>
                    <Text style={styles.textNext}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Item1;
