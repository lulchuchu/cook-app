import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ctnHeader: {
        paddingTop: 32,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 60,
    },
    btnCancel: {
        padding: 8,
    },
    textHeader: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
    },
    textIn: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
    },
    textInMedium: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        lineHeight: 24,
        marginTop: 48,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    ctnRating: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginVertical: 20,
    },
    ctnComment: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    ctnItem: {
        width: '100%',
        paddingHorizontal: 16,
    },
    userComment: {
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgUserCmt: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginRight: 12,
    },
    username: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        color: '#343434',
    },
    ctnTextCmt: {
        height: 120,
        marginTop: 12,
    },
    textCmt: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
        padding: 8,
        height: 100,
        lineHeight: 24,
    },
    buttonSend: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#2c5d48',
        width: 72,
        position: 'absolute',
        bottom: 12,
        right: 12,
    },
    focusInput: {
        borderColor: 'blue',
        borderWidth: 0.5,
        borderRadius: 10,
    },
    textInput: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
});

export default styles;
