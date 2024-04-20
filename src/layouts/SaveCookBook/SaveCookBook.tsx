import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import styles from './style';
import CreateCookBook from '../CreateCookBook/CreateCookBook';
import axios from 'axios';
import Notice from 'components/NoticeForm/Notice';

const itemFood = require('../../../assets/images/bibimbap.png');

type Func = {
    showNotice: () => void;
    user: any;
    idDish: string;
    close: () => void;
};

interface CookBook {
    _id: string;
    dishs: number;
    name: string;
    user: string;
};

const SaveCookBook: React.FC<Func> = ({ showNotice, user, idDish, close }) => {
    const [showFormModal, setShow] = useState(false);
    const [cookBook, setCookBook] = useState<CookBook[]>([]);
    const [notice, showNoticeSuccess] = useState(false);

    useEffect(() => {
        axios
            .get('http://192.168.34.109:3056/cook-book/get-all-cookBook', {
                params: { idNguoiDung: user._id },
            })
            .then((response) => {
                if (response.status === 200) {
                    const cookBooks : CookBook[] = [];
                    for (const data of response.data) {
                        const dishs = data.numberDish;
                        const group = data.group;
                        const item : CookBook = {
                            _id: group?._id,
                            dishs: dishs,
                            name: group?.name,
                            user: group?.user
                        }
                        cookBooks.push(item);
                    }
                    setCookBook(cookBooks);   
                }
            })
            .catch((err) => {
                Alert.alert(err.message);
            });
    }, []);

    const updateCookBook = (data: CookBook) => {
        var arr = Array.from(cookBook);
        arr.unshift(data);
        setCookBook(arr);
    };

    const addDishToCookBook = (idCookBook: string) => {
        axios
            .post('http://192.168.34.109:3056/cook-book/add-dish', {
                idCookBook: idCookBook,
                idDish: idDish,
                idUser: user._id,
            })
            .then((res) => {
                if (res.status === 200) {
                    showNotice();
                    close();
                } else {
                    Alert.alert(res.data.message);
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
            })
    };

    const renderCookBook = cookBook.map((item: CookBook, index: number) => {
        return (
            <TouchableOpacity style={styles.ctnItem} onPress={() => addDishToCookBook(item._id)} key={index}>
                <Image source={itemFood} resizeMode="cover" style={styles.imgItem} />
                <Text style={styles.textItem}>{item.name}</Text>
                <Text style={styles.numberItem}>({item.dishs} công thức)</Text>
            </TouchableOpacity>
        );
    });

    if (notice) {
        setTimeout(() => {
            showNoticeSuccess(false);
        }, 2000);
    }

    return showFormModal ? (
        <CreateCookBook
            cancel={() => setShow(false)}
            user={user}
            idDish={idDish}
            updateCookBook={(data: CookBook) => updateCookBook(data)}
            showNotice = {() => showNoticeSuccess(true)}
        />
    ) : (
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={notice}>
                <Notice text="Bạn đã lưu món ăn thành công!" type="success" />
            </Modal>
            <View
                style={{
                    marginBottom: 20,
                }}
            >
                <Text style={styles.textInBold}>Lưu công thức</Text>
                {cookBook.length > 0 ? (
                    <Text style={[styles.textInBold, { fontSize: 18, color: '#65676b', marginTop: 20 }]}>
                        Công thức đã lưu
                    </Text>
                ) : (
                    <Text style={styles.textDes}>Bạn chưa có danh sách lưu công thức nấu ăn nào!</Text>
                )}
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 80,
                }}
            >
                {renderCookBook}
            </View>
            <View style={styles.ctnButton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setShow(true);
                    }}
                >
                    <Text style={styles.textBtn}>Tạo mới cookbook</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SaveCookBook;
