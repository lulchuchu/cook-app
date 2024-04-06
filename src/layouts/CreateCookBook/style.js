import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 100,
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingTop: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textHeader: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 20,
    },
    textSave: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        color: '#65676b',
    },
    button: {
        padding: 4,
        marginBottom: -4,
        marginLeft: -4,
    },
    ctnBody: {
        marginTop: 120,
        paddingHorizontal: 16,
    },
    ctnInput: {
        borderColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 16,
    },
    input: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
        color: '#212121',
        width: '100%',
    },
    err: {
        fontFamily: 'Inconsolata-Medium',
        color: '#ff4500',
        marginLeft: 12,
        marginTop: 8,
    },
});

export default styles;
