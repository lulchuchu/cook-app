import { faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native';

import styles from './style';
const ingredient = require('../../../assets/images/ingredients.png');
const cook = require('../../../assets/images/pan.png');

interface Step {
    time: number;
    img: string;
    ingredients: string;
    utenils: string;
    des: string;
}

type Props = {
    data: Step[];
    close: () => void;
};

const CookRecipe: React.FC<Props> = ({ data, close }) => {
    const [stepNumber, setStepNumber] = useState(0);
    const [initTime, setInittime] = useState(data[stepNumber].time);
    const { width: widthDevice } = Dimensions.get('window');

    useEffect(() => {
        setTimeout(() => {
            const intervalId = setInterval(() => {
                if (initTime > 0) {
                    setInittime((prevTime) => prevTime - 1);
                } else {
                    clearInterval(intervalId);
                }
            }, 1000);

            return () => clearInterval(intervalId);
        });
    }, [initTime]);

    const renderFooter = data.map((step: Step, index: number) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => handleClick(index)}
                style={[
                    index <= stepNumber
                        ? styles.itemClicked
                        : index === data.length - 1
                          ? styles.lastItem
                          : styles.itemFooter,
                    { width: (widthDevice - (data.length - 1) * 2) / data.length },
                ]}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 16,
                    }}
                >
                    0{index + 1}
                </Text>
            </TouchableOpacity>
        );
    });

    const handleClick = (number: number) => {
        setStepNumber(number);
        setInittime(data[number].time);
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnClose} onPress={close}>
                    <FontAwesomeIcon icon={faXmark} />
                </TouchableOpacity>
                <Image
                    style={styles.img}
                    source={{
                        uri: data[stepNumber].img
                            ? data[stepNumber].img
                            : 'https://images.services.kitchenstories.io/GM9vE3FlOLksxLpKyEF0GyViT1s=/640x0/filters:quality(80)/images.kitchenstories.io/wagtailOriginalImages/R1628_final_photo_309.jpg',
                    }}
                    resizeMode="cover"
                />
            </View>

            <ScrollView>
                <View style={styles.body}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 8,
                        }}
                    >
                        <FontAwesomeIcon icon={faClock} size={20} style={{ marginBottom: 10 }} />
                        {data[stepNumber].time && (
                            <Text style={[styles.textStep, { color: '#da7e4f', marginLeft: 6 }]}>
                                {formatTime(initTime)}
                            </Text>
                        )}
                    </View>
                    {data[stepNumber].ingredients && (
                        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                            <Image style={styles.imgIcon} source={ingredient} />
                            <Text style={styles.textIngreCook}>{data[stepNumber].ingredients}</Text>
                        </View>
                    )}

                    {data[stepNumber].utenils && (
                        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                            <Image style={styles.imgIcon} source={cook} />
                            <Text style={styles.textIngreCook}>{data[stepNumber].utenils}</Text>
                        </View>
                    )}

                    <View>
                        <Text style={styles.textDesCook}>{data[stepNumber].des}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>{renderFooter}</View>
        </View>
    );
};

export default CookRecipe;
