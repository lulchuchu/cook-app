import React, { useEffect, useState } from 'react';
import { Image, Modal, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import styles from './styles';
const background = require('../../../assets/images/home_bg.jpeg');
const imageMess = require('../../../assets/images/message.png');
import Footer from '../../components/Footer/Footer';
import Diet from '../../layouts/SelectDiet/Diet';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Notice from '../../components/NoticeForm/Notice';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeProps {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
}

interface User {
    _id: string;
    email: string;
    username: string;
    img: string;
    tel: string;
    address: string;
    token: string;
    diet: string;
    emailVerified: boolean;
}

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
    const [user, setUser] = useState<User>({
        _id: '',
        email: '',
        username: '',
        img: '',
        tel: '',
        address: '',
        token: '',
        diet: '',
        emailVerified: false,
    });
    const [showDiet, setShowDiet] = useState(false);
    const [showNotice, setShowNotice] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    useEffect(() => {
        if (route.params.user) {
            setUser(route.params.user);
        }
        if (route.params.user !== null && route.params.prevAddress === 'Login') {
            setShowNotice(true);
        }
    }, [route.params.user, refreshing]);

    const handleClick = () => {
        if (route.params.user !== null) {
            setShowDiet(true);
        } else {
            navigation.navigate('Login', { address: 'Home' });
        }
    };

    if (showNotice) {
        setTimeout(() => setShowNotice(false), 2000);
    }

    if (!fontLoaded) {
        return null;
    }

    const onRefresh = () => {
        // Thực hiện các tác vụ cần thiết để làm mới dữ liệu
        setRefreshing(true);

        // Sau khi làm mới dữ liệu xong, set refreshing về false để dừng indicator
        setTimeout(() => {
            setRefreshing(false);
        }, 500); // Thời gian làm mới ở đây là 2000ms (2 giây)

        // Các tác vụ update dữ liệu ở đây...
    };

    return (
        <View style={styles.container}>
            <Modal transparent visible={showNotice} animationType="fade">
                <Notice type={'success'} text={'Bạn đã đăng nhập thành công!'} />
            </Modal>
            <View style={styles.ctnImage}>
                <Image source={background} resizeMode="cover" style={styles.image} />
            </View>
            {showDiet ? <Diet close={() => setShowDiet(false)} user={user} /> : ''}
            <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}
                // bounces={false}
                scrollEventThrottle={16}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                // onScroll={(event: any) => {
                //     const {y} = event.nativeEvent.contentOffset;
                //     console.log(y);
                // }}
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

                        <RecipeCard
                            navigation={navigation}
                            user={user}
                            api="dish/get-all"
                            params=""
                            refreshing={refreshing}
                        />

                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.textHeader}>Món ăn Việt Nam</Text>
                        </View>

                        <RecipeCard
                            navigation={navigation}
                            user={user}
                            api="dish/get-by-country"
                            params="Việt Nam"
                            refreshing={refreshing}
                        />
                        {user.diet !== '' && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.textHeader}>Món ăn theo chế độ</Text>
                            </View>
                        )}

                        {user.diet !== '' && (
                            <RecipeCard
                                navigation={navigation}
                                user={user}
                                api="dish/get-by-diet"
                                params={user.diet}
                                refreshing={refreshing}
                            />
                        )}
                        {user.diet === '' && (
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

                                <TouchableOpacity style={styles.btnGetStart} onPress={handleClick}>
                                    <Text style={styles.textGetStart}>Hãy bắt đầu từ đây</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation} address="Home" user={user} />
        </View>
    );
};

export default Home;
