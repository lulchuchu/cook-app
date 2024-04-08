import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './style';
const itemFood = require('../../../assets/images/bibimbap.png');

type Props = {
    user: any;
    setIdCookBook: (id: string) => void;
    setModal: () => void;
};

interface CookBook {
    _id: string;
    dishs: string[];
    name: string;
    user: string;
}

const RecipeSaved: React.FC<Props> = ({ user, setIdCookBook, setModal }) => {
    const [cookBook, setCookBook] = useState<CookBook[]>([]);

    useEffect(() => {
        axios
            .get('http://192.168.34.109:3056/cook-book/get-all-cookBook', {
                params: { idNguoiDung: user._id },
            })
            .then((response) => {
                if (response.status === 200) {
                    setCookBook(response.data);
                }
            })
            .catch((err) => {
                Alert.alert(err.message);
            });
    }, []);

    const renderCookBook = cookBook.map((item: CookBook, index: number) => {
        return (
            <TouchableOpacity
                style={styles.ctnItem}
                key={index}
                onPress={() => {
                    setIdCookBook(item._id);
                    setModal();
                }}
            >
                <Image source={itemFood} resizeMode="cover" style={styles.imgItem} />
                <Text style={styles.textItem}>{item.name}</Text>
                <Text style={styles.numberItem}>({item.dishs.length} công thức)</Text>
            </TouchableOpacity>
        );
    });

    return cookBook.length > 0 ? (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
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
