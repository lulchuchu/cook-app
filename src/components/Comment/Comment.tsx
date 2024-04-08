import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import countTime from '../../util/CountTime';
import { useEffect, useState } from 'react';
const imgUser = require('../../../assets/images/user.png');

interface UserCommentInterface {
    _id: string;
    username: string;
    img: string;
}

interface CommentInterface {
    _id: string;
    author: UserCommentInterface;
    content: string;
    numberLike: number;
    timeCreate: string;
}

type Props = {
    data: CommentInterface;
};

const Comment: React.FC<Props> = ({ data }) => {
    const [timePosted, setTime] = useState(
        countTime(data.timeCreate) !== '0' ? countTime(data.timeCreate) : 'Vừa xong',
    );
    useEffect(() => {
        const intervalId = setInterval(() => {
            const updateTime = countTime(data.timeCreate) !== '0' ? countTime(data.timeCreate) : 'Vừa xong';
            setTime(updateTime);
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.ctnImg}>
                <Image
                    source={data.author.img ? { uri: data.author.img } : imgUser}
                    resizeMode="contain"
                    style={styles.imgUser}
                />
            </View>

            <View>
                <View style={styles.ctnInfor}>
                    <Text style={styles.name}>{data.author.username}</Text>
                    <Text style={styles.content} numberOfLines={4}>
                        {data.content}
                    </Text>
                </View>

                <View style={styles.ctnInteract}>
                    <Text style={[styles.textInterace, { fontFamily: 'Inconsolata-Medium', marginRight: 8 }]}>
                        {timePosted}
                    </Text>
                    <TouchableOpacity style={styles.btnIterace}>
                        <Text style={styles.textInterace}>Thích</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnIterace}>
                        <Text style={styles.textInterace}>Phản hồi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Comment;
