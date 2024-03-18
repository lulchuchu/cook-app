import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';

import styles from './style';

type Func = {
    cancel: () => void;
    setItem: () => void;
};

const CreateCookBook: React.FC<Func> = ({ cancel, setItem }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata_Condensed-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata_Condensed-Medium.ttf'),
    });
    const [textInput, setText] = useState('');
    const [isBlur, setBlur] = useState(false);

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={cancel}>
                    <FontAwesomeIcon icon={faChevronLeft} size={20} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Tạo một cookbook</Text>
                <TouchableOpacity style={styles.button} onPress={setItem}>
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
                        style={[
                            styles.input,
                            isBlur
                                ? {
                                      borderColor: 'transparent',
                                  }
                                : {},
                        ]}
                        placeholder="Nhập tên cookbook"
                        placeholderTextColor={'#65676b'}
                        onBlur={() => setBlur(true)}
                        onChangeText={(text) => setText(text)}
                    />
                </View>
            </View>
        </View>
    );
};

export default CreateCookBook;
