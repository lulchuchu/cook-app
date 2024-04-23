import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const emtyLike = require('../../../assets/images/empty-likes.png');
import styles from '../DishSaved/style';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';
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
            .get('https://7732-113-160-14-39.ngrok-free.app/user/get-dish-liked', {
                params: { user: user._id },
            })
            .then((response) => {
                setDishLiked(response.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const renderDish = dishLiked.map((item: DishInterface, index: number) => {
        return (
            <TouchableOpacity
                key = {index}
                style={[
                    styles.itemRecipeLiked,
                    {
                        marginBottom: 24,
                    },
                ]}
                onPress={() => navigation.navigate('Dish', { user: user, _id: item._id })}
            >
                <Image source={{ uri: item?.imgDes }} style={styles.imgRecipe} resizeMode="cover" />
                <Text style={styles.nameRecipe}>{item.name}</Text>
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

    return dishLiked.length > 0 ? (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 80,
            }}
        >
            {renderDish}
        </View>
    ) : (
        <View style={styles.ctnContent}>
            <Image source={emtyLike} resizeMode="contain" style={styles.imgEmty} />
            <Text style={styles.textDes}>Chưa có công thức nấu ăn nào trong danh sách yêu thích!</Text>
            <TouchableOpacity style={styles.btnSearch}
                onPress={() => navigation.navigate('Search', {user: user})}
            >
                <Text style={[styles.textCreate, { color: '#fff' }]}>Tiếp tục tìm kiếm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RecipeLiked;
