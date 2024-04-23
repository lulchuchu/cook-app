import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useFonts } from 'expo-font';
import {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faEllipsis, faShare, faXmark, faThumbsUp as Like } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import styles from './style';
import Comment from '../../components/Comment/Comment';
import countTime from '../../util/CountTime';
import Photo from 'layouts/Photo/Photo';

const iconSend = require('../../../assets/images/paper-plane.png');
const iconLike = require('../../../assets/images/facebook-reactions.png');
const userImage = require('../../../assets/images/user.png');
const camera = require('../../../assets/images/camera.png');

type Func = {
    func: () => void;
    user: any;
    dataPost: any;
    updatePostItem: (idCmt: string) => void;
    updateLikePost: (idUser: string, 
        idBlog: string, 
        state: string) => void;
};

interface UserCommentInterface {
    _id: string;
    username: string;
    img: string;
}

interface CommentInterface {
    _id: string;
    author: UserCommentInterface;
    content: string;
    likes: string[];
    timeCreate: string;
    img: string;
}

const CommentPost: React.FC<Func> = ({ func, user, dataPost, updatePostItem, updateLikePost }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const scrollViewRef = useRef<ScrollView>(null);
    const textInputRef = useRef<TextInput>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [valueText, setValueText] = useState('');
    const [heightKeyboard, setHeightKeyboard] = useState(0);
    const [numberLike, setNumberLike] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [height, setHeight] = useState(0);
    const [time, setTime] = useState('');
    const { width: deviceWidth } = Dimensions.get('window');
    const [numberShare, setNumberShare] = useState(dataPost.numberShare);
    const [cmtList, setCmtList] = useState<CommentInterface[]>([]);
    const [uriImage, setUriImage] = useState('');
    const [objectImage, setObjectImage] = useState({
        uri: '',
        type: 'png'
    });
    const [modalPhoto, setModalPhoto] = useState(false);

    useEffect(() => {
        if (dataPost.accountLike.includes(user._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
        setNumberLike(dataPost.accountLike.length);
    }, []);

    const handleLike = async () => {
        setIsLike(!isLike);
        if (isLike) {
            setNumberLike(numberLike - 1);
            updateLikePost(user._id, dataPost._id, 'unlike');
            await axios.post('https://7732-113-160-14-39.ngrok-free.app/user/community/dislike', {
                idBlog: dataPost._id,
                idUser: user._id,
            });
        } else {
            setNumberLike(numberLike + 1);
            updateLikePost(user._id, dataPost._id, 'like');
            await axios.post('https://7732-113-160-14-39.ngrok-free.app/user/community/like', {
                idBlog: dataPost._id,
                idUser: user._id,
            });
        }
    };

    useEffect(() => {
        setTime(countTime(dataPost.timePost));
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

    useEffect(() => {
        axios
            .get('https://7732-113-160-14-39.ngrok-free.app/user/comment/blog/get', {
                params: { idBlog: dataPost._id },
            })
            .then((response) => {
                const data = response.data;
                const lstCmt = [];
                for (const item of data) {
                    const cmt = {
                        _id: item._id,
                        author: item.author,
                        content: item.content,
                        likes: item.likes,
                        img: item.img,
                        timeCreate: item.createdAt,
                    };
                    lstCmt.push(cmt);
                }
                setCmtList(lstCmt);
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
    }, []);

    const handleScroll = (event: any) => {
        const { contentOffset } = event.nativeEvent;
        const { y } = contentOffset;
        setHeight(y);
    };

    const renderImage = dataPost.img.map((img: string, index: number) => {
        return (
            <TouchableOpacity key={index} onPress={() => setModalPhoto(true)}>
                <Image
                    source={{ uri: img }}
                    resizeMode="cover"
                    style={{
                        width: dataPost.img.length === 1 ? deviceWidth : deviceWidth * 0.49,
                        height: 280,
                        borderWidth: 0.2,
                        borderColor: '#ccc',
                    }}
                />
            </TouchableOpacity>
        );
    });

    const renderCmt = useCallback(() => {
        return cmtList.map((comment: CommentInterface, index: number) => <Comment key={index} data={comment} user = {user}/>);
    }, [cmtList]);

    const handleUploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.canceled) {
            setUriImage(result.assets[0].uri);
            const filename = result.assets[0].fileName;
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64
            });
            setObjectImage({
                uri: base64,
                type: String(filename?.split('.')[1])
            });
        } else {
            Alert.alert('Upload ảnh lỗi!');
        }
    }

    const handleComment = () => {
        if (user._id !== '') {
            const dataCmt = {
                author: user._id,
                content: valueText,
                idBlog: dataPost._id,
                img: objectImage
            };
            axios
                .post('https://7732-113-160-14-39.ngrok-free.app/user/comment/blog/post', dataCmt)
                .then((response) => {
                    if (response.status === 200) {
                        const comment = response.data;
                        const cmt = {
                            _id: comment._id,
                            author: { _id: user._id, username: user.username, img: user.img },
                            content: comment.content,
                            likes: [],
                            img: comment.img,
                            timeCreate: comment.createdAt,
                        };
                        setCmtList((prev) => [cmt, ...prev]);
                        updatePostItem(comment._id);
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
                    setValueText('');
                    setIsFocus(false);
                    setUriImage('');
                    Keyboard.dismiss();
                });
        } else {
            Alert.alert('Bạn cần đăng nhập!');
        }
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Modal visible = {modalPhoto} transparent = {true} animationType='fade'>
                <Photo listImg={dataPost.img} cancel={() => setModalPhoto(false)}/>
            </Modal>
            {height >= 40 ? (
                <View style={styles.ctnHeaderScroll}>
                    <TouchableOpacity style={styles.ctnBack} onPress={func}>
                        <FontAwesomeIcon icon={faChevronLeft} size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textAccount}>Bài viết của {dataPost.author.username}</Text>

                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faEllipsis} color="#65676b" size={20} />
                    </TouchableOpacity>
                </View>
            ) : null}

            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
                ref={scrollViewRef}
                onScroll={handleScroll}
            >
                <View style={styles.ctnHeader}>
                    <View style={styles.flexRow}>
                        <TouchableOpacity style={styles.ctnBack} onPress={func}>
                            <FontAwesomeIcon icon={faChevronLeft} size={20} />
                        </TouchableOpacity>
                        <View style={styles.flexRow}>
                            <Image
                                source={dataPost.author.img ? { uri: dataPost.author.img } : userImage}
                                resizeMode="contain"
                                style={styles.imageUser}
                            />
                            <View style={styles.ctnInfor}>
                                <Text style={styles.nameUser}>{dataPost.author.username}</Text>
                                <Text style={styles.timePosted}>{time}</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faEllipsis} color="#65676b" size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.ctnContent}>
                    <Text style={styles.textPost}>{dataPost.title}</Text>
                    <View style={styles.ctnImage}>{dataPost.img && renderImage}</View>
                </View>

                <View style={styles.ctnInteract}>
                    <TouchableOpacity style={[styles.ctnButton, { paddingLeft: 16 }]} onPress={handleLike}>
                        <FontAwesomeIcon
                            icon={isLike ? Like : faThumbsUp}
                            color={isLike ? '#0866ff' : '#65676b'}
                            size={18}
                        />
                        <Text style={[styles.textInteract, isLike ? { color: '#0866ff' } : {}]}>Thích</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ctnButton}>
                        <FontAwesomeIcon icon={faComment} color="#65676b" size={18} />
                        <Text style={styles.textInteract}>Bình luận</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.ctnButton, { paddingRight: 16 }]}>
                        <FontAwesomeIcon icon={faShare} color="#65676b" size={18} />
                        <Text style={styles.textInteract}>Chia sẻ</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ctnInteracted}>
                    {numberLike ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={iconLike}
                                resizeMode="cover"
                                style={{ width: 24, height: 24, marginRight: 4 }}
                            />
                            <Text style={styles.textInteracted}>{numberLike}</Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {cmtList.length > 0 ? (
                        <Text style={styles.textInteracted}>{cmtList.length} bình luận</Text>
                    ) : (
                        <Text></Text>
                    )}
                    {numberShare > 0 ? (
                        <Text style={styles.textInteracted}>{dataPost.numberShare} chia sẻ</Text>
                    ) : (
                        <Text></Text>
                    )}
                </View>

                <View style={styles.ctnComment}>
                    <Text
                        style={{
                            fontFamily: 'Inconsolata-Bold',
                            marginLeft: 16,
                            fontSize: 18,
                            marginBottom: 12,
                            marginTop: -4,
                        }}
                    >
                        Tất cả bình luận
                    </Text>
                    <View>{renderCmt()}</View>
                </View>
            </ScrollView>

            <View style={[styles.ctnInputComment, isFocus ? { bottom: heightKeyboard } : {}]}>
                {uriImage !== '' && (
                    <View>
                        <Image source={{ uri: uriImage }} resizeMode="cover" style={styles.imgPost} />
                        <TouchableOpacity style={styles.iconXMark} onPress={() => setUriImage('')}>
                            <FontAwesomeIcon icon={faXmark} size={14} />
                        </TouchableOpacity>
                    </View>
                )}
                <View style = {{flexDirection: 'row'}}>
                    <TouchableOpacity style={{ width: 40, padding: 8, marginLeft: -8 }} onPress={handleUploadImage}>
                        <Image source={camera} resizeMode="contain" style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder={valueText ? '' : 'Viết bình luận'}
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
                    {(valueText.length > 0 || uriImage !== '') && (
                        <TouchableOpacity style={{ padding: 4, marginRight: -4, marginTop: 4 }} onPress={handleComment}>
                            <Image source={iconSend} resizeMode="cover" style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default CommentPost;
