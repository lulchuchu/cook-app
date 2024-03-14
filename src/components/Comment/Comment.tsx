import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { useFonts } from 'expo-font';
const imgUser = require('../../../assets/images/user.png');

const Comment : React.FC = () => {

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.ctnImg}>
                <Image source={imgUser} resizeMode='cover' style = {styles.imgUser}/>
            </View>

            <View>
                <View style = {styles.ctnInfor}>
                    <Text style = {styles.name}>Bad liar</Text>
                    <Text style = {styles.content} numberOfLines={4}>Công thức nấu ăn rất tuyệt 😍</Text>
                </View>
                
                <View style = {styles.ctnInteract}>
                    <Text>6 giờ</Text>
                    <TouchableOpacity>
                        <Text>Thích</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>Phản hồi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Comment;