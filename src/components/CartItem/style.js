import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 12,
    },
    item1: {
        width: '25%',
    },
    img: {
        width: '80%',
        height: 100,
        borderRadius: 10,
    },
    item2: {
        width: '50%',
        paddingRight: 16,
    },
    textName: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
    },
    textIngre: {
        fontFamily: 'Inconsolata-Medium',
        color: '#7d7d80',
        lineHeight: 16,
        marginTop: 8,
    },
    ctnCancel: {
        bottom: 4,
        position: 'absolute',
    },
    textCancel: {
        fontFamily: 'Inconsolata-Bold',
        color: '#d75348',
        fontSize: 16,
    },
    item3: {
        width: '25%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    textPrice: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        color: '#da7e4f',
    },
    imgShiper: {
        width: 24,
        height: 24,
    },
});

export default styles;
