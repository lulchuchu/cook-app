import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const emtyLike = require('../../../assets/images/empty-likes.png');
import styles from '../RecipeSaved/style';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const chef = require('../../../assets/images/chef.png');

type Props = {
    user: any;
    navigation: any;
};

interface DishInterface {
    _id: string;
    name: string;
    imgDes: string;
    likes: string[];
}

const RecipeLiked: React.FC<Props> = ({ user, navigation }) => {
    const [dishLiked, setDishLiked] = useState<DishInterface[]>([]);

    useEffect(() => {
        axios
            .get('http://192.168.34.109:3056/user/get-dish-liked', {
                params: { user: user._id },
            })
            .then((response) => {
                setDishLiked(response.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const renderDish = ({ item }: { item: DishInterface }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.itemRecipe,
                    {
                        marginBottom: 24,
                    },
                ]}
                onPress={() => navigation.navigate('Recipe', { user: user, _id: item._id })}
            >
                <Image source={{ uri: item?.imgDes }} style={styles.imgRecipe} resizeMode="cover" />
                <Text style={styles.nameRecipe}>{item.name}</Text>
                <View style={styles.ctnChef}>
                    <Image source={chef} style={styles.imgChef} />
                    <Text style={styles.nameChef}>Kitchen stories</Text>
                </View>
                <View style={styles.ctnHeart}>
                    <FontAwesomeIcon icon={faHeart} color="#212121" />
                    <Text style={styles.textHeart}>{item.likes.length}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return dishLiked.length > 0 ? (
        <FlatList
            data={dishLiked}
            renderItem={renderDish}
            numColumns={2}
            keyExtractor={(item, index) => `${item._id}`}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20,
            }}
        />
    ) : (
        <View style={styles.ctnContent}>
            <Image source={emtyLike} resizeMode="contain" style={styles.imgEmty} />
            <Text style={styles.textDes}>Chưa có công thức nấu ăn nào trong danh sách yêu thích!</Text>
            <TouchableOpacity style={styles.btnSearch}>
                <Text style={[styles.textCreate, { color: '#fff' }]}>Tiếp tục tìm kiếm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RecipeLiked;
