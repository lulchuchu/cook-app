import React, { useEffect, useState } from 'react';
import {
    Alert,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import axios from 'axios';
import * as Network from 'expo-network';

import styles from './styles';
import { useFonts } from 'expo-font';
import VerifyEmail from '../../layouts/VerifyEmail/VerifyEmail';
import Notice from '../../components/NoticeForm/Notice';
const image = require('../../../assets/images/food-1898194_640.jpg');

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

interface UserInterface {
    _id: string;
    email: string;
    username: string;
    img: string;
    tel: string;
    address: string;
    token: string;
    emailVerified: boolean;
}

const Register: React.FC<Navigation> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [username, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, setUser] = useState<UserInterface>({
        _id: '',
        email: '',
        username: '',
        img: '',
        tel: '',
        address: '',
        token: '',
        emailVerified: false,
    });

    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPass, setValiddPass] = useState(false);
    const [blurName, setBlurName] = useState(false);
    const [blurEmail, setBlurEmail] = useState(false);
    const [blurPass, setBlurPass] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [typeNotice, setType] = useState('');
    const [textNotice, setText] = useState('');
    const [showNotice, setShowNotice] = useState(false);

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata_Condensed-Medium.ttf'),
    });

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
        setLoading(true);
        Keyboard.dismiss();
        if (validEmail && validName && validPass) {
            const data = { email, username, password };
            setTimeout(() => {
                axios
                    .post('https://7732-113-160-14-39.ngrok-free.app/user/register', data)
                    .then((response) => {
                        if (response.status === 200) {
                            setUser(response.data.user);
                            setEmail('');
                            setName('');
                            setPassword('');
                            setValidEmail(false);
                            setValidName(false);
                            setShowVerify(true);
                        } else {
                            setType('warn');
                            setText(response.data.message);
                        }
                    })
                    .catch((error) => {
                        if (error.response) {
                            setType('warn');
                            setText(error.response.data.message);
                        } else if (error.request) {
                            setType('error');
                            setText('Network error. Please check your internet connection.');
                        } else {
                            setType('error');
                            setText('An unexpected error occurred. Please try again later.');
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }, 1000);
        } else {
            setLoading(false);
            setType('warn');
            setText('Vui lòng nhập đầy đủ thông tin!');
            setShowNotice(true);
        }
    };

    const handleBack = () => {
        navigation.navigate('OptionLogin');
    };

    const handleToLogin = () => {
        navigation.navigate('Login', { address: 'Register' });
    };

    const handleClick = () => {
        navigation.navigate('Home', { user: null, prevAddress: 'Register' });
    };

    const handleTouchOutside = () => {
        Keyboard.dismiss();
    };

    if (!fontLoaded) {
        return null;
    }
    if (showNotice) {
        setTimeout(() => {
            setShowNotice(false);
        }, 2000);
    }

    return (
        <View style={styles.container}>
            <Modal transparent visible={showNotice} animationType="fade">
                <Notice type={typeNotice} text={textNotice} />
            </Modal>
            <Modal transparent visible={false} animationType="slide">
                <View style={styles.containerVerify}>
                    <VerifyEmail user={user} navigation={navigation} closeModal={() => setShowVerify(false)} />
                </View>
            </Modal>
            <Modal transparent visible={isLoading} animationType="slide">
                <View style={styles.containerLoading}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.textVerify}>Đang đăng ký...</Text>
                </View>
            </Modal>
            <TouchableWithoutFeedback onPress={handleTouchOutside}>
                <ImageBackground source={image} resizeMode="cover" style={styles.imgBackground} blurRadius={16}>
                    <View style={styles.form}>
                        <TextInput
                            style={[styles.input, blurName ? { borderColor: '#2eb886', borderWidth: 1.5 } : {}]}
                            placeholder="Tên"
                            value={username}
                            onChangeText={(text) => onChangName(text)}
                            placeholderTextColor={'#212121'}
                            onBlur={() => setBlurName(false)}
                            onFocus={() => setBlurName(true)}
                        />
                        {validName ? (
                            <View style={styles.ctnValidName}>
                                <FontAwesomeIcon icon={faCheck} color="#458e6e" />
                            </View>
                        ) : (
                            ''
                        )}
                        <TextInput
                            style={[styles.input, blurEmail ? { borderColor: '#2eb886', borderWidth: 1.5 } : {}]}
                            placeholder="Email"
                            value={email}
                            onChangeText={(mail) => onChangeMail(mail)}
                            placeholderTextColor={'#212121'}
                            onBlur={() => setBlurEmail(false)}
                            onFocus={() => setBlurEmail(true)}
                        />
                        {validEmail ? (
                            <View style={styles.ctnValidEmail}>
                                <FontAwesomeIcon icon={faCheck} color="#458e6e" />
                            </View>
                        ) : (
                            ''
                        )}
                        {email.length > 0 && !validEmail ? (
                            <Text style={styles.error}>Email này không hợp lệ.</Text>
                        ) : (
                            ''
                        )}
                        <TextInput
                            style={[styles.input, blurPass ? { borderColor: '#2eb886', borderWidth: 1.5 } : {}]}
                            placeholder="Mật khẩu"
                            value={password}
                            onChangeText={(pass) => onChangePass(pass)}
                            placeholderTextColor={'#212121'}
                            secureTextEntry={true}
                            onBlur={() => setBlurPass(false)}
                            onFocus={() => setBlurPass(true)}
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
            </TouchableWithoutFeedback>
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
