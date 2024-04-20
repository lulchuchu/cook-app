import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { faEllipsis, faShare, faThumbsUp as Like } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './style';
import countTime from '../../util/CountTime';
import axios from 'axios';

const userImage = require('../../../assets/images/user.png');
const iconLike = require('../../../assets/images/facebook-reactions.png');

interface User {
    username: string;
    img: string;
}

interface PostInterface {
    _id: string;
    author: User;
    title: string;
    timePost: string;
    img: string[];
    accountLike: string[];
    numberLike: number;
    numberShare: number;
    comments: string[];
}

type Props = {
    func: () => void;
    data: PostInterface;
    user: any;
    handleOnPressOnImage: (data: string[]) => void;
};

const PostItem: React.FC<Props> = ({ func, data, user, handleOnPressOnImage}) => {
    const [numberLike, setNumberLike] = useState(data.numberLike);
    const [numberShare, setNumberShare] = useState(data.numberShare);
    const [isLike, setIsLike] = useState(false);
    const [timePosted, setTime] = useState('');
    const { width: deviceWidth } = Dimensions.get('window');

    useEffect(() => {
        if (data.accountLike.includes(user._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
        setTime(countTime(data.timePost));
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updateTime = countTime(data.timePost);
            setTime(updateTime);
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const handleLike = async () => {
        setIsLike(!isLike);
        if (isLike) {
            setNumberLike(numberLike - 1);
            await axios.post('http://192.168.34.109:3056/user/community/dislike', {
                idBlog: data._id,
                idUser: user._id,
            });
        } else {
            setNumberLike(numberLike + 1);
            await axios.post('http://192.168.34.109:3056/user/community/like', {
                idBlog: data._id,
                idUser: user._id,
            });
        }
    };

    const renderImage = data.img.map((img: string, index: number) => {
        return (
            <TouchableOpacity key={index} onPress={() => handleOnPressOnImage(data.img)}>
                <Image
                    source={{ uri: img }}
                    resizeMode="cover"
                    style={{
                        width: data.img.length === 1 ? deviceWidth : deviceWidth * 0.49,
                        height: 280,
                        borderWidth: 0.2,
                        borderColor: '#ccc',
                    }}
                />
            </TouchableOpacity>
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.ctnHeader}>
                <View style={styles.flexRow}>
                    <Image
                        source={data.author.img ? { uri: data.author.img } : userImage}
                        resizeMode="contain"
                        style={styles.imageUser}
                    />
                    <View style={styles.ctnInfor}>
                        <Text style={styles.nameUser}>{data.author.username}</Text>
                        <Text style={styles.timePosted}>{timePosted}</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <FontAwesomeIcon icon={faEllipsis} color="#65676b" size={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.ctnContent}>
                <Text style={styles.textPost}>{data.title}</Text>
                <View style={styles.ctnImage}>
                    {
                        data.img && renderImage
                    }
                </View>
            </View>

            <View style={styles.ctnInteracted}>
                {numberLike ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={iconLike} resizeMode="cover" style={{ width: 24, height: 24, marginRight: 4 }} />
                        <Text style={styles.textInteracted}>{numberLike}</Text>
                    </View>
                ) : (
                    <View></View>
                )}
                {data.comments.length > 0 ? (
                    <TouchableOpacity onPress={func}>
                        <Text style={styles.textInteracted}>{data.comments.length} bình luận</Text>
                    </TouchableOpacity>
                ) : (
                    <Text></Text>
                )}
                {numberShare > 0 ? (
                    <Text style={styles.textInteracted}>{data.numberShare} chia sẻ</Text>
                ) : (
                    <Text></Text>
                )}
            </View>

            <View style={[styles.flexRow, { justifyContent: 'space-between', paddingHorizontal: 16 }]}>
                <TouchableOpacity style={styles.ctnButton} onPress={handleLike}>
                    <FontAwesomeIcon
                        icon={isLike ? Like : faThumbsUp}
                        color={isLike ? '#0866ff' : '#65676b'}
                        size={18}
                    />
                    <Text style={[styles.textInteract, isLike ? { color: '#0866ff' } : {}]}>Thích</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ctnButton} onPress={func}>
                    <FontAwesomeIcon icon={faComment} color="#65676b" size={18} />
                    <Text style={styles.textInteract}>Bình luận</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ctnButton}>
                    <FontAwesomeIcon icon={faShare} color="#65676b" size={18} />
                    <Text style={styles.textInteract}>Chia sẻ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostItem;
