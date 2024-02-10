import React from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import styles from './styles';
import { useFonts } from 'expo-font';
const image = require('../../../assets/images/food-1898194_640.jpg');

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Register: React.FC<Navigation> = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const handleBack = () => {
        navigation.navigate('OptionLogin');
    };

    const handleToLogin = () => {
        navigation.navigate('Login');
    }

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imgBackground} blurRadius={16}>
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Tên" placeholderTextColor={'#212121'} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        textContentType="emailAddress"
                        placeholderTextColor={'#212121'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        textContentType="password"
                        placeholderTextColor={'#212121'}
                    />

                    <View>
                        <TouchableOpacity style={styles.btnRegister}>
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
                <TouchableOpacity>
                    <Text style={styles.textSkip}>Bỏ qua</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;
