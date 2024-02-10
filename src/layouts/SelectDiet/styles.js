import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 52,
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center'
    },
    iconClose: {
        paddingHorizontal: 2,
        paddingVertical: 2,
        position: 'absolute',
        left: 0
    },
    textHeader: {
        textAlign: 'center',
        fontFamily: 'Inconsolata-Bold',
        fontSize: 24
    },
    ctnImg: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 88
    },
    image: {
        width: '60%',
        height: 200
    },
    ctnText: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
    },
    text1: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 48,
        lineHeight: 24,
        marginBottom: 12
    },
    text2: {
        fontFamily: 'Inconsolata',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40
    },
    ctnButton: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#2d5c48',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 20,
        width: 140,
    },
    textBtn: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Inconsolata-Bold',
    }
});

export default styles;