import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

import styles from './styles';
import Intro2 from '../Intro2/Intro2';
const video = require('../../../../assets/video/video1.mp4');

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Intro1: React.FC<Navigation> = ({ navigation }) => {
    const videoRef = useRef<Video>(null);
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../../assets/fonts/Inconsolata-Bold.ttf'),
        Other: require('../../../../assets/fonts/Inconsolata_Condensed-Bold.ttf'),
        Inconsolata: require('../../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    const videos = [
        require('../../../../assets/video/video2.mp4'),
        require('../../../../assets/video/video3.mp4'),
        require('../../../../assets/video/video4.mp4'),
    ];

    const largeTexts = ['Lấy cảm hứng', 'Rèn luyện kỹ năng của bạn', 'Chia sẻ công thức nấu ăn của bạn'];

    const smallTexts = [
        'Khám phá các công thức nấu ăn ngon và những câu chuyện ẩm thực tuyệt vời',
        'với video nấu ăn và các mẹo hàng đầu của chúng tôi',
        'với cộng đồng quốc tế của chúng tôi',
    ];

    const nextPage = () => {
        setIndex(index + 1);
    };

    const handleClick = () => {
        setShow(true);
    };

    const handleCancel = () => {
        navigation.navigate('Home');
    };

    const handleNextLayout = () => {
        navigation.navigate('OptionLogin');
    };

    if (!fontLoaded) {
        return null;
    }

    return !show ? (
        <View style={styles.container}>
            <Video ref={videoRef} source={video} style={styles.backgroundVideo} isLooping shouldPlay/>

            <View style={styles.title}>
                <Text style={styles.appName}>kitchen stories</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.textWelcome}>Chào mừng</Text>

                <TouchableOpacity style={styles.ctnButton} onPress={handleClick}>
                    <Text style={styles.textButton}>Tôi là người mới</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ctnButton} onPress={handleNextLayout}>
                    <Text style={styles.textButton}>Tôi đã biết trước đó</Text>
                </TouchableOpacity>
            </View>
        </View>
    ) : (
        <Intro2
            largeText={largeTexts[index]}
            smallText={smallTexts[index]}
            video={videos[index]}
            numberPage={index + 1}
            nextPage={nextPage}
            navigation={navigation}
            handleCancel={handleCancel}
        />
    );
};

export default Intro1;
