import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';
const background = require('../../../assets/images/home_bg.jpeg');
const imageMess = require('../../../assets/images/message.png');
const chef = require('../../../assets/images/chef.png');
import Footer from '../../components/Footer/Footer';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};
const Home: React.FC<Navigation> = ({ navigation }) => {
    const [search,setSearch]= useState<String>('');
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        Inconsolata: require('../../../assets/fonts/Inconsolata-Light.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [showDiet, setShowDiet] = useState(false);

    if (!fontLoaded) {
        return null;
    }

    function handleSearch(): void {
        // throw new Error('Function not implemented.');
    }

    function onChangeSearch(search: string): void {
        // throw new Error('Function not implemented.');
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false} bounces={false}>
                <View>
                    <Text style={styles.searchLabel}>Tìm kiếm</Text>
                </View>
                <View style={styles.searchView}>
                    <View style = {styles.ctnSearch}>
                        <TouchableOpacity >
                            <FontAwesomeIcon icon = {faMagnifyingGlass} size={20} color='#7d7d80'/>
                        </TouchableOpacity>
                        <TextInput 
                            placeholder='Tìm kiếm'
                            placeholderTextColor='#7d7d80'
                            style = {styles.input}
                        />
                    </View>
                </View>

                <View style = {styles.selectSearch}>
                    <TouchableOpacity style = {styles.selectSearchChild}>
                            <Image source={require('../../../assets/images/search/My.png')} resizeMode="contain" style={styles.selectSearchChildImg} />
                            <Text style={styles.selectSearchChildTxt}>Mỳ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.selectSearchChild}>
                        <Image source={require('../../../assets/images/search/maincook.png')} resizeMode="contain" style={styles.selectSearchChildImg} />
                            <Text style={styles.selectSearchChildTxt}>Món chính</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style = {styles.selectSearchChild}>
                        <Image source={require('../../../assets/images/search/trangmieng.png')} resizeMode="contain" style={styles.selectSearchChildImg} />
                        <Text style={styles.selectSearchChildTxt}>Tráng miệng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.selectSearchChild}>
                        <Image source={require('../../../assets/images/search/naunhanh.png')} resizeMode="contain" style={styles.selectSearchChildImg} />
                        <Text style={styles.selectSearchChildTxt}>Nấu nhanh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.selectSearchChild}>
                        <Image source={require('../../../assets/images/search/monchay.png')} resizeMode="contain" style={styles.selectSearchChildImg} />
                        <Text style={styles.selectSearchChildTxt}>Món chay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer  navigation={navigation} address='Search'/>
        </View>
    );
};

export default Home;
