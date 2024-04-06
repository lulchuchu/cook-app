import { faChevronLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Alert, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import styles from './style';
import axios from 'axios';

type Props = {
    func: () => void;
    data: any;
    setNotice: () => void;
    updateUser: (data: User) => void;
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

const EditProfile: React.FC<Props> = ({ func, data, setNotice, updateUser }) => {
    const [tel, setTel] = useState(data.tel);
    const [address, setAddress] = useState(data.address);
    const [username, setUsername] = useState(data.username);
    const [checkTel, setCheckTel] = useState(true);
    const [warnAddress, setWarningAddress] = useState(false);

    const save = () => {
        if (tel.length < 10 || tel.length > 10) {
            setCheckTel(false);
        } else {
            axios
                .post('http://192.168.34.109:3056/user/update-profile', {
                    _id: data._id,
                    username: username || data.username,
                    img: data.img,
                    address: address,
                    tel: tel,
                })
                .then((response) => {
                    if (response.status === 200) {
                        updateUser(response.data);
                        setNotice();
                        func();
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

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.ctnHeader}>
                    <TouchableOpacity style={styles.btnBack} onPress={func}>
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
                            <Text style={styles.textName}>{data.username.slice(0, 1)}</Text>
                            <TouchableOpacity style={styles.ctnPencil}>
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
                </View>

                <View style={styles.ctnBtnLogOut}>
                    <TouchableOpacity style={styles.btnLogOut}>
                        <Text style={[styles.textSave, { fontFamily: 'Inconsolata-Bold' }]}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default EditProfile;
