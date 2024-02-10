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
        top: 0,
        paddingTop: 48,
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
    content: {
        top: 120,
        width: '85%',
        position: 'absolute',
        bottom: 20,
    },
    btnApple: {
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 12,
        alignItems: 'center'
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
    separate: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        width: '40%',
        paddingBottom: 12,
        borderTopColor: '#fff',
        borderTopWidth: 1
    },
    textOr: {
        width: '20%',
        textAlign: 'center',
        paddingBottom: 12,
        color: '#fff',
        fontFamily: 'Inconsolata',
    },
    form: {
        width:"100%",
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
        position: 'relative',
        // fontFamily: 'Inconsolata',
        // fontSize: 16,
    },
    iconEye: {
        position: 'absolute',
        top: 88,
        right: 16,
        paddingHorizontal: 2,
        paddingVertical: 2
    },
    btnLogin: {
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 24,
        backgroundColor: '#458e6e',
        marginTop: 40,
        marginBottom: 32,
    },
    textBtnLogin: {
        color: '#fff',
        fontFamily: 'Inconsolata-Bold',
        textAlign: 'center',
        fontSize: 18,
    },
    resetPass: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textReset: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inconsolata-Bold',
        marginBottom: 18
    },
    btnReset: {
        fontSize: 18,
        color: '#da7e4f',
        textTransform: 'uppercase',
        fontFamily: 'Inconsolata-Bold',
    },
    paging: {
        width: '100%',
        height: 1,
        backgroundColor: '#fff',
        marginVertical: 32
    }
});

export default styles;