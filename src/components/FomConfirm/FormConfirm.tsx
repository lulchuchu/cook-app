import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';

type Func = {
    cancelModal: () => void;
    text: string;
    button: string;
    func: () => void;
};

const FormConfirm: React.FC<Func> = ({ cancelModal, text, button, func }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View></View>
                <Text style={styles.textHeader}>Thông báo</Text>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 4,
                        paddingVertical: 4,
                        marginRight: -4,
                    }}
                    onPress={cancelModal}
                >
                    <FontAwesomeIcon icon={faXmark} size={22} color="#686868" />
                </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
                <Text style={styles.textConfirm}>{text}</Text>
            </View>

            <TouchableOpacity
                style={styles.btnConfirm}
                onPress={() => {
                    func();
                    cancelModal();
                }}
            >
                <Text style={styles.textBtn}>{button}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FormConfirm;
