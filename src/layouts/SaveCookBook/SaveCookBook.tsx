import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useFonts } from 'expo-font';

import styles from './style';
import CreateCookBook from '../CreateCookBook/CreateCookBook';

const itemFood = require('../../../assets/images/bibimbap.png');

type Func = {
    showNotice: () => void;
};

const SaveCookBook: React.FC<Func> = ({ showNotice }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata_Condensed-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata_Condensed-Medium.ttf'),
    });

    const [showFormModal, setShow] = useState(false);
    const [showItem, setItem] = useState(false);

    const handleSave = () => {
        setItem(true);
        setShow(false);
    };

    if (!fontLoaded) {
        return null;
    }

    return showFormModal ? (
        <CreateCookBook cancel={() => setShow(false)} setItem={handleSave} />
    ) : (
        <View style={styles.container}>
            <View
                style={{
                    marginBottom: 20,
                }}
            >
                <Text style={styles.textInBold}>Lưu công thức</Text>
                {showItem ? (
                    <Text style={[styles.textInBold, { fontSize: 18, color: '#65676b', marginTop: 20 }]}>
                        Công thức đã lưu
                    </Text>
                ) : (
                    <Text style={styles.textDes}>Bạn chưa có danh sách lưu công thức nấu ăn nào!</Text>
                )}
            </View>

            {showItem ? (
                <View>
                    <TouchableOpacity style={styles.ctnItem} onPress={showNotice}>
                        <Image source={itemFood} resizeMode="cover" style={styles.imgItem} />
                        <Text style={styles.textItem}>Tráng miệng</Text>
                        <Text style={styles.numberItem}>(1 công thức)</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
            <View style={styles.ctnButton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setShow(true);
                    }}
                >
                    <Text style={styles.textBtn}>Tạo mới cookbook</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SaveCookBook;
