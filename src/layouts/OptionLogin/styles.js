import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundVideo: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    header: {
        top: 48,
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    textSkip: {
        fontFamily: 'Inconsolata-Bold',
        color: '#fff',
        fontSize: 16,
    },
    content: {
        position: 'absolute',
        width: '85%',
    },
    textSignUp: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 40,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 16,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 24,
        fontFamily: 'Inconsolata-Bold',
        marginBottom: 40,
    },
    btnApple: {
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    iconApple: {
        marginRight: 8,
    },
    textApple: {
        fontWeight: '600',
    },
    btnFacebook: {
        width: '100%',
        backgroundColor: '#415792',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    textFacebook: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 8
    },
    imgIcon: {
        width: 20,
        height: 20
    },
    btnEmail: {
        width: '100%',
        backgroundColor: '#458e6e',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    textRole: {
        color: '#fff',
        fontFamily: 'Inconsolata',
        textAlign: 'center',
        lineHeight: 20,
    },
    textUnderline: {
        textDecorationLine: 'underline',
        color: '#fff',
        fontFamily: 'Inconsolata',
    },
    footer: {
        marginTop: 60,
        marginBottom: -100,
    },
    checkAccount: {
        fontFamily: 'Inconsolata-Bold',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 8,
    },
    linkLogin: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Inconsolata-Bold',
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
    },
});

export default styles;
