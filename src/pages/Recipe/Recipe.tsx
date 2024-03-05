import React, { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import {
    faShareNodes,
    faChevronDown,
    faCartShopping,
    faPlus,
    faMinus,
    faChevronUp,
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faStar, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

import styles from './style';
const imageIntro = require('../../../assets/images/R1016-final-photo-1.jpg');
const ingredient = require('../../../assets/images/ingredients.png');
const cook = require('../../../assets/images/pan.png');
import FormRating from '../../layouts/FormRating/FormRating';

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const RecipeScreen: React.FC<Navigation> = ({ navigation }) => {
    const [fontLoaded] = useFonts({
        Inconsolata: require('../../../assets/fonts/Inconsolata_Expanded-Medium.ttf'),
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata_Condensed-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata_Condensed-Medium.ttf'),
        Other: require('../../../assets/fonts/Inconsolata-Bold.ttf'),
    });

    const quantityIngredients = ['200 g', '4', '200 g', '1', '1', '¼ tsp', '100 g'];
    const ingredients = [
        'dừa vụn không đường',
        'lòng trắng trứng',
        'đường',
        'quả chanh',
        'vanilla',
        'muối',
        'socola (để trang trí)',
    ];

    const scrollViewRef = useRef<ScrollView>(null);
    const targetComponentRef = useRef<View>(null);
    const [extend, setExtend] = useState(false);
    const [yScroll, setY] = useState(0);
    const [showButtonCook, setShowCook] = useState(false);
    const [showFormRating, setShowForm] = useState(false);

    const renderQuantity = quantityIngredients.map((quantity: string, index: number) => {
        return (
            <Text key={index} style={styles.textIngredients}>
                {quantity}
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

    const handleBack = () => {
        navigation.navigate('Home');
    };

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
                            <TouchableOpacity style={styles.btnSocial}>
                                <FontAwesomeIcon size={24} icon={faHeart} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnSocial}>
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

            <View style={styles.ctnIntro}>
                <Image source={imageIntro} style={styles.imgIntro} resizeMode="cover" />
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
                    <Text style={styles.textRecipe}>Bánh hạnh nhân dừa</Text>
                    <View style={styles.ctnRating}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <TouchableOpacity key={value}>
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

                    <TouchableOpacity onPress={() => setShowForm(true)}>
                        <Text style={styles.numberRating}>chưa có đánh giá</Text>
                    </TouchableOpacity>

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

                <View style={styles.ctnChef}>
                    <View>
                        <Image source={imageIntro} resizeMode="cover" style={styles.imgChef} />
                    </View>

                    <View style={styles.ctnInfoChef}>
                        <Text style={styles.nameChef}>Name chef</Text>
                        <Text style={styles.addressWork}>Đầu bếp tại Kitchen Stories</Text>
                    </View>
                </View>

                <View style={styles.ctnDesRecipe}>
                    <Text style={styles.textDesRecipe} numberOfLines={extend ? 0 : 4} ellipsizeMode="tail">
                        "Bánh hạnh nhân dừa thực sự là một món nướng kinh điển trong dịp Giáng sinh. Thử thách là làm
                        cho chúng siêu mềm và ẩm, vì nếu không chúng có thể trở nên khô và cứng và có xu hướng vỡ ra chỉ
                        khi nhìn vào chúng. Nhưng với công thức bánh hạnh nhân dừa tuyệt vời này, mọi nỗ lực chắc chắn
                        sẽ thành công kể từ bây giờ. Việc chuẩn bị rất đơn giản và phù hợp hoàn toàn với mùa Mùa Vọng
                        thường căng thẳng. Sau một số thử nghiệm, cuối cùng tôi đã tìm ra công thức làm bánh hạnh nhân
                        dừa ngon nhất của mình - dễ dàng, dễ thích nghi và tất nhiên là rất ngon và ẩm! Công thức cơ bản
                        cho những chiếc bánh hạnh nhân dừa đơn giản này chỉ bao gồm ba nguyên liệu: Dừa vụn, lòng trắng
                        trứng và đường. Các nguyên liệu còn lại ít nhiều tùy chọn, tùy theo sở thích cá nhân và mong
                        muốn có thêm hương vị. Tôi đã chọn kiểu cổ điển ở đây có vani và chanh zingy. Không thể bỏ qua
                        biến thể chanh - chanh cân bằng hoàn hảo giữa đường và dừa để tạo nên một sự kết hợp thực sự làm
                        hài lòng đám đông. Nếu bạn đang vội, bạn có thể chỉ cần đặt những chiếc bánh hạnh nhân phủ sô cô
                        la vào trong tủ lạnh sẽ nguội nhanh.”
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

                <View style={styles.ctnReviews}>
                    <View style={styles.headingReview}>
                        <Text style={styles.textHeadingReview}>Đánh giá</Text>
                        <TouchableOpacity>
                            <Text style={[styles.textShowMore, { fontSize: 20, fontFamily: 'Inconsolata-Medium' }]}>
                                Đọc
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 8 }}>
                        <Text style={[styles.numberRating, { marginBottom: 0, color: '#555' }]}>0 bình luận</Text>
                    </View>
                </View>

                <View style={styles.ctnIngredients}>
                    <Text style={styles.textHeadingReview}>Nguyên liệu</Text>

                    <View style={styles.ctnAdjust}>
                        <Text style={styles.numberAdjust}>20 chiếc</Text>
                        <View style={styles.adjustQuantity}>
                            <TouchableOpacity style={styles.btnAdjust}>
                                <FontAwesomeIcon icon={faMinus} />
                            </TouchableOpacity>
                            <Text style={styles.textAdjust}>20</Text>
                            <TouchableOpacity style={styles.btnAdjust}>
                                <FontAwesomeIcon icon={faPlus} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.renderIngredients}>
                        <View style={styles.itemLeft}>{renderQuantity}</View>

                        <View style={styles.itemRight}>{renderIngredients}</View>
                    </View>

                    <View style={styles.ctnButtonAddToCart}>
                        <TouchableOpacity style={styles.buttonAddToCart}>
                            <Text style={[styles.textCooking, { marginRight: 4 }]}>Thêm vào</Text>
                            <FontAwesomeIcon icon={faCartShopping} color="#fff" size={18} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ctnIngredients}>
                    <Text style={styles.textHeadingReview}>Dụng cụ</Text>
                    <Text style={styles.textUtensils}>
                        dụng cụ bào mịn, dao, thớt, bát (lớn), máy trộn cầm tay có que đánh, màng bọc thực phẩm, lò
                        nướng, khay nướng, giấy nến, muỗng múc kem (tùy chọn), nồi (nhỏ), tô (nhỏ)
                    </Text>
                </View>

                <View style={styles.ctnIngredients} ref={targetComponentRef} onLayout={() => {}}>
                    <Text style={styles.textHeadingReview}>Dinh dưỡng mỗi khẩu phần</Text>

                    <View style={styles.ctnNutrition}>
                        <View>
                            <Text style={styles.textNutition}>Cal</Text>
                            <Text style={styles.textNutition}>133</Text>
                        </View>
                        <View>
                            <Text style={styles.textNutition}>Fat</Text>
                            <Text style={styles.textNutition}>8 g</Text>
                        </View>
                        <View>
                            <Text style={styles.textNutition}>Protein</Text>
                            <Text style={styles.textNutition}>1 g</Text>
                        </View>
                        <View>
                            <Text style={styles.textNutition}>Carb</Text>
                            <Text style={styles.textNutition}>16 g</Text>
                        </View>
                    </View>

                    <View style={styles.ctnCookStep}>
                        <Text style={styles.textStep}>Bước 1/3</Text>
                        <Image source={imageIntro} resizeMode="cover" style={styles.imgStep} />
                        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                            <Image style={styles.imgIcon} source={ingredient} />
                            <Text style={styles.textIngreCook}>
                                1 quả chanh - 1 đậu vani - 4 lòng trắng trứng - 200 g đường - ¼ thìa cà phê muối - 200 g
                                dừa nạo không đường
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                            <Image style={styles.imgIcon} source={cook} />
                            <Text style={styles.textIngreCook}>
                                máy xay mịn - dao - thớt - bát (lớn) - máy trộn cầm tay có que đánh - bọc nhựa
                            </Text>
                        </View>

                        <Text style={styles.textDesCook}>
                            Nghiền mịn vỏ chanh và ép lấy nước. Cạo đậu vani. Trong một tô lớn, đánh lòng trắng trứng,
                            vỏ chanh và nước cốt, đường, bột vani và muối bằng máy trộn cầm tay có máy đánh trứng. Thêm
                            dừa nạo vào và trộn vào. Dùng màng bọc thực phẩm bọc lại và để trong tủ lạnh khoảng 10 phút.
                        </Text>
                    </View>

                    <View style={styles.ctnCookStep}>
                        <Text style={styles.textStep}>Bước 2/3</Text>
                        <Image source={imageIntro} resizeMode="cover" style={styles.imgStep} />

                        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                            <Image style={styles.imgIcon} source={cook} />
                            <Text style={styles.textIngreCook}>
                                lò nướng - khay nướng - giấy nến múc kem (tùy chọn)
                            </Text>
                        </View>

                        <Text style={styles.textDesCook}>
                            Làm nóng lò ở nhiệt độ đối lưu 165°C/330°F (hoặc nhiệt độ trên-dưới 185°C/365°F). Dòng một
                            tấm nướng bánh bằng giấy giấy da. Dùng muỗng hoặc thìa múc kem nhẹ nhàng nặn hỗn hợp dừa
                            thành 20 hình nón nhỏ rồi đặt lên khay nướng. Chuyển vào lò nướng và nướng trên giá giữa
                            trong khoảng. 10–15 phút. Bánh hạnh nhân nên có màu nâu nhạt nhưng vẫn hơi mềm. Lấy ra khỏi
                            lò và để nguội hoàn toàn. Chỉ sau đó cẩn thận loại bỏ khỏi giấy da.
                        </Text>
                    </View>

                    <View style={styles.ctnCookStep}>
                        <Text style={styles.textStep}>Bước 3/3</Text>
                        <Image source={imageIntro} resizeMode="cover" style={styles.imgStep} />
                        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                            <Image style={styles.imgIcon} source={ingredient} />
                            <Text style={styles.textIngreCook}>100g socola (để trang trí)</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                            <Image style={styles.imgIcon} source={cook} />
                            <Text style={styles.textIngreCook}>nồi (nhỏ)- bát (nhỏ)</Text>
                        </View>

                        <Text style={styles.textDesCook}>
                            Đập sô-cô-la vào tô và đun chảy trên nước sốt bain-marie. Nhúng mặt phẳng của bánh hạnh nhân
                            vào sô cô la tan chảy và đặt lên giấy da. Ngoài ra, bạn có thể múc một ít sô-cô-la lên giấy
                            nướng bánh và đặt mặt phẳng bánh hạnh nhân xuống trên rồi để nguội. Trang trí với sô cô la
                            còn lại như mong muốn.
                        </Text>
                    </View>

                    <View style={styles.ctnCookStep}>
                        <Text style={[styles.textStep, { marginBottom: 24 }]}>Thưởng thức ngon miệng nhé!</Text>
                        <Image source={imageIntro} resizeMode="cover" style={styles.imgStep} />
                    </View>
                </View>
            </ScrollView>

            {showButtonCook ? (
                <View style={styles.ctnButtonCook}>
                    <TouchableOpacity style={styles.buttonStartCook}>
                        <Text style={styles.textCooking}>Bắt đầu nấu!</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                ''
            )}
        </View>
    ) : (
        <FormRating cancelFunc={() => setShowForm(false)} />
    );
};

export default RecipeScreen;
