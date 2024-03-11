import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: '#f6f6f6'
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingTop: 40,
        paddingHorizontal: 16,
        paddingBottom: 16,
        height: 80,
        zIndex: 110,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#61b2e3',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    textHeader: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 22,
        color: '#fff'
    },
    btnBack: {
        paddingHorizontal: 4,
        paddingVertical: 4
    },
    ctnBody: {
        paddingHorizontal: 16,
        width: '100%',
        paddingTop: 110,
        paddingBottom: 80
    },
    textTitle: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 16,
        color: '#747474',
        marginBottom: 12
    },
    ctnItemIngre: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    nameIngre: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
    },
    textQuantity: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
        marginTop: 8,
    },
    mb20: {
        marginBottom: 20
    },
    mb32: {
        marginBottom: 32
    },
    ctnInforCus: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 16
    },
    name: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        color: '#242424',
    },
    flexRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center'
    },
    address: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
        color: '#787878',
        marginLeft: 12
    },
    textIn: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16
    },
    ctnFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    btnConfirm: {
        backgroundColor: '#d65246',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBtn: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
        color: '#fff'
    },
    textMoney: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#d65246',
        marginTop: 4
    },
    ctnModal: {
        position: 'absolute',
        zIndex: 150,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: 0,
        bottom: 0
    },
});

export default styles;