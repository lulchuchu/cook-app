import React from 'react';
import {Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './style';
const itemFood = require('../../../assets/images/bibimbap.png');

type Props = {
    setIdCookBook: (id: string, name: string) => void;
    setModal: () => void;
    cookBooks: CookBook[];
};

interface CookBook {
    _id: string;
    dishs: number;
    name: string;
    user: string;
}

const RecipeSaved: React.FC<Props> = ({ setIdCookBook, cookBooks, setModal }) => {

    const renderCookBook = cookBooks.map((item: CookBook, index: number) => {
        return (
            <TouchableOpacity
                style={styles.ctnItem}
                key={index}
                onPress={() => {
                    setIdCookBook(item._id, item.name);
                    setModal();
                }}
            >
                <Image source={itemFood} resizeMode="cover" style={styles.imgItem} />
                <Text style={styles.textItem}>{item.name}</Text>
                <Text style={styles.numberItem}>({item.dishs} công thức)</Text>
            </TouchableOpacity>
        );
    });

    return cookBooks.length > 0 ? (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 80,
            }}
        >
            {renderCookBook}
        </View>
    ) : (
        <View style={styles.ctnContent}>
            <TouchableOpacity style={styles.btnCreate}>
                <View style={styles.ctnIcon}>
                    <FontAwesomeIcon icon={faPlus} color="#0a9b70" />
                </View>
                <Text style={styles.textCreate}>Tạo thư mục</Text>
            </TouchableOpacity>
            <Text style={styles.textDes}>Bạn chưa có danh sách lưu công thức nấu ăn nào!</Text>
            <Text
                style={[
                    styles.textDes,
                    { width: '90%', fontFamily: 'Inconsolata-Medium', color: '#212121', fontSize: 16 },
                ]}
            >
                Tạo thư mục để lưu công thức nấu ăn theo chủ đề.
            </Text>
        </View>
    );
};

export default RecipeSaved;
