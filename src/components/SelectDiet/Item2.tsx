import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';

type Func = {
    close: () => void;
}

const Item2: React.FC<Func> = ({close}) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.ctnIcon}>
                <TouchableOpacity style={styles.iconXMark} onPress={close}>
                    <FontAwesomeIcon icon={faXmark} size={20} color="#888" />
                </TouchableOpacity>
            </View>

            <View style={styles.paging}>
                <View style={styles.item1}></View>
                <View style={styles.item1}></View>
            </View>

            <View style={styles.ctnText}>
                <Text style={styles.textHeader2}>Nền ẩm thực yêu thích của tôi là...</Text>
            </View>

            <View style={styles.ctnSelect2}>
                <View style={styles.itemLeft}>
                    <TouchableOpacity style={styles.itemCountry}>
                        <Text style={styles.textCountry}>Việt Nam</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemCountry}>
                        <Text style={styles.textCountry}>Việt Nam</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemCountry}>
                        <Text style={styles.textCountry}>Việt Nam</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.itemRight}>
                    <TouchableOpacity style={styles.itemCountry}>
                        <Text style={styles.textCountry}>Việt Nam</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemCountry}>
                        <Text style={styles.textCountry}>Việt Nam</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemCountry}>
                        <Text style={styles.textCountry}>Việt Nam</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.btnSelectAll}>
                <Text style={styles.textCountry}>Chọn tất cả</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnSkip} onPress={close}>
                    <Text style={styles.textSkip}>Bỏ qua câu hỏi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnNext}>
                    <Text style={styles.textNext}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Item2;
