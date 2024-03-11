import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const emtyLike = require('../../../assets/images/empty-likes.png');
import styles from '../RecipeSaved/style';

const RecipeLiked : React.FC = () => {
    return (
        <View style = {styles.ctnContent}>
            <Image source={emtyLike} resizeMode="contain" style = {styles.imgEmty}/>
            <Text style = {styles.textDes}>Chưa có công thức nấu ăn nào trong danh sách yêu thích!</Text>
            <TouchableOpacity style = {styles.btnSearch}>
                <Text style = {[styles.textCreate, {color: '#fff'}]}>Tiếp tục tìm kiếm</Text>
            </TouchableOpacity>
        </View>
    )
};

export default RecipeLiked;