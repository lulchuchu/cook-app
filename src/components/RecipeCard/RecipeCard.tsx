import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './styles';
import axios from 'axios';
const chef = require('../../../assets/images/chef.png');

interface Item {
    img: string;
    _id: string;
    name: string;
    numberLike: number;
    type: string;
    country: string;
}

type Navigation = {
    navigation: any;
    user: any;
    api: string;
    params: string;
};

const RecipeCard: React.FC<Navigation> = ({ navigation, user, api, params }) => {
    const [data, setData] = useState<Item[]>([
        {
            img: 'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2FloadImage.jpg?alt=media&token=b8511f70-070d-4b1d-b1a6-f68daa2a6576',
            _id: '',
            name: '',
            numberLike: 0,
            type: '',
            country: '',
        },
    ]);

    useEffect(() => {
        axios
            .get(`http://192.168.34.109:3056/${api}`, {
                params: { key: params },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderCard = ({ item }: { item: Item }) => {
        return (
            <TouchableOpacity
                style={styles.itemRecipe}
                onPress={() => navigation.navigate('Recipe', { user: user, _id: item._id })}
            >
                <Image source={{ uri: item?.img }} style={styles.imgRecipe} resizeMode="cover" />
                <Text style={styles.nameRecipe}>{item.name}</Text>
                <View style={styles.ctnChef}>
                    <Image source={chef} style={styles.imgChef} />
                    <Text style={styles.nameChef}>Kitchen stories</Text>
                </View>
                <View style={styles.ctnHeart}>
                    <FontAwesomeIcon icon={faHeart} color="#212121" />
                    <Text style={styles.textHeart}>{item.numberLike}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ marginBottom: 40 }}>
            <FlatList data={data} renderItem={renderCard} horizontal showsHorizontalScrollIndicator={false} />
        </View>
    );
};

export default RecipeCard;
