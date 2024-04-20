import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faBell, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import Footer from '../../components/Footer/Footer';
import { useFonts } from 'expo-font';
import { RouteProp } from '@react-navigation/native';

import styles from './styles';
import DishLiked from '../../components/DishLiked/DishLiked';
import DishSaved from '../../components/DishSaved/DishSaved';
import EditProfile from '../../layouts/EditProfile/EditProfile';
import OptionLogin from '../../layouts/OptionLogin/OptionLogin';
import Notice from '../../components/NoticeForm/Notice';
import DishOfCookbook from '../../layouts/DishOfCookBook/DishOfCookbook';
import axios from 'axios';

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

interface CookBook {
    _id: string;
    dishs: number;
    name: string;
    user: string;
}

const Profile: React.FC<Navigation> = ({ navigation, route }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const [user, setUser] = useState<User>(route.params.user);

    const [index, setIndex] = useState(1);
    const [modalNotice, setModalNotice] = useState(false);
    const [idCookBook, setIdCookBok] = useState('');
    const [nameCookBook, setNameCookBok] = useState('');
    const [modalCookBook, setModalCookBook] = useState(false);
    const [cookBooks, setCookBook] = useState<CookBook[]>([]);

    useEffect(() => {
        if (user._id !== '') {
            axios
                .get('http://192.168.34.109:3056/cook-book/get-all-cookBook', {
                    params: { idNguoiDung: user._id },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const cookBooks : CookBook[] = [];
                        for (const data of response.data) {
                            const dishs = data.numberDish;
                            const group = data.group;
                            const item : CookBook = {
                                _id: group?._id,
                                dishs: dishs,
                                name: group?.name,
                                user: group?.user
                            }
                            cookBooks.push(item);
                        }
                        setCookBook(cookBooks); 
                    }
                })
                .catch((err) => {
                    Alert.alert(err.message);
                });
        }
        if (route.params.updated) {
            setModalNotice(true);
            setUser(route.params.user);
        }
    }, [route.params.user]);

    if (!fontLoaded) {
        return null;
    }

    const updateCookBooks = () => {
        var arr = Array.from(cookBooks);
        arr = arr.filter(item => item._id !== idCookBook);
        setCookBook(arr);
    }

    const updateDishOfCookBook = () => {
        var arr = Array.from(cookBooks);
        for (const cookBook of arr) {
            if (cookBook._id === idCookBook) {
                cookBook.dishs -= 1;
            }
        }
        setCookBook(arr);
    }

    if (modalNotice) {
        setTimeout(() => {
            setModalNotice(false);
        }, 2000);
    }

    return user._id !== '' ? (
        !modalCookBook ? (
            <View style={styles.container}>
                <Modal animationType="slide" transparent={true} visible={modalNotice}>
                    <Notice text="Bạn đã cập nhật thành công!" type="success" />
                </Modal>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Hồ sơ</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('OptionLogin')}>
                        <FontAwesomeIcon icon={faGear} size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.ctnProfile}>
                    <View style={styles.ctnImage}>
                        {user.img !== '' ?
                            <Image source={{uri: user.img}} resizeMode='cover' style = {styles.img}/> :
                            <Text style={styles.textHeader}>{user.username.substring(0, 1)}</Text>
                        }
                    </View>

                    <View style={styles.ctnInfo}>
                        <Text style={styles.textName}>{user.username}</Text>
                        <Text style={styles.textRole}>Thành viên cộng đồng</Text>
                        <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.navigate('EditProfile', {user: user})}>
                            <Text style={styles.textEdit}>Sửa hồ sơ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ctnType}>
                    <TouchableOpacity
                        style={index === 1 ? styles.itemClick : styles.itemType}
                        onPress={() => setIndex(1)}
                    >
                        <FontAwesomeIcon icon={faBookmark} size={18} color={index === 1 ? '#da7e4f' : '#212121'} />
                        <Text style={index === 1 ? styles.textTypeClick : styles.textType}>Đã lưu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={index === 2 ? styles.itemClick : styles.itemType}
                        onPress={() => setIndex(2)}
                    >
                        <FontAwesomeIcon icon={faHeart} size={18} color={index === 2 ? '#da7e4f' : '#212121'} />
                        <Text style={index === 2 ? styles.textTypeClick : styles.textType}>Đã thích</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={index === 3 ? styles.itemClick : styles.itemType}
                        onPress={() => setIndex(3)}
                    >
                        <FontAwesomeIcon icon={faBell} size={18} color={index === 3 ? '#da7e4f' : '#212121'} />
                        <Text style={index === 3 ? styles.textTypeClick : styles.textType}>Thông báo</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    bounces = {false}
                    showsVerticalScrollIndicator = {false}
                >
                    <View style={styles.ctnContent}>
                        {index === 1 ? (
                            <DishSaved
                                setIdCookBook={(id: string, name: string) => {
                                    setIdCookBok(id);
                                    setNameCookBok(name);
                                }}
                                cookBooks={cookBooks}
                                setModal={() => setModalCookBook(true)}
                            />
                        ) : (
                            <DishLiked user={user} navigation={navigation} />
                        )}
                    </View>
                </ScrollView>

                <Footer navigation={navigation} address="Profile" user={user} />
            </View>
        ) : (
            <View style={styles.container}>
                <DishOfCookbook
                    user={user}
                    _idCookBook={idCookBook}
                    navigation={navigation}
                    cancel={() => setModalCookBook(false)}
                    name = {nameCookBook}
                    updateCookBooks = {updateCookBooks}
                    updateDishOfCookBook = {updateDishOfCookBook}
                />
                <Footer navigation={navigation} address="Profile" user={user} />
            </View>
        )
    ) : (
        <OptionLogin navigation={navigation} />
    );
};

export default Profile;
