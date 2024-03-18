import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';

import styles from './style';
const imgUser = require('../../../assets/images/user.png');
const food = require('../../../assets/images/pexels-ash-376464.jpg');

type Props = {
    name: string;
    time: number;
    rating: number;
    content: string;
    like: number;
    img: boolean;
};

const Comment: React.FC<Props> = ({ name, time, rating, content, like, img }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const [numberLike, setLike] = useState(like);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (isLiked) {
            setLike(numberLike - 1);
        } else {
            setLike(numberLike + 1);
        }
        setIsLiked(!isLiked);
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemLeft}>
                <Image
                    source={imgUser}
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
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.time}>{time} giờ trước</Text>
                    </View>

                    <View style={styles.ctnRating}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <Text
                                key={value}
                                style={{
                                    color: rating >= value ? 'gold' : 'gray',
                                    fontSize: 14,
                                    marginHorizontal: 4,
                                }}
                            >
                                &#9733;
                            </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.ctnContent}>
                    <Text style={styles.content} numberOfLines={4}>
                        {content}
                    </Text>
                    {img ? <Image source={food} resizeMode="cover" style={styles.imgCmt} /> : ''}
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
