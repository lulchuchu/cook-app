import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import styles from "./styles";
import Footer from "../../components/Footer/Footer";
const background = require("../../../assets/images/home_bg.jpeg");
const chef = require('../../../assets/images/chef.png');

const Home : React.FC = () => {

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata': require('../../../assets/fonts/Inconsolata-Black.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf')
    });

    if (!fontLoaded) {
        return null;
    };

    return (
        <View style = {styles.container}>
            <View style = {styles.ctnImage}>
                <Image source={background} resizeMode="cover" style = {styles.image}/>
            </View>
            <ScrollView 
                style = {styles.body}
                showsVerticalScrollIndicator = {false}
                bounces = {false}
                scrollEventThrottle={16}
            >
                <View style = {styles.marginTop}></View>
                <View style = {{width: '100%'}}>
                    <View style = {styles.ctnSuggest}>
                        <View style = {styles.suggest}>
                            <Text style = {styles.headerSuggest}>Bắt đầu một ngày mới với</Text>
                            <Text style = {styles.textSuggest}>Ý tưởng bữa sáng: Mẹo và công thức nấu ăn giúp bạn nâng cấp buổi sáng của mình</Text>
                            
                            <View style = {styles.infoAuthor}>
                                <Text style = {styles.author}>Kitchen Stories</Text>
                                <FontAwesomeIcon icon = {faHeart} size={18} style={styles.iconHeart}/>
                            </View>
                        </View>
                    </View>

                    <View style = {styles.content}>
                        <Text style = {styles.textHeader}>Công thức nấu ăn mới nhất của chúng tôi</Text>
                        <TouchableOpacity style = {styles.btnSeeAll}>
                            <Text style = {styles.textAll}>Tất cả</Text>
                            <FontAwesomeIcon icon = {faChevronRight} color="#da7e4f" size={14}/>
                        </TouchableOpacity>

                        <View style = {styles.itemRecipe}>
                            <Image source={background} style = {styles.imgRecipe} resizeMode="cover"/>
                            <Text style = {styles.nameRecipe}>Phở Việt Nam</Text>
                            <View style = {styles.ctnChef}>
                                <Image source={chef} style = {styles.imgChef}/>
                                <Text style = {styles.nameChef}>Kitchen stories</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <Footer/>
        </View>
    );
};

export default Home;