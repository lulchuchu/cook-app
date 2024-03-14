import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';

import styles from './style';

const chef = require('../../../assets/images/chef.png');
const meal = require('../../../assets/images/R1016-final-photo-1.jpg');
const iconLike = require('../../../assets/images/facebook-reactions.png');

type Func = {
    func: () => void;
}

const PostItem: React.FC<Func> = ({func}) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.ctnHeader}>
                <View style={styles.flexRow}>
                    <Image source={chef} resizeMode="contain" style={styles.imageUser} />
                    <View style={styles.ctnInfor}>
                        <Text style={styles.nameUser}>Kitchen Stories</Text>
                        <Text style={styles.timePosted}>3 ngày</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <FontAwesomeIcon icon={faEllipsis} color="#65676b" size={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.ctnContent}>
                <Text style={styles.textPost}>Hãy khám phá công thức mới của chúng tôi: Bánh hạnh nhân dừa</Text>
                <Image source={meal} resizeMode="cover" style={styles.imageContent} />
            </View>

            <View style={styles.ctnInteracted}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={iconLike} resizeMode="cover" style={{ width: 24, height: 24, marginRight: 4 }} />
                    <Text style={styles.textInteracted}>12</Text>
                </View>
                <Text style={styles.textInteracted}>8 bình luận</Text>
                <Text style={styles.textInteracted}>2 chia sẻ</Text>
            </View>

            <View style={[styles.flexRow, { justifyContent: 'space-between', paddingHorizontal: 16 }]}>
                <TouchableOpacity style={styles.ctnButton}>
                    <FontAwesomeIcon icon={faThumbsUp} color="#65676b" size={18} />
                    <Text style={styles.textInteract}>Thích</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ctnButton} onPress={func}>
                    <FontAwesomeIcon icon={faComment} color="#65676b" size={18} />
                    <Text style={styles.textInteract}>Bình luận</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ctnButton}>
                    <FontAwesomeIcon icon={faShare} color="#65676b" size={18} />
                    <Text style={styles.textInteract}>Chia sẻ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostItem;
