import React, { useState } from 'react';
import {
    Alert,
    Image,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const camera = require('../../../assets/images/camera.png');
const userImage = require('../../../assets/images/user.png');

type FuncCancel = {
    cancelFunc: () => void;
    updateRating: (rating: any) => void;
    user: any;
    idDish: string;
};

const FormRating: React.FC<FuncCancel> = ({ cancelFunc, user, idDish, updateRating }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [uri, setUri] = useState('');
    const [img, setImg] = useState<object>({
        uri: '',
        type: '',
    });

    const handleRating = (value: number) => {
        if (value === 1 && rating === 1) {
            setRating(0);
        } else {
            setRating(value);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleUploadImg = async () => {
        try {
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
                const objectImage = {
                    uri: base64,
                    type: result.assets[0].type,
                };
                setImg(objectImage);
                setUri(result.assets[0].uri);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const handleSubmit = () => {
        if (rating === 0) {
            return;
        } else {
            axios
                .post('http:192.168.34.109:3056/rating-dish/create', {
                    idMonAn: idDish,
                    idNguoiDung: user._id,
                    diemDanhGia: rating,
                    img: img,
                    noiDung: content,
                })
                .then((response) => {
                    if (response.status === 200) {
                        updateRating(response.data);
                    } else {
                        Alert.alert(response.data.message);
                    }
                })
                .catch((err) => {
                    Alert.alert(err.message);
                })
                .finally(() => {
                    cancelFunc();
                });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.ctnHeader}>
                    <TouchableOpacity style={styles.btnCancel} onPress={cancelFunc}>
                        <Text style={[styles.textIn, { color: '#fc642d' }]}>Thoát</Text>
                    </TouchableOpacity>

                    <Text style={styles.textHeader}>Đánh giá</Text>

                    <TouchableOpacity style={styles.btnCancel} onPress={rating > 0 ? handleSubmit : () => {}}>
                        <Text style={[styles.textIn, { color: rating > 0 ? '#fc642d' : '#686868' }]}>Gửi</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.textHeader, { textAlign: 'center' }]}>Bạn đã thử nó? Đưa ra đánh giá!</Text>

                <View style={styles.ctnRating}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                            <Text
                                style={{
                                    color: rating >= value ? 'gold' : 'gray',
                                    fontSize: 28,
                                    marginHorizontal: 6,
                                }}
                            >
                                &#9733;
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.textInMedium}>
                    Bạn có phản hồi hoặc lời khuyên về công thức này chi tiết hơn cho cộng đồng của chúng tôi? Hãy chia
                    sẻ nó bên dưới.
                </Text>

                <View style={styles.ctnItem}>
                    <View style={styles.ctnComment}>
                        <View style={styles.userComment}>
                            <Image
                                source={user.img ? { uri: user.img } : userImage}
                                resizeMode="cover"
                                style={styles.imgUserCmt}
                            />
                            <Text style={styles.username}>{user.username}</Text>
                        </View>

                        <View style={styles.ctnTextCmt}>
                            <TextInput
                                editable
                                multiline
                                placeholder="Ừm! Tôi đã thêm một chút...(tùy chọn)"
                                placeholderTextColor={'#868686'}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChangeText={(text) => setContent(text)}
                                style={[styles.textCmt, isFocused && styles.focusInput]}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingTop: 8,
                                borderTopColor: '#ccc',
                                borderTopWidth: 0.8,
                            }}
                        >
                            <TouchableOpacity
                                style={{ width: 40, padding: 8, marginRight: 12 }}
                                onPress={handleUploadImg}
                            >
                                <Image source={camera} resizeMode="contain" style={{ width: 32, height: 32 }} />
                            </TouchableOpacity>
                            {uri !== '' && (
                                <View style={{ marginRight: 8 }}>
                                    <Image source={{ uri: uri }} resizeMode="cover" style={styles.imgPost} />
                                    <TouchableOpacity style={styles.iconXMark} onPress={() => setUri('')}>
                                        <FontAwesomeIcon icon={faXmark} size={14} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default FormRating;
