import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { useFonts } from 'expo-font';
const userImage = require('../../../assets/images/user.png');

type Func = {
    cancel: () => void;
};

const CreatePost: React.FC<Func> = ({ cancel }) => {
    const textInputRef = useRef<TextInput>(null);
    // const [heightKeyBoard, setHeightKeyboard] = useState(0);
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const [valueText, setValueText] = useState('');

    useEffect(() => {
        textInputRef.current?.focus();
        // const keyboardDidShowListener = Keyboard.addListener(
        //     Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
        //     (event) => {
        //       setHeightKeyboard(event.endCoordinates.height);
        //     }
        //   );

        //   // Clean up listeners on component unmount
        //   return () => {
        //     keyboardDidShowListener.remove();
        //   };
    }, []);

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{ paddingHorizontal: 4, paddingVertical: 4, marginLeft: -4 }} onPress={cancel}>
                    <FontAwesomeIcon icon={faXmark} size={24} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Đăng bài</Text>

                <TouchableOpacity style={[styles.btnPost, valueText ? { backgroundColor: '#2099ee' } : {}]}>
                    <Text style={[styles.textBtn, valueText ? { color: '#fff' } : {}]}>Đăng</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.ctnUser}>
                <Image source={userImage} resizeMode="cover" style={styles.imgUser} />
                <View style={styles.ctnInfor}>
                    <Text style={styles.textName}>Bad liar</Text>
                    <View style={styles.ctnRole}>
                        <Text style={styles.textRole}>Thành viên</Text>
                    </View>
                </View>
            </View>

            <View style={styles.ctnInput}>
                <TextInput
                    ref={textInputRef}
                    placeholder="Đặt câu hỏi cho cộng đồng..."
                    placeholderTextColor={'#65676b'}
                    style={styles.input}
                    numberOfLines={4}
                    onChangeText={(text) => setValueText(text)}
                />
            </View>
        </View>
    );
};

export default CreatePost;
