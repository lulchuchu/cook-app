import React from "react";
import { Text, View } from "react-native";
import { faHouse, faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import styles from "./styles";
import { useFonts } from "expo-font";

const Footer : React.FC = () => {

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata': require('../../../assets/fonts/Inconsolata-Black.ttf'),
    });

    if (!fontLoaded) {
        return null;
    };

    return (
        <View style = {styles.container}>
            <View style = {styles.item}>
                <FontAwesomeIcon size={20} icon = {faHouse} color="#da7e4f"/>
                <Text style = {[styles.text, {color: '#da7e4f'}]}>Trang chủ</Text>
            </View>

            <View style = {styles.item}>
                <FontAwesomeIcon size={20} icon = {faMagnifyingGlass} color="#747678"/>
                <Text style = {styles.text}>Tìm kiếm</Text>
            </View>

            <View style = {styles.item}>
                <FontAwesomeIcon size={20} icon = {faUser} color="#747678"/>
                <Text style = {styles.text}>Cá nhân</Text>
            </View>
        </View>
    );
};

export default Footer;