import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ctnContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnCreate: {
        width: 160,
        height: 200,
        backgroundColor: '#abdecf',
        borderRadius: 18,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    ctnIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        borderRadius: 50,
        borderColor: '#0a9b70',
        borderWidth: 2,
        marginBottom: 8,
    },
    textCreate: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        color: '#0a9b70',
    },
    textDes: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 16,
        textAlign: 'center',
        width: '80%',
        marginTop: 8,
        lineHeight: 24,
        color: '#0a9b70',
    },
    imgEmty: {
        width: 280,
        height: 220,
    },
    btnSearch: {
        backgroundColor: '#0a9b70',
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 28,
        paddingVertical: 12,
        marginTop: 16,
    },
    ctnItem: {
        width: '45%',
        height: 200,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderColor: '#0a9b70',
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgItem: {
        width: 100,
        height: 100,
    },
    textItem: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        marginTop: 8,
    },
    numberItem: {
        fontFamily: 'Inconsolata-Bold',
        color: '#65676b',
        marginTop: 4,
    },
});

export default styles;
