import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import axios from 'axios';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { RouteProp } from '@react-navigation/native';
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import styles from './styles';
import Notice from '../../components/NoticeForm/Notice';
const facebook = require('../../../assets/images/facebook.png');
const imgBackground = require('../../../assets/images/login_bg.jpeg');

type Route = RouteProp<RootStackParamList, 'Login'>;

interface Navigation {
    navigation: StackNavigationProp<RootStackParamList>;
    route: Route;
}

const Login: React.FC<Navigation> = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHide] = useState(true);
    const [loading, setLoading] = useState(false);

    const [blurEmail, setBlurEmail] = useState(false);
    const [blurPass, setBlurPass] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPass, setValiddPass] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errPass, setErrPass] = useState(false);

    const [typeNotice, setType] = useState('');
    const [textNotice, setText] = useState('');
    const [showNotice, setShowNotice] = useState(false);

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const handleBack = () => {
        navigation.goBack();
    };
    const handleToRegister = () => {
        navigation.navigate('Register');
    };

    const onChangeEmail = (mail: string) => {
        setEmail(mail);
        if (mail.length > 0 && mail.includes('@gmail.com')) {
            setValidEmail(true);
            setErrEmail(false);
        } else {
            setValidEmail(false);
        }
    };

    const onChangePass = (pass: string) => {
        setPassword(pass);
        if (pass.length >= 8) {
            setValiddPass(true);
            setErrPass(false);
        } else {
            setValiddPass(false);
        }
    };

    const handleLogin = () => {
        setLoading(true);

        if (validEmail && validPass) {
            const data = { email, password };
            setTimeout(() => {
                axios
                    .post('http://192.168.34.109:3056/user/login', data, { timeout: 1000 })
                    .then((response) => {
                        if (response.status === 200) {
                            setText('Bạn đã đăng nhập thành công!');
                            navigation.navigate('Home', { user: response.data.user, prevAddress: 'Login' });
                        } else {
                            setType('error');
                            setText(response.data.message);
                        }
                    })
                    .catch((error) => {
                        if (error.response) {
                            setType('error');
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
                        setShowNotice(true);
                    });
            }, 1000);
        } else if (validEmail && !validPass) {
            setLoading(false);
            setErrEmail(false);
            setErrPass(true);
        } else if (!validEmail && validPass) {
            setLoading(false);
            setErrEmail(true);
            setErrPass(false);
        } else {
            setLoading(false);
            setErrEmail(true);
            setErrPass(true);
        }
    };

    if (loading) {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    if (showNotice) {
        setTimeout(() => {
            setShowNotice(false);
        }, 3000);
    }

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Modal transparent visible={showNotice} animationType="fade">
                <Notice type={typeNotice} text={textNotice} />
            </Modal>
            <Modal transparent visible={loading} animationType="slide">
                <View style={styles.containerLoading}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.textBtnLogin}>Đang đăng nhập...</Text>
                </View>
            </Modal>

            <ImageBackground source={imgBackground} style={styles.backgroundVideo} blurRadius={16} resizeMode="cover">
                <View style={styles.header}>
                    <View>
                        <TouchableOpacity onPress={handleBack}>
                            <FontAwesomeIcon icon={faChevronLeft} size={20} color="#da7e4f" style={{ padding: 4 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textRegister}>Đăng nhập</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home', { user: null, prevAddress: 'Login' })}>
                        <Text style={styles.textSkip}>Bỏ qua</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false} bounces={false}>
                    <View>
                        <TouchableOpacity style={styles.btnApple}>
                            <FontAwesomeIcon icon={faApple} style={styles.iconApple} size={18} />
                            <Text style={styles.textApple}>Đăng ký với Apple</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnFacebook}>
                            <Image source={facebook} style={styles.imgIcon} />
                            <Text style={styles.textFacebook}>Đăng ký với Facebook</Text>
                        </TouchableOpacity>

                        <View style={styles.separate}>
                            <View style={styles.item}></View>
                            <Text style={styles.textOr}>hoặc</Text>
                            <View style={styles.item}></View>
                        </View>

                        <View style={styles.form}>
                            <TextInput
                                style={[
                                    styles.input,
                                    blurEmail
                                        ? { borderColor: '#2eb886', borderWidth: 1 }
                                        : errEmail
                                          ? { borderColor: '#ff4500', borderWidth: 1 }
                                          : {},
                                ]}
                                placeholder="Email"
                                value={email}
                                onChangeText={(text) => onChangeEmail(text)}
                                placeholderTextColor={'#212121'}
                                onBlur={() => setBlurEmail(false)}
                                onFocus={() => setBlurEmail(true)}
                            />

                            <View style={{ height: 20 }}>
                                {errEmail && <Text style={styles.textError}>Email chưa hợp lệ!</Text>}
                            </View>

                            {validEmail && (
                                <View style={styles.ctnValidEmail}>
                                    <FontAwesomeIcon icon={faCheck} color="#458e6e" />
                                </View>
                            )}

                            <TextInput
                                style={[
                                    styles.input,
                                    blurPass
                                        ? { borderColor: '#2eb886', borderWidth: 1 }
                                        : errPass
                                          ? { borderColor: '#ff4500', borderWidth: 1 }
                                          : {},
                                ]}
                                placeholder="Mật khẩu"
                                value={password}
                                onChangeText={(pass) => onChangePass(pass)}
                                placeholderTextColor={'#212121'}
                                secureTextEntry={hidePassword}
                                onBlur={() => setBlurPass(false)}
                                onFocus={() => setBlurPass(true)}
                            />

                            <View style={styles.iconEye}>
                                <TouchableOpacity
                                    onPress={() => setHide(!hidePassword)}
                                    style={{
                                        padding: 4,
                                        marginRight: -4,
                                        marginTop: -4,
                                    }}
                                >
                                    <FontAwesomeIcon icon={hidePassword ? faEye : faEyeSlash} />
                                </TouchableOpacity>
                            </View>

                            <View>{errPass && <Text style={styles.textError}>Mật khẩu phải từ 8 ký tự!</Text>}</View>
                        </View>

                        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                            <Text style={styles.textBtnLogin}>Đăng nhập</Text>
                        </TouchableOpacity>

                        <View style={styles.resetPass}>
                            <Text style={styles.textReset}>Bạn quên mật khẩu?</Text>
                            <TouchableOpacity>
                                <Text style={styles.btnReset}>Lấy lại mật khẩu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.paging}></View>

                    <View style={styles.resetPass}>
                        <Text style={styles.textReset}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={handleToRegister}>
                            <Text style={styles.btnReset}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export default Login;
