import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        top: 80,
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    textHeader: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
    },
    button: {
        padding: 4,
    },
    ctnbody: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBody: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'justify',
    },
    img: {
        height: 120,
        marginBottom: 12,
    },
    ctnInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textIn: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        marginBottom: 20,
        marginTop: 12,
    },
    input: {
        borderColor: '#212121',
        borderWidth: 1,
        width: 36,
        height: 40,
        marginHorizontal: 6,
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
        textAlign: 'center',
        // color: '#55bf72'
    },
    ctnFooter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
    },
    btnVerify: {
        width: 120,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#55bf72',
        marginHorizontal: 28,
    },
    textVerify: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
    },
    time: {
        fontFamily: 'Inconsolata-Bold',
        color: '#da7e4f',
        fontSize: 18,
        marginTop: 12,
    },
});

export default styles;
