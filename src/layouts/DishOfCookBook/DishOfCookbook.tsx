import { faChevronLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
const chef = require('../../../assets/images/chef.png');

type Props = {
    user: any;
    _idCookBook: string;
    navigation: any;
    cancel: () => void;
};

interface Dish {
    _id: string;
    name: string;
    imgDes: string;
    likes: string[];
}

const DishOfCookbook: React.FC<Props> = ({ user, _idCookBook, navigation, cancel }) => {
    const [listDish, setListDish] = useState<Dish[]>([]);

    useEffect(() => {
        axios
            .get('http://192.168.34.109:3056/cook-book/get-all-dish-of-cookbook', {
                params: { idNhomMonAn: _idCookBook },
            })
            .then((response) => {
                setListDish(response.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const renderDish = ({ item }: { item: Dish }) => {
        return (
            <TouchableOpacity
                style={[styles.itemRecipe, { marginBottom: 24 }]}
                onPress={() => navigation.navigate('Recipe', { user: user, _id: item._id })}
            >
                <Image source={{ uri: item?.imgDes }} style={styles.imgRecipe} resizeMode="cover" />
                <Text style={styles.nameRecipe} lineBreakMode="tail" numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={styles.ctnChef}>
                    <View style={styles.ctnChef}>
                        <Image source={chef} style={styles.imgChef} />
                        <Text style={styles.nameChef}>Kitchen stories</Text>
                    </View>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faEllipsisVertical} size={18} color="#65676b" />
                    </TouchableOpacity>
                </View>
                <View style={styles.ctnHeart}>
                    <FontAwesomeIcon icon={faHeart} color="#212121" />
                    <Text style={styles.textHeart}>{item.likes.length}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.ctn}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.btn, { marginLeft: -4 }]} onPress={cancel}>
                    <FontAwesomeIcon icon={faChevronLeft} size={22} />
                </TouchableOpacity>
                <Text style={styles.textCookBook}>CookBook</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.textDelete}>Xóa</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={listDish}
                renderItem={renderDish}
                numColumns={2}
                keyExtractor={(item, index) => `${item._id}`}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 20,
                }}
            />
        </View>
    );
};

export default DishOfCookbook;
