import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    ctnHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 0,
        width: '100%',
        paddingTop: 32,
        paddingBottom: 12,
        paddingHorizontal: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    ctnImage: {
        width: 120,
        height: 120,
        backgroundColor: '#ffc621',
        borderRadius: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 24,
    },
    btnBack: {
        padding: 4,
        marginLeft: -4,
        marginBottom: 4,
    },
    textSave: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 20,
        color: '#da7e4f',
    },
    textName: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 32,
        textAlign: 'center',
    },
    ctnPencil: {
        position: 'absolute',
        zIndex: 20,
        top: 86,
        right: 6,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    ctnInput: {
        width: '100%',
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    textHeaderInput: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
    },
    err: {
        fontFamily: 'Inconsolata-Medium',
        color: '#ff4500',
        marginLeft: 12,
        marginTop: 4,
    },
    warn: {
        fontFamily: 'Inconsolata-Medium',
        color: '#ffc621',
        marginLeft: 12,
        marginTop: 4,
    },
    ctnBtnLogOut: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    btnLogOut: {
        padding: 12,
    },
});

export default styles;
