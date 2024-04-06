import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './style';
import axios from 'axios';

interface CookBook {
    _id: string;
    dishs: string[];
    name: string;
    user: string;
}

type Func = {
    cancel: () => void;
    user: any;
    idDish: string;
    updateCookBook: (data: CookBook) => void;
};

const CreateCookBook: React.FC<Func> = ({ cancel, user, idDish, updateCookBook }) => {
    const [textInput, setText] = useState('');
    const [isBlur, setBlur] = useState(false);
    const [warn, setWarn] = useState(false);

    const handleSave = () => {
        if (textInput.length > 0) {
            axios
                .post('http://192.168.34.109:3056/nhom-mon-an/tao', {
                    idNguoiDung: user._id,
                    tenNhomMonAn: textInput,
                    idMonAn: idDish,
                })
                .then((response) => {
                    if (response.status === 200) {
                        const data = response.data;
                        updateCookBook(data);
                        cancel();
                    } else {
                        Alert.alert(response.data.message);
                    }
                })
                .catch((err) => {
                    Alert.alert(err.message);
                });
        } else {
            setWarn(true);
            return;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={cancel}>
                    <FontAwesomeIcon icon={faChevronLeft} size={20} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Tạo một cookbook</Text>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={[styles.textSave, textInput.length > 0 ? { color: '#da7e4f' } : {}]}>Lưu</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.ctnBody}>
                <Text style={styles.textHeader}>Tên cookbook</Text>

                <View
                    style={[
                        styles.ctnInput,
                        isBlur
                            ? {
                                  borderColor: '#212121',
                              }
                            : {},
                    ]}
                >
                    <TextInput
                        style={[styles.input, isBlur ? { borderColor: 'transparent' } : {}]}
                        placeholder="Nhập tên cookbook"
                        placeholderTextColor={'#65676b'}
                        onBlur={() => setBlur(true)}
                        onChangeText={(text) => {
                            setText(text);
                            if (text.length > 0) {
                                setWarn(false);
                            }
                        }}
                    />
                </View>
                {warn && <Text style={styles.err}>Hãy nhập tên cookbook!</Text>}
            </View>
        </View>
    );
};

export default CreateCookBook;
