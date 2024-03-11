import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';

type Func = {
    cancelModal: () => void;
}

const FormConfirm : React.FC<Func> = ({cancelModal}) => {

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <View></View>
                <Text style = {styles.textHeader}>Thông báo</Text>
                <TouchableOpacity style = {{
                    paddingHorizontal: 4,
                    paddingVertical: 4,
                    marginRight: -4
                }} onPress={cancelModal}>
                    <FontAwesomeIcon icon = {faXmark} size={22} color='#686868'/>
                </TouchableOpacity>
            </View>

            <View style = {{marginVertical: 20, paddingHorizontal: 20}}>
                <Text style = {styles.textConfirm}>Bạn đã kiểm tra và xác nhận với những thông tin của đơn hàng.</Text>
            </View>

            <TouchableOpacity style = {styles.btnConfirm}>
                <Text style = {styles.textBtn}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FormConfirm;