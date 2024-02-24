import React from 'react';
import { useFonts } from 'expo-font';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faStar, faBookmark } from '@fortawesome/free-regular-svg-icons';

import styles from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const imageIntro = require('../../../assets/images/R1016-final-photo-1.jpg');

const RecipeScreen: React.FC = () => {
    const [fontLoaded] = useFonts({
        Inconsolata: require('../../../assets/fonts/Inconsolata-Medium.ttf'),
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata_Condensed-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata_Condensed-Medium.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.ctnIntro}>
                    <Image source={imageIntro} style={styles.imgIntro} resizeMode="cover" />
                    <Text style={styles.textRecipe}>Bánh hạnh nhân dừa</Text>
                </View>

                <View style={styles.ctnInteract}>
                    <View style={styles.ctnRating}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <TouchableOpacity
                                // onPress={() => handleRatingChange(value)}
                                key={value}
                            >
                                {/* <Text
                                        style={{
                                            color: 'gray',
                                            fontSize: 20,
                                            marginHorizontal: 6
                                        }}
                                    >
                                        &#9733;
                                    </Text> */}
                                <FontAwesomeIcon
                                    icon={faStar}
                                    color="#212121"
                                    style={{ marginHorizontal: 6 }}
                                    size={17}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.numberRating}>0 đánh giá</Text>

                    <View style={styles.ctnSocial}>
                        <TouchableOpacity style={styles.btnSocial}>
                            <FontAwesomeIcon size={24} icon={faHeart} />
                            <Text style={styles.textSocial}>999</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSocial}>
                            <FontAwesomeIcon size={24} icon={faBookmark} />
                            <Text style={styles.textSocial}>Lưu</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSocial}>
                            <FontAwesomeIcon size={24} icon={faShareNodes} color="#444" />
                            <Text style={styles.textSocial}>Chia sẻ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <View>
                        <Image source={imageIntro} resizeMode="cover" />
                    </View>

                    <View>
                        <Text></Text>
                        <Text></Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default RecipeScreen;
