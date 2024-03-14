import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCircleExclamation,
    faStar,
    faComment,
    faGlobe,
    faBell,
    faThumbsUp,
    faCirclePlay,
    faCircleHalfStroke,
    faHouseSignal,
    faClipboardQuestion,
    faRotateLeft,
    faClipboard,
} from '@fortawesome/free-solid-svg-icons';

const cupImage = require('../../../assets/images/iconme.png');

type Navigation = {
    navigation: StackNavigationProp<RootStackParamList>;
};
const Setting: React.FC<Navigation> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>SYSTEM</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon style={styles.icon} icon={faGlobe} size={30} />
                    <Text style={styles.sectionTitle}>Languages</Text>
                </View>
                <View style={styles.section}>
                    <Image source={cupImage} style={{ width: 50, height: 50 }} resizeMode="cover" />
                    <Text style={styles.sectionTitle}>Measurement System</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon icon={faCirclePlay} style={styles.icon} size={30} />
                    <Text style={styles.sectionTitle}>Video Autoplay</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon style={styles.icon} icon={faBell} size={30} />
                    <Text style={styles.sectionTitle}>Notifications</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon icon={faCircleHalfStroke} style={styles.icon} size={30} />
                    <Text style={styles.sectionTitle}>Display</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>APPLIANCES</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon style={styles.icon} icon={faHouseSignal} size={30} />
                    <Text style={styles.sectionTitle}>Home Connect</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>MORE</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon style={styles.icon} icon={faClipboardQuestion} size={30} />
                    <Text style={styles.sectionTitle}>Recipe creation FAQs</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon style={styles.icon} icon={faCircleExclamation} size={30} />
                    <Text style={styles.sectionTitle}>Recipe creation FAQs</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon style={styles.icon} icon={faStar} size={30} />
                    <Text style={styles.sectionTitle}>Rate the app</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon style={styles.icon} icon={faComment} size={30} />
                    <Text style={styles.sectionTitle}>Feedback</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon style={styles.icon} icon={faThumbsUp} size={30} />
                    <Text style={styles.sectionTitle}>Tell a friend</Text>
                </View>
                <View style={styles.section}>
                    <FontAwesomeIcon style={styles.icon} icon={faClipboard} size={30} />
                    <Text style={styles.sectionTitle}>Legal Infomation</Text>
                </View>
                <View style={[styles.section, { paddingBottom: 50 }]}>
                    <FontAwesomeIcon style={styles.icon} icon={faRotateLeft} size={30} />
                    <Text style={styles.sectionTitle}>Restore purchases</Text>
                </View>
                {/* <TouchableOpacity style={styles.btnLogout}>
            <Text style={styles.btnLogout} onPress={handleLogout}>Đăng Xuất</Text>
        </TouchableOpacity> */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
    },
    title: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
    },
    section: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    icon: {
        color: '#000',
        marginRight: 10,
        marginLeft: 10,
    },
    sectionTitle: {
        fontSize: 18,
    },
    picker: {
        height: 50,
    },
    switch: {
        marginLeft: 10,
    },
    buttonContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Setting;
