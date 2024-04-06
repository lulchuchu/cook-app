import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import axios from 'axios';
const dinner = require('../../../assets/images/dinner.png');
const vegan = require('../../../assets/images/diet.png');
const kidFood = require('../../../assets/images/vegetable.png');

type Func = {
    func: () => void;
    close: () => void;
    user: any;
};

const Item1: React.FC<Func> = ({ func, close, user }) => {
    const [index, setIndex] = useState(0);
    const diet = ['Ăn chay', 'Giảm cân', 'Tất cả'];

    const handleClick = () => {
        if (index === 0) {
            func();
        } else {
            axios
                .post('http://192.168.34.109:3056/user/select-diet', {
                    diet: diet[index - 1],
                    _id: user._id,
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data.message);
                    } else if (error.request) {
                        console.log('Network error. Please check your internet connection.');
                    } else {
                        console.log('An unexpected error occurred. Please try again later.');
                    }
                })
                .finally(() => func());
        }
    };

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
                <TouchableOpacity
                    style={index === 1 ? styles.itemSelected : styles.itemSelect}
                    onPress={() => setIndex(1)}
                >
                    <Text style={[styles.textSelect, index === 1 ? { color: '#fff' } : {}]}>Tôi ăn chay</Text>
                    <Image source={vegan} style={styles.imgSelect} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={index === 2 ? styles.itemSelected : styles.itemSelect}
                    onPress={() => setIndex(2)}
                >
                    <Text style={[styles.textSelect, index === 2 ? { color: '#fff' } : {}]}>Tôi đang giảm cân</Text>
                    <Image source={kidFood} style={styles.imgSelect} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={index === 3 ? styles.itemSelected : styles.itemSelect}
                    onPress={() => setIndex(3)}
                >
                    <Text style={[styles.textSelect, index === 3 ? { color: '#fff' } : {}]}>Tôi ăn mọi thứ</Text>
                    <Image source={dinner} style={styles.imgSelect} />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnSkip} onPress={close}>
                    <Text style={styles.textSkip}>Bỏ qua câu hỏi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnNext} onPress={handleClick}>
                    <Text style={styles.textNext}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Item1;
