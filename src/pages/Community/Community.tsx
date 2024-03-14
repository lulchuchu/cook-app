import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import styles from './style';
import Footer from '../../components/Footer/Footer';
import PostItem from '../../components/PostItem/Post';
import CreatePost from '../../layouts/CreatePost/CreatePost';
import CommentPost from '../../layouts/CommentPost/CommentPost';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Community: React.FC<Navigation> = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [showPost, setShowPost] = useState(false);

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {modalVisible ? 
                <Modal
                    animationType='slide'
                    transparent = {true}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <CreatePost cancel = {() => setModalVisible(false)}/>
                </Modal>
                : ''
            }
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
                <PostItem func = {() => setShowPost(true)}/>
                <PostItem func = {() => setShowPost(true)}/>
                <View style = {{height: 60}}></View>
            </ScrollView>

            <Footer navigation={navigation} address={'Community'} />
            {showPost ? 
                <CommentPost func = {() => setShowPost(false)}/>
                : ''
            }
        </View>
    );
};

export default Community;
