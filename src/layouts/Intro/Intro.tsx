import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import styles from './styles';
import Intro1 from '../../components/Intro/Intro1/Intro1';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Intro: React.FC<Navigation> = ({ navigation }) => {
    const [nextPage, setNextPage] = useState(false);

    const [fontLoaded] = useFonts({
        Inconsolata: require('../../../assets/fonts/Inconsolata-Light.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    if (!nextPage) {
        setTimeout(() => {
            setNextPage(true);
        }, 2000);
    }

    return nextPage ? (
        <Intro1 navigation={navigation} />
    ) : (
        <View style={styles.container}>
            <Text style={styles.appName}>kitchen stories</Text>
            <Text style={styles.slogan}>ai cũng có thể nấu ăn</Text>
        </View>
    );
};

export default Intro;
