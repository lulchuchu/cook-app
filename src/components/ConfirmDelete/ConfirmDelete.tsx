import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';

type Props = {
    cancel: () => void;
    func: () => void;
    text: string;
};

const ConfirmDelete: React.FC<Props> = ({ cancel, func, text }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Bạn chắc chắn?</Text>
            </View>

            <View>
                <Text style={styles.textConfirm}>{text}</Text>
            </View>
            
            <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity style={styles.btnConfirm} onPress={cancel}>
                    <Text style={styles.textBtn}>Hủy</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.btnConfirm} onPress={func}>
                    <Text style={styles.textBtn}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ConfirmDelete;
