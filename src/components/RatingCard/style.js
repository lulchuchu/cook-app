import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    itemRating: {
        width: Dimensions.get('window').width - 32,
        marginLeft: 16,
        backgroundColor: '#f0f0f0',
        height: 180,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    ctnAuthor: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ctnRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 12
    },
    imgUser: {
        width: 28,
        height: 28,
        borderRadius: 50,
        marginRight: 12,
        borderColor: '#ccc',
        borderWidth: 0.2,
    },
    username: {
        fontFamily: 'Inconsolata-Bold',
        color: '#212121',
        fontSize: 17,
    },
    time: {
        fontFamily: 'Inconsolata-Medium',
        color: '#212121',
    }
});

export default styles;
