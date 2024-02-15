import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Image, ImageBackground, ScrollView, Text, 
    TextInput, TouchableOpacity, View
} from "react-native";
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import app from '../../../firebaseconfig.js';
import { User } from '@firebase/auth';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

import styles from './styles';
const facebook = require('../../../assets/images/facebook.png');
const imgBackground = require('../../../assets/images/login_bg.jpeg');

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
}

const Login : React.FC<Navigation> = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);

    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);
    const handleLogin = async() =>{
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
                
            
        } catch (error:any) {
            // setErrorMessage('Sai email hoặc mật khẩu. Vui lòng thử lại.');
            console.error('Login error:', error.message);
        }finally {
            setLoading(false);
        }
    }
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const handleBack = () => {
        navigation.navigate('OptionLogin');
    };
    const handleToRegister = () => {
        navigation.navigate("Register");
    };
    
    if (!fontLoaded) {
        return null;
    }

    return (
        <View style = {styles.container}>
            <ImageBackground
                source={imgBackground}
                style = {styles.backgroundVideo}
                blurRadius={16}
                resizeMode='cover'
            >
                <View style={styles.header}>
                    <View>
                        <TouchableOpacity onPress={handleBack}>
                            <FontAwesomeIcon icon={faChevronLeft} size={20} color="#da7e4f" style={{ padding: 4 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textRegister}>Đăng nhập</Text>
                    <TouchableOpacity>
                        <Text style={styles.textSkip}>Bỏ qua</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView 
                    style = {styles.content} 
                    showsVerticalScrollIndicator = {false}
                    bounces = {false}
                >
                    <View>
                        <TouchableOpacity style={styles.btnApple}>
                            <FontAwesomeIcon icon={faApple} style={styles.iconApple} size={18}/>
                            <Text style={styles.textApple}>Đăng ký với Apple</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnFacebook}>
                            <Image source={facebook} style = {styles.imgIcon}/>
                            <Text style={styles.textFacebook}>Đăng ký với Facebook</Text>
                        </TouchableOpacity>

                        <View style = {styles.separate}>
                            <View style = {styles.item}></View>
                            <Text style = {styles.textOr}>hoặc</Text>
                            <View style = {styles.item}></View>
                        </View>

                        <View style = {styles.form}>
                            <TextInput
                                style = {styles.input}
                                placeholder='Email'
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor={'#212121'}
                            />

                            <TextInput
                                style = {styles.input} 
                                placeholder='Mật khẩu'
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={'#212121'}
                                secureTextEntry
                            />

                            <View style = {styles.iconEye}>
                                <TouchableOpacity>
                                    <FontAwesomeIcon icon = {faEye}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.btnLogin}>
                            <Text style={styles.textBtnLogin} onPress={handleLogin}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Text>
                        </TouchableOpacity>
                        

                        <View style = {styles.resetPass}>
                            <Text style = {styles.textReset}>Bạn quên mật khẩu?</Text>
                            <TouchableOpacity>
                                <Text style = {styles.btnReset}>Lấy lại mật khẩu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style = {styles.paging}></View>

                    <View style = {styles.resetPass}>
                        <Text style = {styles.textReset}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={handleToRegister}>
                            <Text style = {styles.btnReset}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export default Login;

function setErrorMessage(arg0: string) {
    throw new Error('Function not implemented.');
}
