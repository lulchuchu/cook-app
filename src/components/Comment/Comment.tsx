import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import countTime from '../../util/CountTime';
import { useEffect, useState } from 'react';
import axios from 'axios';

const imgUser = require('../../../assets/images/user.png');
const iconLike = require('../../../assets/images/facebook-reactions.png');

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

type Props = {
    data: CommentInterface;
    user: any;
};


const Comment: React.FC<Props> = ({ data, user}) => {
    const [timePosted, setTime] = useState('');
    const [isLike, setIsLike] = useState(false);
    const [numberLike, setNumberLike] = useState(0);
    useEffect(()=> {
        setNumberLike(data.likes.length);
        if (data.likes.includes(user._id)) {
            setIsLike(true);
        }
        setTime(countTime(data.timeCreate));
    }, [data]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updateTime = countTime(data.timeCreate);
            setTime(updateTime);
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const handleOnPress = () => {
        if (data._id !== '') {
            setIsLike(!isLike);
            if (isLike) {
                setNumberLike(numberLike - 1);
                axios.post('http://192.168.34.109:3056/user/comment/blog/unlike', {
                        idCmt: data._id,
                        idUser: user._id
                    })
                    .then()
                    .catch(err => console.log(err));
            }
            else {
                setNumberLike(numberLike + 1);
                axios.post('http://192.168.34.109:3056/user/comment/blog/like', {
                        idCmt: data._id,
                        idUser: user._id
                    })
                    .then()
                    .catch(err => console.log(err));
            }
        }
        else {
            Alert.alert('Bạn cần đăng nhập!')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemLeft}>
                <Image
                    source={data.author.img ? { uri: data.author.img } : imgUser}
                    resizeMode="contain"
                    style={styles.imgUser}
                />
                <View style={styles.ctnInfor}>
                    <Text style={styles.name}>{data.author.username}</Text>
                    {data.content && <Text style={styles.content} numberOfLines={4}>
                        {data.content}
                    </Text>}
                </View>
            </View>

            {data.img &&<View style = {styles.ctnImg}>
                <Image source={{uri: data.img}} 
                    resizeMode='cover' 
                    style = {[styles.img, {
                        // width: width,
                        height: 200,
                    }]}
                />
            </View>}

            <View style = {styles.itemRight}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={styles.ctnInteract}>
                        <Text style={[styles.textInterace, { fontFamily: 'Inconsolata-Medium', marginRight: 8 }]}>
                            {timePosted}
                        </Text>
                        <TouchableOpacity style={styles.btnIterace} onPress={handleOnPress}>
                            <Text style={[styles.textInterace, isLike ? {color: '#0866ff'} : {}]}>Thích</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnIterace}>
                            <Text style={styles.textInterace}>Phản hồi</Text>
                        </TouchableOpacity>
                    </View>
                    {numberLike > 0 &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textInterace}>{numberLike}</Text>
                            <Image
                                source={iconLike}
                                resizeMode="cover"
                                style={{ width: 24, height: 24, marginRight: 4 }}
                            />
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};

export default Comment;
