import React, { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import {
    View,
    ScrollView,
    Share,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Alert,
    Dimensions,
} from 'react-native';
import {
    faShareNodes,
    faChevronDown,
    faCartShopping,
    faPlus,
    faMinus,
    faChevronUp,
    faChevronLeft,
    faPlay,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { Video } from 'expo-av';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';

import styles from './style';
const imageIntro = require('../../../assets/images/chef.png');
const ingredient = require('../../../assets/images/ingredients.png');
const cook = require('../../../assets/images/pan.png');
import FormRating from '../../layouts/FormRating/FormRating';
import DiscussDish from '../../layouts/DiscussDish/DiscussDish';
import SaveCookBook from '../../layouts/SaveCookBook/SaveCookBook';
import CookRecipe from '../../layouts/CookRecipe/CookRecipe';
import Notice from 'components/NoticeForm/Notice';
import RatingCard from 'components/RatingCard/RatingCard';

type Route = RouteProp<RootStackParamList, 'Dish'>;

interface RecipeProps {
    navigation: StackNavigationProp<RootStackParamList>;
    route: Route;
}

interface User {
    _id: string;
    email: string;
    username: string;
    img: string;
    tel: string;
    address: string;
    token: string;
    emailVerified: boolean;
}

interface Step {
    time: number;
    img: string;
    ingredients: string;
    utenils: string;
    des: string;
}

interface Nuttrition {
    Cal: number;
    Fat: string;
    Protein: string;
    Carb: string;
}

interface Recipe {
    name: string;
    video: string;
    imgDes: string;
    description: string;
    country: string;
    type: string;
    likes: string[];
    defaultPortion: number;
    ingredients: string;
    utensils: string;
    step: Step[];
}

interface UserCmt {
    _id: string;
    username: string;
    img: string;
}

interface Comment {
    _id: string;
    idDish: string;
    user: UserCmt;
    content: string;
    img: string;
    likes: string[];
    createdAt: string;
}

interface Rating {
    _id: string;
    dish: string;
    account: UserRating;
    score: number;
    img: string;
    content: string;
    createdAt: string;
}

interface UserRating {
    _id: string;
    username: string;
    img: string;
}

interface DataRated {
    _id: string;
    score: number;
    content: string;
    uri: string;
}

const Dish: React.FC<RecipeProps> = ({ navigation, route }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata_Condensed-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata_Condensed-Medium.ttf'),
    });
    const [quantityIngredient, setQunatityIngre] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState([]);
    const [unitIngre, setUnitIngre] = useState([]);

    const [recipe, setRecipe] = useState<Recipe>({
        name: '',
        video: '',
        imgDes: 'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2FloadImage.jpg?alt=media&token=b8511f70-070d-4b1d-b1a6-f68daa2a6576',
        description: '',
        country: '',
        type: '',
        likes: [],
        defaultPortion: 0,
        ingredients: '',
        utensils: '',
        step: [],
    });
    const [nutrition, setNuttrition] = useState<Nuttrition>({
        Cal: 0,
        Fat: '',
        Protein: '',
        Carb: '',
    });
    const [user, setUser] = useState<User>({
        _id: '',
        email: '',
        username: '',
        img: '',
        tel: '',
        address: '',
        token: '',
        emailVerified: false,
    });
    const scrollViewRef = useRef<ScrollView>(null);
    const targetComponentRef = useRef<View>(null);
    const [extend, setExtend] = useState(false);
    const [yScroll, setY] = useState(0);
    const [showButtonCook, setShowCook] = useState(false);
    const [showFormRating, setShowForm] = useState(false);
    const [showComment, setShowCmt] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [notice, setNotice] = useState(false);
    const [defaultPortion, setDefaultPortion] = useState(0);
    const [ration, setRation] = useState(0);
    const [isLike, setLike] = useState(false);
    const [numberLike, setNumberLike] = useState(0);
    const [showStepCook, setShowStepCook] = useState(false);
    const [checkAdd, setCheckAdd] = useState(false);
    const videoRef = useRef<Video>(null);
    const [modalVideo, setModalVideo] = useState(false);
    const [checkRating, setCheckRating] = useState(false);
    const [scoreRating, setScoreRating] = useState<number>(0);
    const [listRating, setListRating] = useState<Rating[]>([]);
    const [listCmt, setListCmt] = useState<Comment[]>([]);
    const [isRated, setIsRated] = useState(false);
    const [dataRated, setDataRated] = useState<DataRated>({
        _id: '',
        score: 0,
        content: '',
        uri: ''
    });

    useEffect(() => {
        if (route.params.user) {
            setUser(route.params.user);
        }
        axios
            .get('https://7732-113-160-14-39.ngrok-free.app/dish/get-detail', {
                params: { _id: route.params._id },
            })
            .then((response) => {
                const recipe = response.data;
                setRecipe(recipe);
                setNumberLike(recipe.likes.length);
                setDefaultPortion(recipe.defaultPortion);
                setRation(recipe.defaultPortion);
                const nutrition: Nuttrition = recipe.nuttrition
                setNuttrition(nutrition);
                const ingredient = recipe.ingredients;
                setIngredients(ingredient.name);
                setQunatityIngre(ingredient.quantity);
                setUnitIngre(ingredient.unit);
                if (recipe.likes.includes(route.params.user._id) && route.params.user._id !== '') {
                    setLike(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get('https://7732-113-160-14-39.ngrok-free.app/rating-dish/get-rating', {
                params: { idMonAn: route.params._id },
            })
            .then((response) => {
                const data = response.data;
                if (data.trungBinhDanhGia !== null) {
                    setScoreRating(data.trungBinhDanhGia);
                    setListRating(data.list_danh_gia);
                    const list = data.list_danh_gia;
                    for (const item of list) {
                        if (item.account._id === route.params.user._id) {
                            setIsRated(true);
                            setDataRated({
                                _id: item._id,
                                score: item.score,
                                content: item.content,
                                uri: item.img
                            });
                            break;
                        }
                    };
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        axios
            .get('https://7732-113-160-14-39.ngrok-free.app/comment-dish/get-all', {
                params: { idDish: route.params._id },
            })
            .then((response) => {
                if (response.status === 200) {
                    setListCmt(response.data);
                }
            })
            .catch((error) => {
                if (error.response) {
                    Alert.alert(error.response.data.message);
                } else if (error.request) {
                    Alert.alert('Network error. Please check your internet connection.');
                } else {
                    Alert.alert('An unexpected error occurred. Please try again later.');
                }
            });
    }, []);

    const renderQuantity = quantityIngredient.map((quantity: string, index: number) => {
        return (
            <Text key={index} style={styles.textIngredients}>
                {quantity} {unitIngre[index]}
            </Text>
        );
    });

    const renderIngredients = ingredients.map((ingredient: string, index: number) => {
        return (
            <Text key={index} style={styles.textIngredients}>
                {ingredient}
            </Text>
        );
    });

    const renderStepCook = recipe.step.map((step: Step, index: number) => {
        return (
            <View style={styles.ctnCookStep} key={index}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.textStep}>
                        Bước {index + 1}/{recipe.step.length}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        {/* <FontAwesomeIcon icon={faClock} size={20} style={{ marginBottom: 10 }} /> */}
                        {/* {step.time && <Text style={[styles.textStep, { color: '#da7e4f', marginLeft: 6 }]}>{formatTime(step.time)}</Text>} */}
                    </View>
                </View>
                {step.img ? (
                    <Image
                        source={{
                            uri: step.img
                                ? step.img
                                : 'https://firebasestorage.googleapis.com/v0/b/kitchenstories-7031c.appspot.com/o/images%2FloadImage.jpg?alt=media&token=b8511f70-070d-4b1d-b1a6-f68daa2a6576',
                        }}
                        resizeMode="cover"
                        style={styles.imgStep}
                    />
                ) : null}

                {step.ingredients && (
                    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                        <Image style={styles.imgIcon} source={ingredient} />
                        <Text style={styles.textIngreCook}>{step.ingredients}</Text>
                    </View>
                )}

                {step.utenils && (
                    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                        <Image style={styles.imgIcon} source={cook} />
                        <Text style={styles.textIngreCook}>{step.utenils}</Text>
                    </View>
                )}

                <Text style={styles.textDesCook}>{step.des}</Text>
            </View>
        );
    });

    const handleScroll = (event: any) => {
        if (targetComponentRef.current) {
            const { y } = event.nativeEvent.contentOffset;
            setY(y);
            const scrollY = event.nativeEvent.contentOffset.y;
            targetComponentRef.current.measure((x, y, width, height, pageX, pageY) => {
                const componentTop = pageY;

                setShowCook(componentTop <= scrollY);
            });
        }
    };

    const handleSharing = async () => {
        try {
            const result = await Share.share({
                message: 'Công thức này rất tuyệt: Bánh hạnh nhân dừa',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('shared with activity type of: ', result.activityType);
                } else {
                    console.log('Shared');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Shared dis');
            }
        } catch (error) {
            console.log('Shared error: ', error);
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleLike = () => {
        if (user !== null  && user._id !== '') {
            axios
                .post('https://7732-113-160-14-39.ngrok-free.app/dish/like-dish', {
                    idNguoiDung: route.params.user._id,
                    idMonAn: route.params._id,
                })
                .then()
                .catch((error) => {
                    if (error.response) {
                        Alert.alert(error.response.data.message);
                    } else if (error.request) {
                        Alert.alert('Network error. Please check your internet connection.');
                    } else {
                        Alert.alert('An unexpected error occurred. Please try again later.');
                    }
                });
            setLike(!isLike);
            if (isLike) {
                setNumberLike(numberLike - 1);
            } else {
                setNumberLike(numberLike + 1);
            }
        }
        else {
            Alert.alert('Bạn cần đăng nhập!');
        }
    };

    const hanldeAddToCart = () => {
        if (user.token) {
            axios
                .post('https://7732-113-160-14-39.ngrok-free.app/user/add-to-cart', {
                    img: recipe.imgDes,
                    nameDish: recipe.name,
                    idDish: route.params._id,
                    idUser: user._id,
                    idIngre: recipe.ingredients,
                    meal: recipe.defaultPortion,
                })
                .then((response) => {
                    if (response.status === 200) {
                        setCheckAdd(true);
                    }
                    else {
                        Alert.alert(response.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        Alert.alert(error.response.data.message);
                    } else if (error.request) {
                        Alert.alert('Network error. Please check your internet connection.');
                    } else {
                        Alert.alert('An unexpected error occurred. Please try again later.');
                    }
                });
        } else {
            navigation.navigate('Login', { address: 'Recipe' });
        }
    };

    const increaseRations = () => {
        if (defaultPortion === ration * 5) {
            return;
        }
        setDefaultPortion(defaultPortion + 1);
        var arr = Array.from(quantityIngredient);
        for (let i = 0; i < arr.length; i++) {
            if (Number.isNaN(parseInt(arr[i]) * 2)) {
                arr[i] = arr[i];
            } else {
                arr[i] = (parseInt(arr[i]) * 2).toString();
            }
        }
        setQunatityIngre(arr);
    };

    const reduceRation = () => {
        if (defaultPortion === ration) {
            return;
        }
        setDefaultPortion(defaultPortion - 1);
        var arr = Array.from(quantityIngredient);
        for (let i = 0; i < arr.length; i++) {
            if (Number.isNaN(parseInt(arr[i]) / 2)) {
                arr[i] = arr[i];
            } else {
                arr[i] = (parseInt(arr[i]) / 2).toString();
            }
        }
        setQunatityIngre(arr);
    };

    const updateRating = (rating: Rating) => {
        if (isRated) {
            var arr = Array.from(listRating);
            for (const item of arr) {
                if (item._id === rating._id) {
                    item.content = rating.content;
                    item.img = rating.img;
                    item.score = rating.score;
                    break;
                }
            }
            setListRating(arr);
            setCheckRating(true);
            setScoreRating(Number((scoreRating * listRating.length - dataRated.score + rating.score) / arr.length));
        }
        else {
            var arr = Array.from(listRating);
            arr = [rating, ...arr];
            setListRating(arr);
            setCheckRating(true);
            setScoreRating(Number((scoreRating * listRating.length + rating.score) / arr.length));
        }
    };

    const updateComment = (comment: Comment) => {
        var arr = Array.from(listCmt);
        arr = [comment, ...arr];
        setListCmt(arr);
    };

    if (notice) {
        setTimeout(() => {
            setNotice(false);
        }, 2000);
    }

    if (checkAdd) {
        setTimeout(() => {
            setCheckAdd(false);
        }, 2000);
    }

    if (checkRating) {
        setTimeout(() => {
            setCheckRating(false);
        }, 2000);
    }

    if (!fontLoaded) {
        return null;
    }

    return !showFormRating ? (
        <View style={styles.container}>
            {yScroll >= 52 ? (
                <View style={styles.ctnSocialOnScroll}>
                    <TouchableOpacity style={{ paddingHorizontal: 8, paddingVertical: 12 }} onPress={handleBack}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24} />
                    </TouchableOpacity>

                    {yScroll >= 518 ? (
                        <View style={styles.ctnSocial}>
                            <TouchableOpacity style={styles.btnSocial} onPress={handleLike}>
                                <FontAwesomeIcon
                                    size={24}
                                    icon={isLike ? heart : faHeart}
                                    color={isLike ? 'red' : '#212121'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnSocial} onPress={() => setShowModal(true)}>
                                <FontAwesomeIcon size={24} icon={faBookmark} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnSocial}>
                                <FontAwesomeIcon size={24} icon={faShareNodes} color="#444" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.ctnSocial}></View>
                    )}
                </View>
            ) : (
                <View style={styles.ctnButtonBack}>
                    <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24} />
                    </TouchableOpacity>
                </View>
            )}

            {showComment && (
                <DiscussDish
                    cancel={() => setShowCmt(false)}
                    idDish={route.params._id}
                    user={user}
                    data={listCmt}
                    updateCmt={(cmt: Comment) => updateComment(cmt)}
                />
            )}
            <Modal animationType="slide" transparent={true} visible={showStepCook}>
                <CookRecipe data={recipe.step} close={() => setShowStepCook(false)} img = {recipe.imgDes}/>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={checkAdd}>
                <Notice text="Bạn đã thêm nguyên liệu thành công!" type="success" />
            </Modal>

            <Modal animationType="slide" transparent={true} visible={checkRating}>
                <Notice text="Bạn đã đánh giá thành công!" type="success" />
            </Modal>

            <Modal transparent={true} visible={modalVideo} animationType="slide">
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        bottom: 0,
                        zIndex: 10000,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#000',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 24,
                            left: 12,
                            padding: 4,
                        }}
                        onPress={() => setModalVideo(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} color="#fff" size={24} />
                    </TouchableOpacity>
                    <Video
                        source={{ uri: recipe.video }}
                        shouldPlay
                        ref={videoRef}
                        style={{
                            width: Dimensions.get('window').width,
                            height: 320,
                        }}
                        useNativeControls
                    />
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={notice}>
                <Notice text="Bạn đã lưu món ăn thành công!" type="success" />
            </Modal>
            {showModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setShowModal(false)} style={styles.overlay}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>
                    <SaveCookBook
                        showNotice={() => setNotice(true)}
                        user={route.params.user}
                        idDish={route.params._id}
                        close={() => setShowModal(false)}
                    />
                </Modal>
            )}

            {recipe.video && (
                <TouchableOpacity
                    style={[styles.ctnButtonPlay, yScroll >= 120 ? { zIndex: 15 } : {}]}
                    onPress={() => setModalVideo(true)}
                >
                    <FontAwesomeIcon icon={faPlay} color="#fff" size={48} />
                </TouchableOpacity>
            )}
            <View style={styles.ctnIntro}>
                <Image source={{ uri: recipe.imgDes }} style={styles.imgIntro} resizeMode="cover" />
            </View>
            <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}
                bounces={false}
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.marginTop}></View>
                <View style={styles.ctnInteract}>
                    <Text style={styles.textRecipe} numberOfLines={2}>
                        {recipe.name}
                    </Text>
                    <TouchableOpacity 
                        style = {{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setShowForm(true)}
                    >
                        <View style={styles.ctnRating}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Text
                                    style={{
                                        color: value <= scoreRating ? '#ffc400' : 'gray',
                                        fontSize: 24,
                                        marginHorizontal: 6,
                                    }}
                                    key = {value}
                                >
                                    &#9733;
                                </Text>
                            ))}
                        </View>

                        <Text style={styles.numberRating}>
                            {listRating.length > 0 ? `dựa trên ${listRating.length} đánh giá` : 'chưa có đánh giá'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.ctnSocial}>
                        <TouchableOpacity style={styles.btnSocial} onPress={handleLike}>
                            <FontAwesomeIcon
                                size={24}
                                icon={isLike ? heart : faHeart}
                                color={isLike ? '#fa384f' : '#212121'}
                            />
                            <Text style={styles.textSocial}>{numberLike}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSocial} onPress={() => setShowModal(true)}>
                            <FontAwesomeIcon size={24} icon={faBookmark} />
                            <Text style={styles.textSocial}>Lưu</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSocial} onPress={handleSharing}>
                            <FontAwesomeIcon size={24} icon={faShareNodes} color="#444" />
                            <Text style={styles.textSocial}>Chia sẻ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ctnChef}>
                    <View>
                        <Image source={imageIntro} resizeMode="cover" style={styles.imgChef} />
                    </View>

                    <View style={styles.ctnInfoChef}>
                        <Text style={styles.nameChef}>Kitchen Stories</Text>
                        <Text style={styles.addressWork}>Đầu bếp tại Kitchen Stories</Text>
                    </View>
                </View>

                <View style={styles.ctnDesRecipe}>
                    <Text style={styles.textDesRecipe} numberOfLines={extend ? 0 : 4} ellipsizeMode="tail">
                        "{recipe.description}"
                    </Text>

                    {!extend ? (
                        <TouchableOpacity style={styles.btnShowMore} onPress={() => setExtend(true)}>
                            <Text style={styles.textShowMore}>Đọc thêm</Text>
                            <FontAwesomeIcon icon={faChevronDown} color="#da7e4f" size={15} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.btnShowMore} onPress={() => setExtend(false)}>
                            <Text style={styles.textShowMore}>Thu lại</Text>
                            <FontAwesomeIcon icon={faChevronUp} color="#da7e4f" size={15} />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={[styles.ctnReviews, {paddingHorizontal: 0}]}>
                    <View style={[styles.headingReview, {paddingHorizontal: 16}]}>
                        <Text style={styles.textHeadingReview}>Đánh giá</Text>
                    </View>
                    {listRating.length === 0 ? <View style={{ marginTop: 8, paddingLeft: 16 }}>
                        <Text style={[styles.numberRating, { marginBottom: 0, color: '#212121' }]}>
                            Chưa có đánh giá nào!
                        </Text>
                    </View>
                    : <RatingCard data = {listRating}/>}
                </View>

                <View style={styles.ctnReviews}>
                    <View style={styles.headingReview}>
                        <Text style={styles.textHeadingReview}>Thảo luận</Text>
                        <TouchableOpacity onPress={() => setShowCmt(true)}>
                            <Text style={[styles.textShowMore, { fontSize: 20, fontFamily: 'Inconsolata-Medium' }]}>
                                Đọc
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 8 }}>
                        <Text style={[styles.numberRating, { marginBottom: 0, color: '#555' }]}>
                            {listCmt.length} bình luận
                        </Text>
                    </View>
                </View>

                <View style={styles.ctnIngredients}>
                    <Text style={styles.textHeadingReview}>Nguyên liệu</Text>

                    <View style={styles.ctnAdjust}>
                        <Text style={styles.numberAdjust}>{defaultPortion} phần</Text>
                        <View style={styles.adjustQuantity}>
                            <TouchableOpacity style={styles.btnAdjust} onPress={reduceRation}>
                                <FontAwesomeIcon icon={faMinus} />
                            </TouchableOpacity>
                            <Text style={styles.textAdjust}>{defaultPortion}</Text>
                            <TouchableOpacity style={styles.btnAdjust} onPress={increaseRations}>
                                <FontAwesomeIcon icon={faPlus} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.renderIngredients}>
                        <View style={styles.itemLeft}>{renderQuantity}</View>

                        <View style={styles.itemRight}>{renderIngredients}</View>
                    </View>

                    <View style={styles.ctnButtonAddToCart}>
                        <TouchableOpacity style={styles.buttonAddToCart} onPress={hanldeAddToCart}>
                            <Text style={[styles.textCooking, { marginRight: 4 }]}>Thêm vào</Text>
                            <FontAwesomeIcon icon={faCartShopping} color="#fff" size={18} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ctnIngredients}>
                    <Text style={styles.textHeadingReview}>Dụng cụ</Text>
                    <Text style={styles.textUtensils}>{recipe.utensils}</Text>
                </View>

                <View style={styles.ctnIngredients} ref={targetComponentRef} onLayout={() => {}}>
                    <Text style={styles.textHeadingReview}>Dinh dưỡng mỗi khẩu phần</Text>

                    <View style={styles.ctnNutrition}>
                        <View>
                            <Text style={styles.textNutition}>Cal</Text>
                            <Text style={styles.textNutition}>{nutrition.Cal}</Text>
                        </View>
                        <View>
                            <Text style={styles.textNutition}>Fat</Text>
                            <Text style={styles.textNutition}>{nutrition.Fat}</Text>
                        </View>
                        <View>
                            <Text style={styles.textNutition}>Protein</Text>
                            <Text style={styles.textNutition}>{nutrition.Protein}</Text>
                        </View>
                        <View>
                            <Text style={styles.textNutition}>Carb</Text>
                            <Text style={styles.textNutition}>{nutrition.Carb}</Text>
                        </View>
                    </View>

                    <View style={styles.ctnCookStep}>{renderStepCook}</View>
                    <View style={styles.ctnCookStep}>
                        <Text style={[styles.textStep, { marginBottom: 24 }]}>Thưởng thức ngon miệng nhé!</Text>
                        <Image source={{ uri: recipe.imgDes }} resizeMode="cover" style={styles.imgStep} />
                    </View>
                </View>
            </ScrollView>

            {showButtonCook ? (
                <View style={styles.ctnButtonCook}>
                    <TouchableOpacity style={styles.buttonStartCook} onPress={() => setShowStepCook(true)}>
                        <Text style={styles.textCooking}>Bắt đầu nấu!</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                ''
            )}
        </View>
    ) : (
        <FormRating
            cancelFunc={() => setShowForm(false)}
            user={user}
            idDish={route.params._id}
            updateRating={(rating: Rating) => updateRating(rating)}
            dataRated = {dataRated}
            updateDataRated = {(data: DataRated) => setDataRated(data)}
        />
    );
};

export default Dish;
