import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';

import styles from './style';
import countTime from '../../util/CountTime';
import axios from 'axios';
const imgUser = require('../../../assets/images/user.png');

type Props = {
    user: User;
    time: string;
    content: string;
    like: number;
    img: string;
    _id: string;
};
interface User {
    _id: string;
    username: string;
    img: string;
}

const Comment: React.FC<Props> = ({ user, time, content, like, img, _id }) => {
    const [numberLike, setLike] = useState(like);
    const [isLiked, setIsLiked] = useState(false);
    const [timePosted, setTime] = useState(countTime(time) !== '0' ? countTime(time) : 'Vừa xong');

    const handleLike = () => {
        if (isLiked) {
            setLike(numberLike - 1);
        } else {
            setLike(numberLike + 1);
        }
        setIsLiked(!isLiked);
        axios
            .post('https://7732-113-160-14-39.ngrok-free.app/comment-dish/create-feeling', {
                idCommentDish: _id,
                idNguoiDung: user._id,
                state: 1,
            })
            .then()
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updateTime = countTime(time) !== '0' ? countTime(time) : 'Vừa xong';
            setTime(updateTime);
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.itemLeft}>
                <Image
                    source={user.img !== '' ? { uri: user.img } : imgUser}
                    resizeMode="cover"
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                    }}
                />
            </View>

            <View style={styles.iteRight}>
                <View style={styles.ctnInfor}>
                    <View>
                        <Text style={styles.name}>{user.username}</Text>
                        <Text style={[styles.time, { fontFamily: 'Inconsolata-Medium', marginRight: 8 }]}>
                            {timePosted}
                        </Text>
                    </View>
                </View>

                <View style={styles.ctnContent}>
                    {content && (
                        <Text style={styles.content} numberOfLines={4}>
                            {content}
                        </Text>
                    )}
                    {img !== '' && <Image source={{ uri: img }} resizeMode="cover" style={styles.imgCmt} />}
                </View>

                <View style={styles.ctnInteract}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}
                        onPress={handleLike}
                    >
                        <FontAwesomeIcon
                            icon={isLiked ? heart : faHeart}
                            color={isLiked ? 'red' : '#65676b'}
                            size={14}
                        />
                        <Text style={styles.numberLike}>{numberLike}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faComment} color="#65676b" size={14} />
                        <Text style={[styles.time, { marginLeft: 4 }]}>Phản hồi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Comment;
