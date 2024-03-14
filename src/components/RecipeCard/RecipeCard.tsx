import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './styles';
import { useFonts } from 'expo-font';
const background = require('../../../assets/images/home_bg.jpeg');
const chef = require('../../../assets/images/chef.png');

interface Item {
    uri: string;
}

type Navigation = {
    navigation: any;
};

const RecipeCard: React.FC<Navigation> = ({ navigation }) => {
    const [data, setData] = useState<Item[]>([
        { uri: require('../../../assets/images/chef.png') },
        { uri: require('../../../assets/images/chef.png') },
        { uri: require('../../../assets/images/chef.png') },
        { uri: require('../../../assets/images/chef.png') },
        { uri: require('../../../assets/images/chef.png') },
    ]);

    const [fontLoaded] = useFonts({
        Inconsolata: require('../../../assets/fonts/Inconsolata-Light.ttf'),
    });

    const renderCard = ({ item }: { item: Item }) => {
        return (
            <TouchableOpacity style={styles.itemRecipe} onPress={() => navigation.navigate('Recipe')}>
                <Image source={background} style={styles.imgRecipe} resizeMode="cover" />
                <Text style={styles.nameRecipe}>Phở Việt Nam</Text>
                <View style={styles.ctnChef}>
                    <Image source={chef} style={styles.imgChef} />
                    <Text style={styles.nameChef}>Kitchen stories</Text>
                </View>
                <View style={styles.ctnHeart}>
                    <FontAwesomeIcon icon={faHeart} color="#212121" />
                    <Text style={styles.textHeart}>10</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (!fontLoaded) {
        return null;
    }
    return (
        <View>
            <FlatList data={data} renderItem={renderCard} horizontal showsHorizontalScrollIndicator={false} />
        </View>
    );
};

export default RecipeCard;
