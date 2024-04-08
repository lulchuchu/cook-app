import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, Keyboard, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import styles from './style';
const iconSend = require('../../../assets/images/paper-plane.png');
const camera = require('../../../assets/images/camera.png');
import Comment from '../../components/CommentDish/CommentDish';
import axios from 'axios';

type Func = {
    cancel: () => void;
    idDish: string;
    user: any;
    data: Comment[];
    updateCmt: (cmt: Comment) => void;
};

interface User {
    _id: string;
    username: string;
    img: string;
}

interface Comment {
    _id: string;
    idDish: string;
    user: User;
    content: string;
    img: string;
    likes: string[];
    createdAt: string;
}

const DiscussDish: React.FC<Func> = ({ cancel, idDish, user, data, updateCmt }) => {
    const textInputRef = useRef<TextInput>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [valueText, setValueText] = useState('');
    const [heightKeyboard, setHeightKeyboard] = useState(0);
    const [image, setImage] = useState('');
    const [uri, setUri] = useState<object>({
        uri: '',
        type: '',
    });
    const [listCmt, setListCmt] = useState<Comment[]>(data);

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
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setUri({ uri: base64, type: result.assets[0].type });
            setImage(result.assets[0].uri);
        }
    };
    const handlePostCmt = () => {
        axios
            .post('http://192.168.34.109:3056/comment-dish/create', {
                idDish: idDish,
                idUser: user._id,
                content: valueText,
                img: uri,
            })
            .then((response) => {
                if (response.status === 200) {
                    var arr = Array.from(listCmt);
                    var data = response.data;
                    data['user'] = {
                        _id: user._id,
                        img: user.img,
                        username: user.username,
                    };
                    setListCmt([data, ...arr]);
                    setValueText('');
                    setIsFocus(false);
                    Keyboard.dismiss();
                    updateCmt(data);
                    setImage('');
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
            });
    };

    const renderComment = listCmt.map((cmt: Comment, index: number) => {
        return (
            <Comment
                user={cmt.user}
                time={cmt.createdAt}
                content={cmt.content}
                like={cmt.likes.length}
                img={cmt.img}
                key={index}
                _id={cmt._id}
            />
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.ctnHeader}>
                <TouchableOpacity style={styles.ctnBack} onPress={cancel}>
                    <FontAwesomeIcon icon={faChevronLeft} size={20} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Bình luận</Text>
                <View></View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
                ref={scrollViewRef}
            >
                <View style={styles.ctnComment}>
                    {listCmt.length > 0 ? (
                        renderComment
                    ) : (
                        <Text
                            style={{
                                fontFamily: 'Inconsolata-Medium',
                                fontSize: 18,
                                textAlign: 'center',
                                marginTop: 20,
                            }}
                        >
                            Chưa có bình luận nào!
                        </Text>
                    )}
                </View>
            </ScrollView>

            <View style={[styles.ctnInputComment, isFocus ? { bottom: heightKeyboard } : {}]}>
                {image !== '' && (
                    <View>
                        <Image source={{ uri: image }} resizeMode="cover" style={styles.imgPost} />
                        <TouchableOpacity style={styles.iconXMark} onPress={() => setImage('')}>
                            <FontAwesomeIcon icon={faXmark} size={14} />
                        </TouchableOpacity>
                    </View>
                )}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: 40, padding: 8, marginLeft: -8 }} onPress={pickImage}>
                        <Image source={camera} resizeMode="contain" style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Viết bình luận"
                        numberOfLines={2}
                        placeholderTextColor={'#212121'}
                        style={styles.input}
                        ref={textInputRef}
                        value={valueText}
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
                    {valueText.length > 0 || image !== '' ? (
                        <TouchableOpacity style={{ padding: 4, marginRight: -4, marginTop: 4 }} onPress={handlePostCmt}>
                            <Image source={iconSend} resizeMode="cover" style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    ) : (
                        ''
                    )}
                </View>
            </View>
        </View>
    );
};

export default DiscussDish;
