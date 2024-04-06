import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faBell, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import Footer from '../../components/Footer/Footer';
import { useFonts } from 'expo-font';
import { RouteProp } from '@react-navigation/native';

import styles from './styles';
import RecipeLiked from '../../components/RecipeLiked/RecipeLiked';
import RecipeSaved from '../../components/RecipeSaved/RecipeSaved';
import EditProfile from '../../layouts/EditProfile/EditProfile';
import OptionLogin from '../../layouts/OptionLogin/OptionLogin';
import Notice from '../../components/NoticeForm/Notice';

type Route = RouteProp<RootStackParamList, 'Profile'>;

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
    route: Route;
};

interface User {
    _id: string;
    email: string;
    username: string;
    img: string;
    tel: string;
    address: string;
    token: string;
    diet: string;
    emailVerified: boolean;
    selectCountry: string;
}

const Profile: React.FC<Navigation> = ({ navigation, route }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const [user, setUser] = useState<User>(route.params.user);

    const [index, setIndex] = useState(1);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalNotice, setModalNotice] = useState(false);

    if (!fontLoaded) {
        return null;
    }

    const updateUser = (user: User) => {
        setUser(user);
    };

    if (modalNotice) {
        setTimeout(() => {
            setModalNotice(false);
        }, 2000);
    }

    return user._id !== '' ? (
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={modalNotice}>
                <Notice text="Bạn đã cập nhật thành công!" type="success" />
            </Modal>
            <Modal transparent={true} animationType="slide" visible={modalEdit}>
                <EditProfile
                    func={() => setModalEdit(false)}
                    data={user}
                    updateUser={(data: User) => updateUser(data)}
                    setNotice={() => setModalNotice(true)}
                />
            </Modal>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Hồ sơ</Text>
                <TouchableOpacity onPress={() => navigation.navigate('OptionLogin')}>
                    <FontAwesomeIcon icon={faGear} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.ctnProfile}>
                <View style={styles.ctnImage}>
                    <Text style={styles.textHeader}>{user.username.substring(0, 1)}</Text>
                </View>

                <View style={styles.ctnInfo}>
                    <Text style={styles.textName}>{user.username}</Text>
                    <Text style={styles.textRole}>Thành viên cộng đồng</Text>
                    <TouchableOpacity style={styles.btnEdit} onPress={() => setModalEdit(true)}>
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

            <View style={styles.ctnContent}>{index === 1 ? <RecipeSaved user={user} /> : <RecipeLiked />}</View>

            <Footer navigation={navigation} address="Profile" user={user} />
        </View>
    ) : (
        <OptionLogin navigation={navigation} />
    );
};

export default Profile;
