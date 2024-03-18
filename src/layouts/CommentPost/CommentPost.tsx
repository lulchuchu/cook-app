import React, { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { Image, Keyboard, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faEllipsis, faShare, faThumbsUp as Like} from '@fortawesome/free-solid-svg-icons';

import styles from './style';
import Comment from '../../components/Comment/Comment';

const chef = require('../../../assets/images/chef.png');
const meal = require('../../../assets/images/R1016-final-photo-1.jpg');
const iconSend = require('../../../assets/images/paper-plane.png');

type Func = {
    func: () => void;
};

const CommentPost: React.FC<Func> = ({ func }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const scrollViewRef = useRef<ScrollView>(null);
    const textInputRef = useRef<TextInput>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [valueText, setValueText] = useState('');
    const [heightKeyboard, setHeightKeyboard] = useState(0);
    const [numberLike, setNumberLike] = useState(12);
    const [isLike, setIsLike] = useState(false);
    const [height, setHeight] = useState(0);

    const handleLike = () => {
        setIsLike(!isLike);
        if (isLike) {
            setNumberLike(numberLike-1);
        }
        else {
            setNumberLike(numberLike+1);
        }
    };

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

    const handleScroll = (event: any) => {
        const { contentOffset } = event.nativeEvent;
        const { y } = contentOffset;
        setHeight(y);
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {height >= 40 ?
                <View style={styles.ctnHeaderScroll}>
                    <TouchableOpacity style={styles.ctnBack} onPress={func}>
                        <FontAwesomeIcon icon={faChevronLeft} size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textAccount}>Bài viết của Kitchen Stories</Text>

                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faEllipsis} color="#65676b" size={20} />
                    </TouchableOpacity>
                </View>
                : null
            }

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
                            <Image source={chef} resizeMode="contain" style={styles.imageUser} />
                            <View style={styles.ctnInfor}>
                                <Text style={styles.nameUser}>Kitchen Stories</Text>
                                <Text style={styles.timePosted}>3 ngày</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faEllipsis} color="#65676b" size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.ctnContent}>
                    <Text style={styles.textPost}>Hãy khám phá món mới của chúng tôi: Bánh hạnh nhân dừa</Text>
                    <Image source={meal} resizeMode="cover" style={styles.imageContent} />
                </View>

                <View style={styles.ctnInteract}>
                    <TouchableOpacity style={[styles.ctnButton, {paddingLeft: 16}]} onPress={handleLike}>
                        <FontAwesomeIcon icon={isLike ? Like : faThumbsUp} color={isLike ? '#0866ff' : "#65676b"} size={18} />
                        <Text style={[styles.textInteract, isLike ? {color: '#0866ff'} : {}]}>Thích</Text>
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

                <View style={styles.ctnComment}>
                    <Text
                        style={{
                            fontFamily: 'Inconsolata-Bold',
                            marginLeft: 16,
                            fontSize: 18,
                            marginBottom: 12,
                        }}
                    >
                        Tất cả bình luận
                    </Text>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                </View>
            </ScrollView>

            <View style={[styles.ctnInputComment, isFocus ? { bottom: heightKeyboard } : {}]}>
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

export default CommentPost;
