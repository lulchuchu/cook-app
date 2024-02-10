import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        top: 48,
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    textRegister: {
        fontFamily: 'Inconsolata-Bold',
        color: '#fff',
        fontSize: 22,
    },
    textSkip: {
        fontFamily: 'Inconsolata-Bold',
        color: '#fff',
        fontSize: 16,
    },
    form: {
        position: 'absolute',
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#ffe',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 8,
        marginVertical: 8,
        color: '#000',
        // fontFamily: 'Inconsolata',
        // fontSize: 17,
    },
    btnRegister: {
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 24,
        backgroundColor: '#458e6e',
        marginTop: 12,
        marginBottom: 20,
    },
    textBtnRegister: {
        color: '#fff',
        fontFamily: 'Inconsolata-Bold',
        textAlign: 'center',
        fontSize: 18,
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
        marginBottom: -40,
    },
    checkAccount: {
        fontFamily: 'Inconsolata-Bold',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 12,
    },
    linkLogin: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Inconsolata-Bold',
        textTransform: 'uppercase',
        color: '#da7e4f',
    },
});

export default styles;
