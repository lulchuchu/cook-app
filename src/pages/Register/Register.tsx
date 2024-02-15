import React, { useEffect, useState } from 'react';
import { ImageBackground, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import app from '../../../firebaseconfig.js';
import { User } from '@firebase/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

import styles from './styles';
import { useFonts } from 'expo-font';
const image = require('../../../assets/images/food-1898194_640.jpg');

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Register: React.FC<Navigation> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const auth = getAuth(app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);
    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsSuccessModalVisible(true);
        } catch (error: any) {
            if (error.code === 'auth/weak-password') {
                setErrorMessage('Mật khẩu quá yếu. Vui lòng chọn mật khẩu dài hơn 6 ký tự.');
                setShowModal(true);
              } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('Email không hợp lệ. Vui lòng nhập lại.');
                setShowModal(true);
              } else {
                console.error('Authentication error:', error.message);
              }
            
        }
    };
    const handleCloseSuccessModal = () => {
        setIsSuccessModalVisible(false);
        navigation.navigate('Home');
    };
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
                        value={email}
                        onChangeText={setEmail}
                        textContentType="emailAddress"
                        placeholderTextColor={'#212121'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        value={password}
                        onChangeText={setPassword}
                        textContentType="password"
                        placeholderTextColor={'#212121'}
                    />
                    <Modal visible={showModal} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text>{errorMessage}</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Text style={styles.closeButton}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isSuccessModalVisible}
                        onRequestClose={() => setIsSuccessModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.successMessage}>Đăng ký thành công!</Text>
                                <TouchableOpacity onPress={handleCloseSuccessModal}>
                                    <Text style={styles.closeButton}>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View>
                        <TouchableOpacity style={styles.btnRegister}>
                            <Text style={styles.textBtnRegister} onPress={handleRegister}>Đăng ký</Text>
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
