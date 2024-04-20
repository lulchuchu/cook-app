import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Keyboard,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import styles from './style';
import { useFonts } from 'expo-font';
import axios from 'axios';
const verify = require('../../../assets/images/verified.png');

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

type Props = {
    user: UserInterface;
    navigation: any;
    closeModal: () => void;
};

const VerifyEmail: React.FC<Props> = ({ user, navigation, closeModal }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata_Condensed-Medium.ttf'),
    });

    useEffect(() => {}, [fontLoaded]);

    if (!fontLoaded) {
        return null;
    }

    const inputs = Array(4).fill(null);
    const refs = inputs.map(() => useRef<TextInput>(null));
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState<string[]>([]);
    const [showTime, setShowTime] = useState(false);
    const [modalSendCode, setModal] = useState(false);
    const [time, setTime] = useState(60);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (showTime && time > 0) {
            intervalId.current! = setInterval(() => {
                setTime((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else {
            clearInterval(intervalId.current!);
        }

        if (time === 0) {
            setShowTime(false);
        }

        return () => clearInterval(intervalId.current!);
    }, [showTime, time]);

    const handleChangeText = (text: string, index: number) => {
        if (text.length === 1 && index < 3) {
            setCode((prevCode) => [...prevCode, text]);
            refs[index + 1].current?.focus();
        } else if (text.length === 0 && index > 0) {
            setCode((prevCode) => prevCode.slice(0, index));
            refs[index - 1].current?.focus();
        } else if (index === 0) {
            setCode([]);
        } else {
            setCode((prevCode) => [...prevCode, text]);
        }
    };

    const handleSendMail = () => {
        setModal(true);
        axios
            .post('http://192.168.34.109:3056/user/send/mail', {
                email: user.email,
            })
            .then((response) => {
                if (response.data.message === 'Email sent successfully') {
                    setShowTime(true);
                } else {
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
            })
            .finally(() => setModal(false));
    };

    const handleSubmit = () => {
        setShowModal(true);
        const codeVerify = parseInt(code.join(''));
        if (codeVerify > 1000) {
            axios
                .post('http://192.168.34.109:3056/user/verify/email', {
                    code: codeVerify,
                    email: user.email,
                })
                .then((response) => {
                    if (response.status === 200) {
                        closeModal();
                        navigation.navigate('Home', { user: user, prevAddress: 'Register' });
                    } else {
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
                })
                .finally(() => setShowModal(false));
        } else {
            setShowModal(false);
            Alert.alert('Vui lòng nhập đủ mã xác minh!');
        }
    };

    const handleClose = () => {
        closeModal();
        navigation.navigate('Home', { user: user, prevAddress: 'Register' });
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Modal transparent visible={showModal} animationType="slide">
                    <View style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={styles.textVerify}>Đang xác minh...</Text>
                    </View>
                </Modal>
                <Modal transparent visible={modalSendCode} animationType="slide">
                    <View style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={styles.textVerify}>Đang gửi mã...</Text>
                    </View>
                </Modal>
                <View style={styles.header}>
                    <View></View>
                    <Text style={styles.textHeader}>Xác minh Email</Text>

                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <FontAwesomeIcon icon={faXmark} size={20} color="#65676b" />
                    </TouchableOpacity>
                </View>

                <View style={styles.ctnbody}>
                    <Text style={styles.textBody}>
                        Để đảm bảo rằng email bạn đăng ký còn đang hoạt động và để sử dụng cho các hoạt động trên ứng
                        dụng này, chúng tôi sẽ gửi đến email của bạn một mã xác minh.
                    </Text>
                    <Image source={verify} resizeMode="contain" style={styles.img} />
                    <Text style={styles.textIn}>Nhập mã xác minh tại đây</Text>
                    <View style={styles.ctnInput}>
                        {inputs.map((value: number, index: number) => (
                            <TextInput
                                style={styles.input}
                                key={index}
                                maxLength={1}
                                ref={refs[index]}
                                onChangeText={(text) => handleChangeText(text, index)}
                            />
                        ))}
                    </View>
                    <Text style={styles.time}>{showTime ? `${time} s` : ''}</Text>
                </View>

                <View style={styles.ctnFooter}>
                    <TouchableOpacity style={styles.btnVerify} onPress={handleSendMail}>
                        <Text style={styles.textVerify}>Lấy mã</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnVerify} onPress={handleSubmit}>
                        <Text style={styles.textVerify}>Xác minh</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default VerifyEmail;
