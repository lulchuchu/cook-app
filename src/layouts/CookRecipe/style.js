import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
    },
    header: {
        height: 360,
        top: 0,
        width: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    btnClose: {
        position: 'absolute',
        top: 24,
        left: 20,
        zIndex: 10,
        padding: 8,
        borderRadius: 50,
        backgroundColor: '#fff',
    },
    body: {
        paddingTop: 20,
        paddingBottom: 60,
        paddingHorizontal: 16,
    },
    imgIcon: {
        width: 24,
        height: 24,
    },
    textIngreCook: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        marginLeft: 16,
        lineHeight: 26,
        width: '85%',
    },
    textDesCook: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        lineHeight: 26,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    itemFooter: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        backgroundColor: '#ccc',
        marginRight: 2,
    },
    itemClicked: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        backgroundColor: '#da7e4f',
    },
    lastItem: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        backgroundColor: '#ccc',
    },
    textStep: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
        marginBottom: 12,
    },
});

export default styles;
