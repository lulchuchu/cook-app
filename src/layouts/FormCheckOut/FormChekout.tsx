import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import Checkbox from 'expo-checkbox';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { faChevronLeft, faHouse, faSquarePhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import styles from './style';
import FormConfirm from '../../components/FomConfirm/FormConfirm';

type Func = {
    cancel: () => void;
};

const FormCheckOut: React.FC<Func> = ({ cancel }) => {
    const [fontLoaded] = useFonts({
        'Inconsolata-Bold': require('../../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-Medium': require('../../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    const [modalVisible, setModalVisible] = useState(false);

    if (!fontLoaded) {
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack} onPress={cancel}>
                    <FontAwesomeIcon icon={faChevronLeft} size={22} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Đơn hàng</Text>
                <View></View>
            </View>

            <ScrollView 
                style = {styles.ctnBody}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
            >
                <View style={styles.mb20}>
                    <Text style={styles.textTitle}>Nguyên liệu</Text>
                    <View style={styles.ctnItemIngre}>
                        <View>
                            <Text style={styles.nameIngre}>Socola</Text>
                            <Text style={styles.textQuantity}>Số lượng: 100g</Text>
                        </View>
                        <View>
                            <Checkbox value={true} />
                        </View>
                    </View>

                    <View style={styles.ctnItemIngre}>
                        <View>
                            <Text style={styles.nameIngre}>Trứng</Text>
                            <Text style={styles.textQuantity}>Số lượng: 4 quả</Text>
                        </View>
                        <View>
                            <Checkbox value={true} />
                        </View>
                    </View>

                    <View style={styles.ctnItemIngre}>
                        <View>
                            <Text style={styles.nameIngre}>Trứng</Text>
                            <Text style={styles.textQuantity}>Số lượng: 4 quả</Text>
                        </View>
                        <View>
                            <Checkbox value={true} />
                        </View>
                    </View>

                    <View style={styles.ctnItemIngre}>
                        <View>
                            <Text style={styles.nameIngre}>Trứng</Text>
                            <Text style={styles.textQuantity}>Số lượng: 4 quả</Text>
                        </View>
                        <View>
                            <Checkbox value={true} />
                        </View>
                    </View>
                </View>
                <View style={styles.mb32}>
                    <Text style={styles.textTitle}>Thông tin người nhận</Text>
                    <View style={styles.ctnInforCus}>
                        <View style={styles.flexRow}>
                            <Text style={styles.textIn}>Tên: </Text>
                            <Text style={styles.name}>Nguyễn Văn A</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <FontAwesomeIcon icon={faSquarePhone} size={20} color="#61b2e3" />
                            <Text style={styles.address}>0987654321</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <FontAwesomeIcon icon={faHouse} size={20} color="#00ab56" />
                            <Text style={styles.address}>Nguyễn Trãi - Hà Nội</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.mb32}>
                    <Text style={styles.textTitle}>Thông tin giao hàng</Text>
                    <View style={styles.ctnInforCus}>
                        <View style={styles.flexRow}>
                            <Text style={styles.textIn}>Nhân viên: </Text>
                            <Text style={styles.name}>Nguyễn Văn B</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <FontAwesomeIcon icon={faSquarePhone} size={20} color="#61b2e3" />
                            <Text style={styles.address}>0981234567</Text>
                        </View>

                        <View style={styles.flexRow}>
                            <FontAwesomeIcon icon={faClock} size={20} color="#61b2e3" />
                            <Text style={styles.address}>20 phút</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.ctnFooter}>
                <View>
                    <Text style={styles.textIn}>Tổng tiền</Text>
                    <Text style={styles.textMoney}>120.000đ</Text>
                </View>

                <TouchableOpacity style={styles.btnConfirm} onPress={() => setModalVisible(true)}>
                    <Text style={styles.textBtn}>Xác nhận</Text>
                </TouchableOpacity>
            </View>

            {modalVisible ? (
                <View style={styles.ctnModal}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                            }}
                        >
                            <FormConfirm cancelModal={() => setModalVisible(false)} />
                        </View>
                    </Modal>
                </View>
            ) : (
                ''
            )}
        </View>
    );
};

export default FormCheckOut;
