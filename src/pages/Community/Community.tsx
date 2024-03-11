import React from 'react';
import { useFonts } from 'expo-font';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import styles from './style';
import Footer from '../../components/Footer/Footer';
import PostItem from '../../components/PostItem/Post';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Community : React.FC<Navigation> = ({navigation}) => {

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    if (!fontLoaded) {
        return null;
    };

    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <View style = {styles.ctnSearch}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon = {faMagnifyingGlass} size={20} color='#7d7d80'/>
                    </TouchableOpacity>
                    <TextInput 
                        placeholder='Tìm kiếm'
                        placeholderTextColor='#7d7d80'
                        style = {styles.input}
                    />
                </View>

                <View>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon = {faPenToSquare} size={26} color='#c54e22'/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {styles.ctnText}>
                <Text style = {styles.textIn}>Cộng đồng</Text>
            </View>

            <ScrollView style = {styles.ctnBody}>
                <PostItem />
            </ScrollView>

            <Footer navigation={navigation} address={"Community"}/>
        </View>
    );
};

export default Community;