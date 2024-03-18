import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 8,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 32,
    },
    itemLeft: {
        width: '15%',
    },
    iteRight: {
        width: '85%',
    },
    ctnInfor: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    name: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        marginBottom: 6,
    },
    time: {
        fontFamily: 'Inconsolata-Bold',
        color: '#65676b',
    },
    ctnContent: {
        marginBottom: 20,
    },
    content: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 17,
        width: '80%',
        lineHeight: 24,
    },
    imgCmt: {
        height: 200,
        width: '100%',
        borderRadius: 16,
        marginTop: 16,
    },
    ctnInteract: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 140,
    },
    numberLike: {
        color: '#65676b',
        fontFamily: 'Inconsolata-Bold',
        fontSize: 16,
        marginLeft: 4,
    },
    ctnRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default styles;
