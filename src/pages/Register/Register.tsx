import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import axios from 'axios';
import * as Network from 'expo-network';

import styles from './styles';
import { useFonts } from 'expo-font';
const image = require('../../../assets/images/food-1898194_640.jpg');

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Register: React.FC<Navigation> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [username, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [ipAddress, setIpAddress] = useState<string>('');

    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPass, setValiddPass] = useState(false);

    const [fontLoaded] = useFonts({
        Inconsolata: require('../../../assets/fonts/Inconsolata-Medium.ttf'),
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata_Condensed-Medium.ttf'),
    });

    useEffect(() => {
        const getLocalIpAddress = async () => {
            try {
                const ipLocal = await Network.getIpAddressAsync();
                setIpAddress(ipLocal);
            } catch (err: any) {
                setIpAddress(err.message);
            }
        };
        getLocalIpAddress();
    }, []);

    // Alert.alert(ipAddress);

    const onChangName = (name: string) => {
        setName(name);
        if (name.length > 0) {
            setValidName(true);
        } else {
            setValidName(false);
        }
    };

    const onChangeMail = (mail: string) => {
        setEmail(mail);
        if (mail.length > 0 && mail.includes('@gmail.com')) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    };

    const onChangePass = (password: string) => {
        setPassword(password);
        if (password.length >= 8) {
            setValiddPass(true);
        } else {
            setValiddPass(false);
        }
    };

    const handleRegister = () => {
        if (validEmail && validName && validPass) {
            const data = {
                email,
                username,
                password,
            };
            axios
                .post(`http://${ipAddress}:3056/user/register`, data, {
                    timeout: 1000,
                })
                .then((response) => {
                    if (response.status === 200) {
                        Alert.alert(response.data.token);
                    } else {
                        Alert.alert(response.data.message);
                    }
                })
                .catch((error) => {
                    Alert.alert(error.message);
                });
        } else {
            Alert.alert('Nhập chính xác thông tin.');
        }
    };

    const handleBack = () => {
        navigation.navigate('OptionLogin');
    };

    const handleToLogin = () => {
        navigation.navigate('Login');
    };

    const handleClick = () => {
        navigation.navigate('Home');
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imgBackground} blurRadius={16}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tên"
                        value={username}
                        onChangeText={(text) => onChangName(text)}
                        placeholderTextColor={'#212121'}
                    />
                    {validName ? (
                        <View style={styles.ctnValidName}>
                            <FontAwesomeIcon icon={faCheck} color="#458e6e" />
                        </View>
                    ) : (
                        ''
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(mail) => onChangeMail(mail)}
                        placeholderTextColor={'#212121'}
                    />
                    {validEmail ? (
                        <View style={styles.ctnValidEmail}>
                            <FontAwesomeIcon icon={faCheck} color="#458e6e" />
                        </View>
                    ) : (
                        ''
                    )}
                    {email.length > 0 && !validEmail ? <Text style={styles.error}>Email này không hợp lệ.</Text> : ''}
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        value={password}
                        onChangeText={(pass) => onChangePass(pass)}
                        placeholderTextColor={'#212121'}
                        secureTextEntry={true}
                    />
                    {password.length > 0 && !validPass ? (
                        <Text style={styles.error}>Mật khẩu phải có ít nhất 8 ký tự.</Text>
                    ) : (
                        ''
                    )}
                    <View>
                        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
                            <Text style={styles.textBtnRegister}>Đăng ký</Text>
                        </TouchableOpacity>

                        <View>
                            <Text style={styles.textRole}>
                                Bằng cách đăng ký, tôi chấp nhận các
                                <Text> </Text>
                                <Text style={styles.textUnderline}>điều khoản sử dụng</Text>
                                <Text> </Text>
                                và
                                <Text> </Text>
                                <Text style={styles.textUnderline}>chính sách bảo mật dữ liệu</Text>
                                <Text>.</Text>
                            </Text>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.checkAccount}>Bạn đã có tài khoản?</Text>
                            <TouchableOpacity onPress={handleToLogin}>
                                <Text style={styles.linkLogin}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={handleBack}>
                        <FontAwesomeIcon icon={faChevronLeft} size={20} color="#da7e4f" style={{ padding: 4 }} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.textRegister}>Đăng ký</Text>
                <TouchableOpacity onPress={handleClick}>
                    <Text style={styles.textSkip}>Bỏ qua</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;
