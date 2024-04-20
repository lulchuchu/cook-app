import React, { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { Alert, Modal, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import Photo from 'layouts/Photo/Photo';

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
    author: User;
    title: string;
    timePost: string;
    img: string[];
    accountLike: string[];
    numberLike: number;
    numberShare: number;
    comments: string[];
};

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
    const [dataImage, setDataImage] = useState<string[]>([]);
    const [modalPhoto, setModalPhoto] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        axios
            .get('http://192.168.34.109:3056/user/community/getAll')
            .then((response) => {
                const listPost = response.data;
                const result = listPost.map((post: any) => ({
                    _id: post._id,
                    author: {
                        username: post.author.username,
                        img: post.author.img
                    },
                    title: post.content,
                    timePost: post.createdAt,
                    img: post.imgDes,
                    accountLike: post.accountLike,
                    numberShare: post.numberShare,
                    numberLike: post.numberLike,
                    comments: post.comments,
                }));
                setListPost(result);
            })
            .catch(handleError);
    }, []);
    
    const handleError = (err: any) => {
        if (err.response) {
            Alert.alert(err.response.data.message);
        } else if (err.request) {
            Alert.alert('Network error. Please check your internet connection.');
        } else {
            Alert.alert('An unexpected error occurred. Please try again later.');
        }
    };

    const handleClickOnPost = (post: PostInterface) => {
        setItemPost(post);
        setShowPost(true);
    };
    const handleOnPressOnImage = (data: string[]) => {
        setDataImage(data);
        setModalPhoto(true);
    };

    const updateListPost = (post: PostInterface) => {
        setListPost((prev) => [post, ...prev]);
    }

    const updatePostItem = (idCmt: string) => {
        var post = itemPost;
        var arr = Array.from(listPost);
        for (const item of arr) {
            if (item._id === post?._id) {
                item.comments.unshift(idCmt);
                return;
            }
        }
        setListPost(arr);
    };

    const handleOnPress = () => {
        if (route.params.user._id !== '') {
            setModalVisible(true);
        } else {
            navigation.navigate('OptionLogin');
        }
    };
    const renderPost = useCallback(() => {
        return listPost.map((post: PostInterface, index: number) =>
            <PostItem 
                key={index} 
                data={post} 
                user={route.params.user} 
                func={() => handleClickOnPost(post)}
                handleOnPressOnImage = {(data: string[]) => handleOnPressOnImage(data)} 
            />
    )}, [listPost]);

    const onRefresh = () => {
        // Thực hiện các tác vụ cần thiết để làm mới dữ liệu
        setRefreshing(true);

        // Sau khi làm mới dữ liệu xong, set refreshing về false để dừng indicator
        setTimeout(() => {
            setRefreshing(false);
        }, 500); // Thời gian làm mới ở đây là 2000ms (2 giây)

    };

    if (!fontLoaded) {
        return null;
    };

    return (
        <View style={styles.container}>
            <Modal visible = {modalPhoto} transparent = {true} animationType='fade'>
                <Photo listImg = {dataImage} cancel={() => setModalPhoto(false)}/>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <CreatePost
                    cancel={() => setModalVisible(false)}
                    updateListPost = {(post: PostInterface) => updateListPost(post)}
                    user={props.user}
                />
            </Modal>
            <View style={styles.header}>
                <View style={styles.ctnSearch}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#7d7d80" />
                    </TouchableOpacity>
                    <TextInput placeholder="Tìm kiếm" placeholderTextColor="#7d7d80" style={styles.input} />
                </View>
                <View>
                    <TouchableOpacity onPress={handleOnPress}>
                        <FontAwesomeIcon icon={faPenToSquare} size={26} color="#c54e22" />
                    </TouchableOpacity>
                </View>
            </View>


            <ScrollView
                style={styles.ctnBody}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                // bounces={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.marginTop}></View>
                <View style={styles.ctnText}>
                    <Text style={styles.textIn}>Cộng đồng</Text>
                </View>
                <View>
                    {renderPost()}
                </View>
                <View style={{ height: 80, backgroundColor: '#fff' }}></View>
            </ScrollView>

            <Footer navigation={navigation} address={'Community'} user={props.user} />
            {showPost && (
                <CommentPost
                    func={() => setShowPost(false)}
                    user={props.user}
                    dataPost={itemPost}
                    updatePostItem={(idCmt: string) => updatePostItem(idCmt)}
                />
            )}
        </View>
    );
};

export default Community;
