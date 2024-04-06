import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        bottom: 0,
        position: 'absolute',
        zIndex: 10,
        height: '85%',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#0a9b70',
        borderWidth: 1,
        borderRadius: 20,
        width: 200,
    },
    ctnButton: {
        position: 'absolute',
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 28,
        width: '100%',
    },
    textInBold: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 24,
    },
    textBtn: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 19,
        textAlign: 'center',
        color: '#0a9b70',
    },
    textDes: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 16,
        width: '80%',
        marginTop: 8,
        lineHeight: 24,
        color: '#0a9b70',
    },
    ctnItem: {
        width: '45%',
        height: 200,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderColor: '#0a9b70',
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgItem: {
        width: 100,
        height: 100,
    },
    textItem: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        marginTop: 8,
    },
    numberItem: {
        fontFamily: 'Inconsolata-Bold',
        color: '#65676b',
        marginTop: 4,
    },
    notice: {
        position: 'absolute',
        top: 40,
        right: 16,
    },
});

export default styles;
