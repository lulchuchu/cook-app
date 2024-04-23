import { faChevronLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import debounce from 'lodash.debounce';

import styles from './style';
type Props = {
    closeModal: () => void;
    navigation: any;
    user: any;
};
interface Dish {
    _id: string;
    imgDes: string;
    name: string;
}

const LayoutSearch: React.FC<Props> = ({ closeModal, navigation, user }) => {
    const [animation] = useState(new Animated.Value(0.8)); // Initial animated value
    const inputRef = useRef<TextInput>(null);
    const [dataDish, setDataDish] = useState<Dish[]>([]);
    const [textInput, setTextInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
        // Run animation when component mounts
        Animated.timing(animation, {
            toValue: 1, // Target value
            duration: 1000, // Duration in milliseconds
            useNativeDriver: true, // Use native driver for performance
        }).start(); // Start the animation
    }, []);

    const renderDish = dataDish.map((dish: Dish, index: number) => {
        return (
            <TouchableOpacity key = {index} style = {{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
                paddingVertical: 4,
            }}
            onPress={() => {
                closeModal();
                navigation.navigate('Dish', {user: user, _id: dish?._id})
            }}
            >
                <Image source={{uri: dish.imgDes}} 
                    resizeMode='cover' 
                    style = {{
                        width: 48, height: 48, borderRadius: 12
                    }}
                />
                <Text style = {styles.textNameDish} numberOfLines={1}>{dish.name}</Text>
            </TouchableOpacity>
        )
    });

    const handleSearch = (text: string) => {
        setLoading(true);
        setTextInput(text);
        debounceFn();
        setTimeout(() => {
            axios.get('https://7732-113-160-14-39.ngrok-free.app/dish/search', {
                    params: {key: text}
                })
                .then(response => {
                    setDataDish(response.data);
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
                .finally(() => {
                    setLoading(false);
                })
        }, 1000);
    };

    const debounceFn = debounce(() => {
    }, 500); 

    return (
        <View style = {styles.container}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        opacity: animation, // Use animated value for opacity
                        transform: [
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <TouchableOpacity onPress={closeModal} style = {styles.buttonBack}>
                        <FontAwesomeIcon icon={faChevronLeft} size={22}/>
                    </TouchableOpacity>
                    <View style={styles.ctnSearch}>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size={18} color="#7d7d80" />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Tìm kiếm"
                            placeholderTextColor="#7d7d80"
                            style={styles.input}
                            cursorColor='#7d7d80'
                            ref = {inputRef}
                            onChangeText={(text) => handleSearch(text)}
                        />
                    </View>
                </View>
            </Animated.View>

            <ScrollView bounces = {false}>
                <View style = {{width: '100%'}}>
                    {renderDish}
                    {(dataDish.length === 0 && textInput.length > 0 && !loading) && <Text style = {styles.textNotFound}>Không tìm thấy món ăn!</Text>}
                </View>
                {loading && <ActivityIndicator size="large" color="#da7e4f"/>}
            </ScrollView>

        </View>
    );
};

export default LayoutSearch;
