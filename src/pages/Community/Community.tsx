import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { RouteProp } from '@react-navigation/native';

import styles from './style';
import Footer from '../../components/Footer/Footer';
import PostItem from '../../components/PostItem/Post';
import CreatePost from '../../layouts/CreatePost/CreatePost';
import CommentPost from '../../layouts/CommentPost/CommentPost';
import axios from 'axios';

type Navigation = StackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'Community'>;

interface Props {
    navigation: Navigation;
    route: Route;
}

interface User {
    username: string;
    img: string;
}

interface PostInterface {
    _id: string;
    user: User;
    title: string;
    timePost: string;
    img: string[];
    accountLike: string[];
    numberLike: number;
    numberShare: number;
    comments: string[];
}

const Community: React.FC<Props> = ({ navigation, route }) => {
    const props = route.params;

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const [listPost, setListPost] = useState<PostInterface[]>([]);
    const [itemPost, setItemPost] = useState<PostInterface>();

    useEffect(() => {
        axios
            .get('http://192.168.34.109:3056/user/community/getAll')
            .then((response) => {
                const listPost = response.data;
                for (const post of listPost) {
                    const item: PostInterface = {
                        _id: post._id,
                        user: post.author,
                        title: post.content,
                        timePost: post.createdAt,
                        img: post.imgDes,
                        accountLike: post.accountLike,
                        numberShare: post.numberShare,
                        numberLike: post.numberLike,
                        comments: post.comments,
                    };
                    setListPost((prev) => [...prev, item]);
                }
            })
            .catch((err) => {
                if (err.response) {
                    Alert.alert(err.response.data.message);
                } else if (err.request) {
                    Alert.alert('Network error. Please check your internet connection.');
                } else {
                    Alert.alert('An unexpected error occurred. Please try again later.');
                }
            });
    }, []);

    const handleClickOnPost = (post: PostInterface) => {
        setItemPost(post);
        setShowPost(true);
    };

    const renderPost = listPost.map((post: PostInterface, index: number) => {
        return <PostItem func={() => handleClickOnPost(post)} key={index} data={post} user={route.params.user} />;
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {modalVisible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <CreatePost cancel={() => setModalVisible(false)} user={props.user} />
                </Modal>
            )}
            <View style={styles.header}>
                <View style={styles.ctnSearch}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#7d7d80" />
                    </TouchableOpacity>
                    <TextInput placeholder="Tìm kiếm" placeholderTextColor="#7d7d80" style={styles.input} />
                </View>
                <View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <FontAwesomeIcon icon={faPenToSquare} size={26} color="#c54e22" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.ctnBody}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
            >
                <View style={styles.marginTop}></View>
                <View style={styles.ctnText}>
                    <Text style={styles.textIn}>Cộng đồng</Text>
                </View>
                {renderPost}
                <View style={{ height: 80, backgroundColor: '#fff' }}></View>
            </ScrollView>

            <Footer navigation={navigation} address={'Community'} user={props.user} />
            {showPost ? <CommentPost func={() => setShowPost(false)} user={props.user} dataPost={itemPost} /> : ''}
        </View>
    );
};

export default Community;
