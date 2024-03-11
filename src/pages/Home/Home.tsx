import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';
const background = require('../../../assets/images/home_bg.jpeg');
const imageMess = require('../../../assets/images/message.png');
const chef = require('../../../assets/images/chef.png');
import Footer from '../../components/Footer/Footer';
import Diet from '../../layouts/SelectDiet/Diet';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};
const Home: React.FC<Navigation> = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        Inconsolata: require('../../../assets/fonts/Inconsolata-Light.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [showDiet, setShowDiet] = useState(false);

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.ctnImage}>
                <Image source={background} resizeMode="cover" style={styles.image} />
            </View>
            {showDiet ? <Diet close={() => setShowDiet(false)} /> : ''}
            <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
            >
                <View style={styles.marginTop}></View>
                <View style={{ width: '100%' }}>
                    <View style={styles.ctnSuggest}>
                        <View style={styles.suggest}>
                            <Text style={styles.headerSuggest}>Bắt đầu một ngày mới với</Text>
                            <Text style={styles.textSuggest}>
                                Ý tưởng bữa sáng: Mẹo và công thức nấu ăn giúp bạn nâng cấp buổi sáng của mình
                            </Text>

                            <View style={styles.infoAuthor}>
                                <Text style={styles.author}>Kitchen Stories</Text>
                                <FontAwesomeIcon icon={faHeart} size={18} style={styles.iconHeart} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View>
                            <Text style={styles.textHeader}>Công thức nấu ăn mới nhất của chúng tôi</Text>
                            <TouchableOpacity style={styles.btnSeeAll}>
                                <Text style={styles.textAll}>Tất cả</Text>
                                <FontAwesomeIcon icon={faChevronRight} color="#da7e4f" size={14} />
                            </TouchableOpacity>
                        </View>

                        <RecipeCard navigation={navigation}/>
                        <View style={styles.ctnRecipeSelect}>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={styles.textHeader}>Công thức nấu ăn theo sở thích của bạn</Text>
                                    <Text style={styles.textInconsolata}>
                                        Nhận các công thức nấu ăn được cá nhân hóa của bạn trong 10 giây.
                                    </Text>
                                </View>
                                <View style={{ width: '30%' }}>
                                    <Image source={imageMess} resizeMode="cover" style={styles.imgMess} />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.btnGetStart} onPress={() => setShowDiet(true)}>
                                <Text style={styles.textGetStart}>Hãy bắt đầu từ đây</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation} address='Home'/>
        </View>
    );
};

export default Home;
