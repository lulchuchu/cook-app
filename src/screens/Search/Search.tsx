import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, Keyboard, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';

import styles from './style';
import Footer from '../../components/Footer/Footer';
import LayoutSearch from 'layouts/LayoutSearch/LayoutSearch';
const chef = require('../../../assets/images/chef.png');

type Route = RouteProp<RootStackParamList, 'Search'>;

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
    route: Route;
};

interface User {
    _id: string;
    email: string;
    username: string;
    img: string;
    tel: string;
    address: string;
    token: string;
    diet: string;
    emailVerified: boolean;
    selectCountry: string;
}
interface Dish {
    img: string;
    _id: string;
    name: string;
    likes: string[];
    type: string;
    country: string;
}

const Search: React.FC<Navigation> = ({ navigation, route }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [dishs, setDishs] = useState([]);
    const [modalSearch, setModalSearch] = useState(false);
    const [user, setUser] = useState<User>(route.params.user);

    useEffect(() => {
        axios
            .get('https://7732-113-160-14-39.ngrok-free.app/dish/get-all')
            .then((response) => {
                setDishs(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderCard = dishs.map((item: Dish, index: number) => {
        return (
            <TouchableOpacity
                key={index}
                style={styles.itemRecipe}
                onPress={() => navigation.navigate('Dish', { user: null, _id: item._id })}
            >
                <Image source={{ uri: item?.img }} style={styles.imgRecipe} resizeMode="cover" />
                <Text style={styles.nameRecipe} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={styles.ctnChef}>
                    <Image source={chef} style={styles.imgChef} />
                    <Text style={styles.nameChef}>Kitchen stories</Text>
                </View>
                <View style={styles.ctnHeart}>
                    <FontAwesomeIcon 
                        icon={(item.likes.includes(user._id) && user !== null && user._id !== '') ? heart : faHeart}
                        color= {
                            item.likes.includes(user._id) ? 'red' : '#212121'
                        }
                    />
                    <Text style={styles.textHeart}>{item.likes.length}</Text>
                </View>
            </TouchableOpacity>
        );
    });

    const handleOnPressCardType = (type: string) => {
        axios.get('https://7732-113-160-14-39.ngrok-free.app/dish/get-by-type', {
                params: {type: type}
            })
            .then(response => {
                const data = response.data;
                
                setDishs(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    Alert.alert(error.response.data.message);
                } else if (error.request) {
                    Alert.alert('Network error. Please check your internet connection.');
                } else {
                    Alert.alert('An unexpected error occurred. Please try again later.');
                }
            })
    }

    const handleOnPress = () => {
        setModalSearch(true);
    };

    if (!fontLoaded) {
        return null;
    }
    return modalSearch ? 
        (<Modal visible={true} transparent={true} animationType="slide">
            <LayoutSearch closeModal={() => setModalSearch(false)} navigation = {navigation} user = {user}/>
        </Modal>)
    :
        (<View style={styles.container}>
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false} bounces={false}>
                <View>
                    <Text style={styles.searchLabel}>Tìm kiếm</Text>
                </View>
                <View style={styles.searchView}>
                    <View style={styles.ctnSearch}>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size={18} color="#7d7d80" />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Tìm kiếm"
                            placeholderTextColor="#7d7d80"
                            style={styles.input}
                            cursorColor={'#65676b'}
                            onPressIn={handleOnPress}
                        />
                    </View>
                </View>

                <View style={styles.selectSearch}>
                    <TouchableOpacity style={styles.selectSearchChild} onPress={() => handleOnPressCardType('Mỳ')}>
                        <Image
                            source={require('../../../assets/images/My.png')}
                            resizeMode="contain"
                            style={styles.selectSearchChildImg}
                        />
                        <Text style={styles.selectSearchChildTxt}>Mỳ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.selectSearchChild} onPress={() => handleOnPressCardType('Tráng miệng')}>
                        <Image
                            source={require('../../../assets/images/trangmieng.png')}
                            resizeMode="contain"
                            style={styles.selectSearchChildImg}
                        />
                        <Text style={styles.selectSearchChildTxt}>Tráng miệng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectSearchChild} onPress={() => handleOnPressCardType('Món chay')}>
                        <Image
                            source={require('../../../assets/images/monchay.png')}
                            resizeMode="contain"
                            style={styles.selectSearchChildImg}
                        />
                        <Text style={styles.selectSearchChildTxt}>Món chay</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textSuggest}>Gợi ý</Text>
                <View style={styles.ctnSuggest}>{renderCard}</View>
            </ScrollView>
            <Footer navigation={navigation} address="Search" user={user} />
        </View>)
};

export default Search;
