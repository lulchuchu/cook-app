import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './styles';
import axios from 'axios';

type Func = {
    close: () => void;
    user: any;
};

const Item2: React.FC<Func> = ({ close, user }) => {
    const [arr, setArr] = useState([false, false, false, false, false, false]);
    const [all, setAll] = useState(false);
    const [country, setCountry] = useState<string[]>([]);

    const hanldeClick = (value: number, name: string) => {
        const newArr = Array.from(arr);
        var arrCountry = Array.from(country);
        if (arrCountry.includes(name)) {
            arrCountry = arrCountry.filter((item) => item !== name);
        } else {
            arrCountry.push(name);
        }
        setCountry(arrCountry);
        newArr[value] = !arr[value];
        setArr(newArr);
    };

    const selectAll = () => {
        if (!all) {
            setArr([true, true, true, true, true, true]);
            setCountry(['Việt Nam', 'Trung Quốc', 'Nhật Bản', 'Mỹ', 'Hàn Quốc', 'Thái Lan']);
            setAll(true);
        } else {
            setArr([false, false, false, false, false, false]);
            setCountry([]);
            setAll(false);
        }
    };

    const handleClick = () => {
        axios
            .post('http://192.168.34.109:3056/user/select-country', {
                _id: user._id,
                country,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data.message);
                } else if (error.request) {
                    console.log('Network error. Please check your internet connection.');
                } else {
                    console.log('An unexpected error occurred. Please try again later.');
                }
            })
            .finally(() => close());
    };

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
                    <TouchableOpacity
                        style={arr[0] ? styles.itemCountrySelect : styles.itemCountry}
                        onPress={() => hanldeClick(0, 'Việt Nam')}
                    >
                        <Text style={[styles.textCountry, arr[0] && { color: '#fff' }]}>Việt Nam</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={arr[1] ? styles.itemCountrySelect : styles.itemCountry}
                        onPress={() => hanldeClick(1, 'Trung Quốc')}
                    >
                        <Text style={[styles.textCountry, arr[1] && { color: '#fff' }]}>Trung Quốc</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={arr[2] ? styles.itemCountrySelect : styles.itemCountry}
                        onPress={() => hanldeClick(2, 'Nhật Bản')}
                    >
                        <Text style={[styles.textCountry, arr[2] && { color: '#fff' }]}>Nhật Bản</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.itemRight}>
                    <TouchableOpacity
                        style={arr[3] ? styles.itemCountrySelect : styles.itemCountry}
                        onPress={() => hanldeClick(3, 'Mỹ')}
                    >
                        <Text style={[styles.textCountry, arr[3] && { color: '#fff' }]}>Mỹ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={arr[4] ? styles.itemCountrySelect : styles.itemCountry}
                        onPress={() => hanldeClick(4, 'Hàn Quốc')}
                    >
                        <Text style={[styles.textCountry, arr[4] && { color: '#fff' }]}>Hàn Quốc</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={arr[5] ? styles.itemCountrySelect : styles.itemCountry}
                        onPress={() => hanldeClick(5, 'Thái Lan')}
                    >
                        <Text style={[styles.textCountry, arr[5] && { color: '#fff' }]}>Thái Lan</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.btnSelectAll} onPress={selectAll}>
                <Text style={styles.textCountry}>{!all ? 'Chọn tất cả' : 'Bỏ chọn tất cả'}</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnSkip} onPress={close}>
                    <Text style={styles.textSkip}>Bỏ qua câu hỏi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnNext} onPress={handleClick}>
                    <Text style={styles.textNext}>Hoàn tất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Item2;
