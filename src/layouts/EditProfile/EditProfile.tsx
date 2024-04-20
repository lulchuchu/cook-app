import { faChevronLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import styles from './style';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { RouteProp } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

type Route = RouteProp<RootStackParamList, 'EditProfile'>;

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
};

const EditProfile: React.FC<Navigation> = ({navigation, route}) => {
    const [user, setUser] = useState<User>();
    const [tel, setTel] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [checkTel, setCheckTel] = useState(true);
    const [warnAddress, setWarningAddress] = useState(false);
    const [uri, setUri] = useState('');
    const [img, setImg] = useState({
        uri: route.params.user.img,
        type: 'png',
    });

    useEffect(() => {
        const user = route.params.user;
        setUser(user);
        setTel(user.tel);
        setUsername(user.username);
        setEmail(user.email);
        setAddress(user.address);
        setUri(user.img);
    }, []);

    const save = () => {
        if (tel.length < 10 || tel.length > 10) {
            setCheckTel(false);
        } else {
            axios
                .post('http://192.168.34.109:3056/user/update-profile', {
                    _id: user?._id,
                    username: username || user?.username,
                    img: img,
                    address: address,
                    tel: tel,
                })
                .then((response) => {
                    if (response.status === 200) {
                        navigation.navigate('Profile', {user: {
                            _id: user?._id,
                            email: user?.email,
                            username: username,
                            img: uri,
                            tel: tel,
                            address: address,
                            token: user?.token,
                            diet: user?.diet,
                            emailVerified: user?.emailVerified,
                            selectCountry: user?.selectCountry
                        }, updated: true});
                    }
                    else {
                        Alert.alert(response.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        Alert.alert(error.response.data.message);
                    } else if (error.request) {
                        Alert.alert('Network error. Please check your internet connection.');
                    } else {
                        Alert.alert('An unexpected error occurred. Please try again later.');
                    }
                });
        }
    };

    const handleUploadImg = async () => {
        const resulst = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1
        });

        if (!resulst.canceled) {
            const uri = resulst.assets[0].uri;
            setUri(uri);
            const base64 = await FileSystem.readAsStringAsync(resulst.assets[0].uri, {
                encoding: 'base64'
            });

            const objectImage = {
                uri: base64,
                type: 'png'
            };
            setImg(objectImage);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.ctnHeader}>
                    <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('Profile', {user: user, updated: false})}>
                        <FontAwesomeIcon icon={faChevronLeft} size={22} />
                    </TouchableOpacity>

                    <Text style={styles.textHeader}>Sửa hồ sơ</Text>

                    <TouchableOpacity style={styles.btnBack} onPress={save}>
                        <Text style={styles.textSave}>Lưu</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'center',
                            marginVertical: 24,
                        }}
                    >
                        <View style={styles.ctnImage}>
                            {
                                uri !== '' ?
                                <Image source={{uri: uri}} resizeMode='cover' style = {styles.img}/> :
                                <Text style={styles.textName}>{user?.username.slice(0, 1)}</Text>
                            }
                            <TouchableOpacity style={styles.ctnPencil} onPress={handleUploadImg}>
                                <FontAwesomeIcon icon={faPencil} color="#65676b" size={14} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.ctnInput, { marginTop: 0 }]}>
                        <Text style={styles.textHeaderInput}>Username</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            placeholderTextColor={'#65676b'}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>

                    <View style={styles.ctnInput}>
                        <Text style={styles.textHeaderInput}>Số điện thoại</Text>
                        <TextInput
                            style={[
                                styles.input,
                                !checkTel
                                    ? {
                                          borderColor: '#ff4500',
                                      }
                                    : {},
                            ]}
                            placeholder="098..."
                            textContentType="telephoneNumber"
                            keyboardType="numeric"
                            value={tel}
                            placeholderTextColor={'#65676b'}
                            onChangeText={(text) => {
                                setTel(text);
                                if (text.length === 10 && text.substring(0, 1) === '0') {
                                    setCheckTel(true);
                                } else {
                                    setCheckTel(false);
                                }
                            }}
                        />
                        {!checkTel && <Text style={styles.err}>Số điện thoại không hợp lệ</Text>}
                    </View>

                    <View style={styles.ctnInput}>
                        <Text style={styles.textHeaderInput}>Địa chỉ</Text>
                        <TextInput
                            style={[
                                styles.input,
                                warnAddress
                                    ? {
                                          borderColor: '#ffc621',
                                      }
                                    : {},
                            ]}
                            placeholder="Nhập địa chỉ chi tiết"
                            placeholderTextColor={'#65676b'}
                            value={address}
                            onChangeText={(text) => {
                                setAddress(text);
                                if (text.split(' ').length >= 6) {
                                    setWarningAddress(false);
                                } else {
                                    setWarningAddress(true);
                                }
                            }}
                        />
                        {warnAddress && <Text style={styles.warn}>Địa chỉ cần chi tiết hơn.</Text>}
                    </View>

                    <View style={styles.ctnInput}>
                        <Text style={styles.textHeaderInput}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            editable = {false}
                            placeholderTextColor={'#65676b'}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                </View>

                <View style={styles.ctnBtnLogOut}>
                    <TouchableOpacity style={styles.btnLogOut}
                        onPress={() => {
                            navigation.navigate('Home', {user: null, prevAddress: 'Profile'})
                        }}
                    >
                        <Text style={[styles.textSave, { fontFamily: 'Inconsolata-Bold' }]}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default EditProfile;
