import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
const image = require('../../../assets/images/option_login.jpg');
const facebook = require('../../../assets/images/facebook.png');

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const OptionLogin: React.FC<Navigation> = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        Other: require('../../../assets/fonts/Inconsolata_Condensed-Bold.ttf'),
        Inconsolata: require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const handleClick = () => {
        navigation.navigate('Register');
    };

    const handleToLogin = () => {
        navigation.navigate('Login');
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} blurRadius={16} style={styles.backgroundVideo}>
                <View style={styles.content}>
                    <Text style={styles.textSignUp}>Đăng ký</Text>
                    <Text style={styles.text}>để khám phá tất cả các công thức và toàn bộ tính năng của chúng tôi</Text>

                    <TouchableOpacity style={styles.btnApple}>
                        <FontAwesomeIcon icon={faApple} style={styles.iconApple} />
                        <Text style={styles.textApple}>Đăng ký với Apple</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnFacebook}>
                        <Image source={facebook} style={styles.imgIcon} />
                        <Text style={styles.textFacebook}>Đăng ký với Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnEmail} onPress={handleClick}>
                        <Text style={styles.textFacebook}>Đăng ký với Email</Text>
                    </TouchableOpacity>

                    <Text style={styles.textRole}>
                        Bằng cách đăng ký, tôi chấp nhận các điều khoản sử dụng
                        <Text> </Text>
                        và
                        <Text> </Text>
                        <Text style={styles.textUnderline}>chính sách bảo mật dữ liệu</Text>
                        <Text>.</Text>
                    </Text>

                    <View style={styles.footer}>
                        <Text style={styles.checkAccount}>Bạn đã có tài khoản?</Text>
                        <TouchableOpacity onPress={handleToLogin}>
                            <Text style={styles.linkLogin}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.textSkip}>Bỏ qua</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OptionLogin;
