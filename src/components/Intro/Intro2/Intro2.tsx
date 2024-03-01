import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useFonts } from 'expo-font';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';

interface Props {
    numberPage: number;
    largeText: string;
    smallText: string;
    video: any;
    nextPage: () => void;
    navigation: any;
    handleCancel: () => void;
}

const Intro2: React.FC<Props> = ({ numberPage, largeText, smallText, video, nextPage, navigation, handleCancel }) => {
    const videoRef = useRef<Video>(null);
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../../assets/fonts/Inconsolata-Bold.ttf'),
        Other: require('../../../../assets/fonts/Inconsolata_Condensed-Bold.ttf'),
        Inconsolata: require('../../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const handleToRegister = () => {
        navigation.navigate('OptionLogin');
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Video ref={videoRef} source={video} style={styles.backgroundVideo} isLooping shouldPlay />

            <TouchableOpacity style={styles.ctnSkip} onPress={handleCancel}>
                <Text style={styles.textSkip}>Bỏ qua</Text>
            </TouchableOpacity>

            <View style={styles.title}>
                <Text style={styles.appName}>kitchen stories</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.textWelcome}>{largeText}</Text>

                <Text style={styles.text}>{smallText}</Text>

                <View style={styles.paging}>
                    {[1, 2, 3].map((value, key) =>
                        value === numberPage ? (
                            <FontAwesomeIcon icon={faCircle} size={8} color="#fff" key={key} />
                        ) : (
                            <FontAwesomeIcon icon={faCircle} size={8} color="#000" key={key} />
                        ),
                    )}
                </View>

                <TouchableOpacity
                    style={styles.ctnButton}
                    onPress={numberPage === 3 ? () => handleToRegister() : nextPage}
                >
                    <Text style={styles.textButton}>Bắt đầu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Intro2;
