import React, { useEffect, useState, memo} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { faHouse, faMagnifyingGlass, faCartShopping, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import styles from './styles';
import { useFonts } from 'expo-font';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
    address: any;
};

const Footer: React.FC<Navigation> = ({ navigation, address}) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
    });

    const handleClick = (address: any) => {
        navigation.navigate(address);
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress ={() =>  handleClick("Home")}>
                <FontAwesomeIcon size={20} icon={faHouse} color={address === "Home" ? '#da7e4f' : '#747678'} />
                <Text style={address === "Home" ? styles.textClick : styles.text}>Trang chủ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress ={() =>  handleClick("Search")}>
                <FontAwesomeIcon size={20} icon={faMagnifyingGlass} color={address === "Search" ? '#da7e4f' : '#747678'} />
                <Text style={address === "Search" ? styles.textClick : styles.text}>Tìm kiếm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress ={() =>  handleClick("Community")}>
                <FontAwesomeIcon size={20} icon={faUsers} color={address === "Community" ? '#da7e4f' : '#747678'} />
                <Text style={address === "Community" ? styles.textClick : styles.text}>Cộng đồng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress ={() =>  handleClick("Cart")}>
                <FontAwesomeIcon size={20} icon={faCartShopping} color={address === "Cart" ? '#da7e4f' : '#747678'} />
                <Text style={address === "Cart" ? styles.textClick : styles.text}>Giỏ hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress ={() =>  handleClick("Profile")}>
                <FontAwesomeIcon size={20} icon={faUser} color={address === "Profile" ? '#da7e4f' : '#747678'} />
                <Text style={address === "Profile" ? styles.textClick : styles.text}>Cá nhân</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
// import React, { useMemo } from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';

// import { faUser } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


// import styles from './styles';
// import { faHouse, faMagnifyingGlass, faCartShopping, faUsers } from '@fortawesome/free-solid-svg-icons';
// // import { faHome, faSearch, faCommunity, faCart, faProfile } from '@fortawesome/free-solid-svg-icons';

// const Footer: React.FC<{ address: string }> = ({ address }) => {
//     const handleItemClick = (newAddress: string) => {
//     };

//     const renderFooterItem = (icon: any, label: string, targetAddress: string) => {
//         const isActive = address === targetAddress;

//         return (
//             <TouchableOpacity style={styles.item} onPress={() => handleItemClick(targetAddress)}>
//                 <FontAwesomeIcon size={20} icon={icon} color={isActive ? '#da7e4f' : '#747678'} />
//                 <Text style={isActive ? styles.textClick : styles.text}>{label}</Text>
//             </TouchableOpacity>
//         );
//     };

//     return useMemo(() => (
//         <View style={styles.container}>
//             {renderFooterItem(faHouse, 'Home', 'Home')}
//             {renderFooterItem(faMagnifyingGlass, 'Search', 'Search')}
//             {renderFooterItem(faUsers, 'Community', 'Community')}
//             {renderFooterItem(faCartShopping, 'Cart', 'Cart')}
//             {renderFooterItem(faUser, 'Profile', 'Profile')}
//         </View>
//     ), [address]);
// };

// export default Footer;

