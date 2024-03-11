import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';

import styles from './style';

const chef = require('../../../assets/images/chef.png');
const meal = require('../../../assets/images/R1016-final-photo-1.jpg');

const PostItem : React.FC = () => {

    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    if (!fontLoaded) {
        return null;
    };

    return (
        <View style = {styles.container}>
            <View style = {styles.ctnHeader}>
                <View style = {styles.flexRow}>
                    <Image source={chef} resizeMode='contain' style = {styles.imageUser}/>
                    <View style = {styles.ctnInfor}>  
                        <Text style = {styles.nameUser}>Kitchen Stories</Text>
                        <Text style = {styles.timePosted}>3 ngày</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <FontAwesomeIcon icon = {faEllipsis} color='#65676b' size = {20}/>
                </TouchableOpacity>
            </View>

            <View style = {styles.ctnContent}>
                <Text style = {styles.textPost}>Hãy khám phá món mới của chúng tôi: Bánh hạnh nhân dừa</Text>
                <Image source={meal} resizeMode='cover' style = {styles.imageContent}/>
            </View>

            <View style = {styles.ctnInteracted}>
                <Text style = {styles.textInteracted}>12</Text>
                <Text style = {styles.textInteracted}>8 bình luận</Text>
                <Text style = {styles.textInteracted}>2 chia sẻ</Text>
            </View>

            <View>
                <TouchableOpacity>
                    <FontAwesomeIcon icon = {faThumbsUp}/>
                    <Text>Thích</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <FontAwesomeIcon icon = {faComment}/>
                    <Text>Bình luận</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <FontAwesomeIcon icon = {faShare}/>
                    <Text>Chia sẻ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostItem;