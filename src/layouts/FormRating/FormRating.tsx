import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './styles';
const chef = require('../../../assets/images/chef.png');
const camera = require('../../../assets/images/camera.png');

type FuncCancel = {
    cancelFunc: () => void;
};

const FormRating: React.FC<FuncCancel> = ({ cancelFunc }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata_Condensed-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata_Condensed-Medium.ttf'),
    });
    const [isFocused, setIsFocused] = useState(false);
    const [rating, setRating] = useState(0);

    const handleRating = (value: number) => {
        if (value === 1 && rating === 1) {
            setRating(0);
        } else {
            setRating(value);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.ctnHeader}>
                <TouchableOpacity style={styles.btnCancel} onPress={cancelFunc}>
                    <Text style={[styles.textIn, { color: '#fc642d' }]}>Thoát</Text>
                </TouchableOpacity>

                <Text style={styles.textHeader}>Đánh giá</Text>

                <TouchableOpacity style={styles.btnCancel} onPress={rating > 0 ? cancelFunc : () => {}}>
                    <Text style={[styles.textIn, { color: rating > 0 ? '#fc642d' : '#686868' }]}>Gửi</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.textHeader, { textAlign: 'center' }]}>Bạn đã thử nó? Đưa ra đánh giá!</Text>

            <View style={styles.ctnRating}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                        <Text
                            style={{
                                color: rating >= value ? 'gold' : 'gray',
                                fontSize: 28,
                                marginHorizontal: 6,
                            }}
                        >
                            &#9733;
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.textInMedium}>
                Bạn có phản hồi hoặc lời khuyên về công thức này chi tiết hơn cho cộng đồng của chúng tôi? Hãy chia sẻ
                nó bên dưới.
            </Text>

            <View style={styles.ctnItem}>
                <View style={styles.ctnComment}>
                    <View style={styles.userComment}>
                        <Image source={chef} resizeMode="cover" style={styles.imgUserCmt} />
                        <Text style={styles.username}>username</Text>
                    </View>

                    <View style={styles.ctnTextCmt}>
                        <TextInput
                            editable
                            multiline
                            placeholder="Ừm! Tôi đã thêm một chút...(tùy chọn)"
                            placeholderTextColor={'#868686'}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={[styles.textCmt, isFocused && styles.focusInput]}
                        />
                    </View>

                    <TouchableOpacity style={{ width: 40, padding: 8 }}>
                        <Image source={camera} resizeMode="contain" style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default FormRating;
