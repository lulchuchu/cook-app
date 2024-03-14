import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faBell, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import Footer from '../../components/Footer/Footer';
import { useFonts } from 'expo-font';

import styles from './styles';
import RecipeLiked from '../../components/RecipeLiked/RecipeLiked';
import RecipeSaved from '../../components/RecipeSaved/RecipeSaved';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Profile: React.FC<Navigation> = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [index, setIndex] = useState(1);

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Hồ sơ</Text>
                <FontAwesomeIcon icon={faGear} size={20} />
            </View>
            <View style={styles.ctnProfile}>
                <View style={styles.ctnImage}>
                    <Text style={styles.textHeader}>B</Text>
                </View>

                <View style={styles.ctnInfo}>
                    <Text style={styles.textName}>Bad liar</Text>
                    <Text style={styles.textRole}>Thành viên cộng đồng</Text>
                    <TouchableOpacity style={styles.btnEdit}>
                        <Text style={styles.textEdit}>Sửa hồ sơ</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.ctnType}>
                <TouchableOpacity style={index === 1 ? styles.itemClick : styles.itemType} onPress={() => setIndex(1)}>
                    <FontAwesomeIcon icon={faBookmark} size={18} color={index === 1 ? '#da7e4f' : '#212121'} />
                    <Text style={index === 1 ? styles.textTypeClick : styles.textType}>Đã lưu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={index === 2 ? styles.itemClick : styles.itemType} onPress={() => setIndex(2)}>
                    <FontAwesomeIcon icon={faHeart} size={18} color={index === 2 ? '#da7e4f' : '#212121'} />
                    <Text style={index === 2 ? styles.textTypeClick : styles.textType}>Đã thích</Text>
                </TouchableOpacity>

                <TouchableOpacity style={index === 3 ? styles.itemClick : styles.itemType} onPress={() => setIndex(3)}>
                    <FontAwesomeIcon icon={faBell} size={18} color={index === 3 ? '#da7e4f' : '#212121'} />
                    <Text style={index === 3 ? styles.textTypeClick : styles.textType}>Thông báo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.ctnContent}>{index === 1 ? <RecipeSaved /> : <RecipeLiked />}</View>

            <Footer navigation={navigation} address="Profile" />
        </View>
    );
};

export default Profile;
