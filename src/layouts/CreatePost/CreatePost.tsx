import { useFonts } from 'expo-font';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageStyle,
    Keyboard,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import styles from './style';
import axios from 'axios';
const userImage = require('../../../assets/images/user.png');
const camara = require('../../../assets/images/camera.png');

type Func = {
    cancel: () => void;
    user: any;
};

interface ImageInterface {
    uri: string;
    width: number;
    height: number;
}

const CreatePost: React.FC<Func> = ({ cancel, user }) => {
    const textInputRef = useRef<TextInput>(null);
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const [valueText, setValueText] = useState('');
    const [imgList, setListImg] = useState<ImageInterface[]>([]);
    const [uri, setUri] = useState<object[]>([]);
    const { width: deviceWidth } = Dimensions.get('window');
    const { height: deviceHeight } = Dimensions.get('window');

    useEffect(() => {
        textInputRef.current?.focus();
    }, []);

    if (!fontLoaded) {
        return null;
    }

    const handlePostImg = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                // allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const uri: ImageInterface = {
                    uri: result.assets[0].uri,
                    width: result.assets[0].width,
                    height: result.assets[0].height,
                };
                const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                const objectImage = {
                    uri: base64,
                    type: result.assets[0].type,
                };
                setUri((prev) => [...prev, objectImage]);
                setListImg((prev) => [...prev, uri]);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const renderImage = imgList.map((img: ImageInterface, index: number) => {
        return (
            <Image
                source={{ uri: img.uri }}
                resizeMode="cover"
                style={{
                    width: imgList.length === 1 ? deviceWidth : deviceWidth / 2,
                    height: imgList.length === 1 ? deviceHeight : deviceHeight / 2,
                }}
                key={index}
            />
        );
    });

    const handlePost = () => {
        const dataPost = {
            content: valueText,
            imgDes: uri,
            author: user._id,
        };
        axios
            .post('http://192.168.34.109:3056/user/community/post', dataPost)
            .then((response) => {
                if (response.status === 200) {
                    Alert.alert(response.data.message);
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
            .finally(() => {
                cancel();
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{ paddingHorizontal: 4, paddingVertical: 4, marginLeft: -4 }} onPress={cancel}>
                    <FontAwesomeIcon icon={faXmark} size={24} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Đăng bài</Text>

                {valueText ? (
                    <TouchableOpacity style={[styles.btnPost, { backgroundColor: '#2099ee' }]} onPress={handlePost}>
                        <Text style={[styles.textBtn, { color: '#fff' }]}>Đăng</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.btnPost}>
                        <Text style={styles.textBtn}>Đăng</Text>
                    </View>
                )}
            </View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} bounces={false}>
                    <View style={styles.ctnBody}>
                        <View style={styles.ctnUser}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={user.img ? user.img : userImage}
                                    resizeMode="cover"
                                    style={styles.imgUser as ImageStyle}
                                />
                                <View style={styles.ctnInfor}>
                                    <Text style={styles.textName}>{user.username}</Text>
                                    <View style={styles.ctnRole}>
                                        <Text style={styles.textRole}>Thành viên</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={{ padding: 4 }} onPress={handlePostImg}>
                                <Image source={camara} style={{ width: 28, height: 28 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.ctnInput}>
                            <TextInput
                                ref={textInputRef}
                                placeholder="Đặt câu hỏi cho cộng đồng..."
                                placeholderTextColor={'#65676b'}
                                style={styles.input}
                                numberOfLines={4}
                                multiline
                                onChangeText={(text) => setValueText(text)}
                            />
                        </View>
                        <View style={styles.ctnImage}>{imgList.length > 0 ? renderImage : ''}</View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default CreatePost;
