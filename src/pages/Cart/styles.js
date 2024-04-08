import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ctnSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    input: {
        fontFamily: 'Inconsolata-Medium',
        borderColor: 'transparent',
        borderWidth: 0,
        paddingVertical: 8,
        paddingHorizontal: 8,
        fontSize: 18,
        marginLeft: 4,
        width: '100%',
    },
    ctnText: {
        paddingVertical: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    textIn: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 24,
        textAlign: 'center',
    },
    ctnContent: {
        paddingHorizontal: 16,
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emtyCart: {
        width: '60%',
        height: 200,
    },
    textNotice: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        textAlign: 'center',
        width: '80%',
        lineHeight: 26,
        marginTop: 12,
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#0a9b70',
        width: 200,
        marginTop: 24,
    },
    textBtn: {
        fontFamily: 'Inconsolata-Bold',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
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
        bottom: 0,
    },
});

export default styles;
