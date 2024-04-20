import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
        justifyContent: 'flex-start',
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
        marginBottom: 20,
    },
    btnConfirm: {
        marginHorizontal: 12,
        padding: 8
    },
    textBtn: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        color: '#f66358',
    },
});

export default styles;
