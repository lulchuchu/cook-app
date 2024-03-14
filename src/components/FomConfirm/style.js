import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ctn: {
        position: 'absolute',
        zIndex: 150,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: 0,
        bottom: 0,
    },
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 8,
        width: 360,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    textHeader: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 22,
    },
    textConfirm: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    btnConfirm: {
        backgroundColor: '#00ab56',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBtn: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        color: '#fff',
    },
});

export default styles;
