import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
    },
    header: {
        width: '100%',
        position: 'absolute',
        top: 0,
        backgroundColor: '#f0f2f5',
        paddingHorizontal: 16,
        paddingTop: 28,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        zIndex: 10,
    },
    textHeader: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 22,
    },
    btnPost: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#e5e7eb',
        borderRadius: 12,
    },
    textBtn: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        textAlign: 'center',
        color: '#b3c0c4',
    },
    ctnBody: {
        paddingTop: 100,
        paddingBottom: 100,
    },
    imgUser: {
        width: 42,
        height: 42,
        borderRadius: 50,
    },
    ctnUser: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ctnInfor: {
        marginLeft: 12,
    },
    textName: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 16,
        marginBottom: 8,
    },
    ctnRole: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#d6e7f3',
        borderRadius: 6,
    },
    textRole: {
        fontFamily: 'Inconsolata-Bold',
        color: '#2099ee',
        // fontSize: 16,
        textAlign: 'center',
    },
    ctnInput: {
        marginTop: 8,
        height: 100,
        width: '100%',
    },
    input: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 17,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderColor: 'transparent',
        width: '100%',
    },
    ctnImage: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
