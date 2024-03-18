import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

import styles from './style';
const iconSend = require('../../../assets/images/paper-plane.png');
const camera = require('../../../assets/images/camera.png');
import Comment from '../../components/CommentRecipe/CommentRecipe';

type Func = {
    cancel: () => void;
};

const ComentRecipe: React.FC<Func> = ({ cancel }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const textInputRef = useRef<TextInput>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [valueText, setValueText] = useState('');
    const [heightKeyboard, setHeightKeyboard] = useState(0);
    const [image, setImage] = useState('');

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
            (event) => {
                setHeightKeyboard(event.endCoordinates.height);
            },
        );

        // Clean up listeners on component unmount
        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        };
    }

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.ctnHeader}>
                <TouchableOpacity style={styles.ctnBack} onPress={cancel}>
                    <FontAwesomeIcon icon={faChevronLeft} size={20} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Bình luận & Đánh giá</Text>
                <View></View>
            </View>

            <ScrollView
                style={styles.ctnComment}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
            >
                 {
                    image && <Image source={{uri: image}} style = {{width: 60, height: 60}} resizeMode='cover'/>
                }
                <Comment
                    name={'Bad liar'}
                    time={4}
                    rating={4}
                    content={'Công thức nấu ăn rất tuyệt 😍'}
                    like={8}
                    img={false}
                />
                <Comment
                    name={'Bùi Quang Tuấn'}
                    time={6}
                    rating={4}
                    content={'Công thức nấu ăn rất dễ nấu và cũng rất ngon!'}
                    like={4}
                    img={true}
                />
            </ScrollView>

            <View style={[styles.ctnInputComment, isFocus ? { bottom: heightKeyboard } : {}]}>
                <TouchableOpacity style={{ width: 40, padding: 8, marginLeft: -8 }} onPress={pickImage}>
                    <Image source={camera} resizeMode="contain" style={{ width: 32, height: 32 }} />
                </TouchableOpacity>
                <TextInput
                    placeholder="Viết bình luận"
                    numberOfLines={2}
                    placeholderTextColor={'#212121'}
                    style={styles.input}
                    ref={textInputRef}
                    onFocus={() => {
                        setIsFocus(true);
                    }}
                    onBlur={() => {
                        setIsFocus(false);
                    }}
                    onChangeText={(value) => {
                        setValueText(value);
                    }}
                />
                {valueText.length > 0 ? (
                    <TouchableOpacity style={{ padding: 4, marginRight: -4 }}>
                        <Image source={iconSend} resizeMode="cover" style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                ) : (
                    ''
                )}
            </View>
        </View>
    );
};

export default ComentRecipe;
