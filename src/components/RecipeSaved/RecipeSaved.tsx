import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './style';

const RecipeSaved: React.FC = () => {
    return (
        <View style = {styles.ctnContent}>
            <TouchableOpacity style = {styles.btnCreate}>
                <View style = {styles.ctnIcon}>
                    <FontAwesomeIcon icon = {faPlus} color="#0a9b70"/>
                </View>
                <Text style = {styles.textCreate}>Tạo thư mục</Text>
            </TouchableOpacity>
            <Text style = {styles.textDes}>Bạn chưa có danh sách lưu công thức nấu ăn nào!</Text>
            <Text style = {[styles.textDes, {width: '90%', fontFamily: 'Inconsolata-Medium', color: '#212121', fontSize: 16}]}>Tạo thư mục để lưu công thức nấu ăn theo chủ đề.</Text>
        </View>
    );
};

export default RecipeSaved;