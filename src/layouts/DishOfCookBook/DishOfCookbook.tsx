import axios from 'axios';
import { faChevronLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import {Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
const chef = require('../../../assets/images/chef.png');

type Props = {
    user: any;
    _idCookBook: string;
    navigation: any;
    cancel: () => void;
    name: string;
    updateCookBooks: () => void;
    updateDishOfCookBook: () => void;
};

interface Dish {
    _id: string;
    name: string;
    imgDes: string;
    likes: string[];
}

const DishOfCookbook: React.FC<Props> = ({ user, _idCookBook, navigation, cancel, name, updateCookBooks, updateDishOfCookBook }) => {
    const [listDish, setListDish] = useState<Dish[]>([]);
    const [modalDeleteDish, setModalDeleteDish] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [dishSelect, setDishSelect] = useState<Dish>({
        _id: '',
        name: '',
        imgDes: '',
        likes: []
    });

    useEffect(() => {
        axios
            .get('https://7732-113-160-14-39.ngrok-free.app/cook-book/get-all-dish-of-cookbook', {
                params: { idNhomMonAn: _idCookBook },
            })
            .then((response) => {
                setListDish(response.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const renderDish = listDish.map((item: Dish, index: number) => {
        return (
            <View
                key = {index}
                style={[styles.itemRecipe, { marginBottom: 32}]}
            >
                <TouchableOpacity onPress={() => navigation.navigate('Dish', { user: user, _id: item._id })}>
                    <Image source={{ uri: item?.imgDes }} style={styles.imgRecipe} resizeMode="cover" />
                    <Text style={styles.nameRecipe} lineBreakMode="tail" numberOfLines={1}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
                <View style={styles.ctnChef}>
                    <View style={styles.ctnChef}>
                        <Image source={chef} style={styles.imgChef} />
                        <Text style={styles.nameChef}>Kitchen stories</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setDishSelect(item);
                        setModalDeleteDish(true);
                    }}>
                        <FontAwesomeIcon icon={faTrashCan} size={14} color="#65676b" />
                    </TouchableOpacity>
                </View>
                <View style={styles.ctnHeart}>
                    <FontAwesomeIcon 
                        icon={(item.likes.includes(user._id) && user !== null && user._id !== '') ? heart : faHeart} 
                        color= {
                            item.likes.includes(user._id) ? 'red' : '#212121'
                        }
                    />
                    <Text style={styles.textHeart}>{item.likes.length}</Text>
                </View>
            </View>
        );
    });

    const handleDelete = () => {
        axios.delete('https://7732-113-160-14-39.ngrok-free.app/cook-book/erase', {
                data: {idCookBook: _idCookBook}
            })
            .then(response => {
                if (response.status === 200) {
                    updateCookBooks();
                }
            })
            .catch(err => {
                Alert.alert(err.message);
            })
            .finally(() => {
                cancel();
            })
    }

    const handleDeleteDish = () => {
        const body = {
            idNguoiDung: user?._id,
            idMonAn: dishSelect._id,
            idNhomMonAn: _idCookBook
        }
        axios.delete('https://7732-113-160-14-39.ngrok-free.app/cook-book/erase-dish', {
                data: body
            })
            .then(response => {
                if (response.status === 200) {
                    updateGroupDish();
                    updateDishOfCookBook();
                }
            })
            .catch(err => {
                Alert.alert(err.message);
            })
            .finally(() => {
                cancel();
            })
    }

    const updateGroupDish = () => {
        var arr = Array.from(listDish);
        arr = arr.filter(item => item._id !== dishSelect._id);
        setListDish(arr);
    }

    return (
        <View style={styles.ctn}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.btn, { marginLeft: -4 }]} onPress={cancel}>
                    <FontAwesomeIcon icon={faChevronLeft} size={22} />
                </TouchableOpacity>
                <Text style={styles.textCookBook}>{name}</Text>
                <TouchableOpacity style={styles.btn} onPress={() => setModalDelete(true)}>
                    <Text style={styles.textDelete}>Xóa</Text>
                </TouchableOpacity>
            </View>

            <ScrollView bounces = {false} showsVerticalScrollIndicator = {false}>
                <View style = {styles.body}>
                    {renderDish}
                </View>
            </ScrollView>

            {modalDelete && 
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalDelete}
                    onRequestClose={() => {
                        setModalDeleteDish(false);
                    }}
                >
                    <View
                        style={styles.ctnModal}
                    >
                        <ConfirmDelete
                            func = {handleDelete}
                            cancel={() => setModalDelete(false)}
                            text = {`Xóa cookbook "${name}"?`}
                        />
                    </View>
                </Modal>
            }

            {modalDeleteDish && 
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalDeleteDish}
                    onRequestClose={() => {
                        setModalDeleteDish(false);
                    }}
                >
                    <View
                        style={styles.ctnModal}
                    >
                        <ConfirmDelete
                            func = {handleDeleteDish}
                            cancel={() => setModalDeleteDish(false)}
                            text = {`Xóa ${dishSelect.name} khỏi danh sách?`}
                        />
                    </View>
                </Modal>
            }
        </View>
    );
};

export default DishOfCookbook;
