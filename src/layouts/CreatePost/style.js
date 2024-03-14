import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
    },
    header: {
        width: '100%',
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
    imgUser: {
        width: 42,
        height: 42,
        borderRadius: 50,
    },
    ctnUser: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 16,
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
    },
    input: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 17,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderColor: 'transparent',
    },
});

export default styles;
