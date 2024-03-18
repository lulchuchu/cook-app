import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    ctnHeader: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ctnHeaderScroll: {
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 110,
        top: 0,
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    textAccount: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 16,
    },
    ctnBack: {
        padding: 4,
        marginRight: 12,
    },
    imageUser: {
        width: 44,
        height: 44,
        borderRadius: 50,
        borderColor: '#c54e22',
        borderWidth: 0.5,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ctnInfor: {
        marginLeft: 12,
    },
    nameUser: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
        color: '#050505',
    },
    timePosted: {
        fontFamily: 'Inconsolata-Medium',
        color: '#65676b',
        marginTop: 4,
    },
    ctnContent: {
        // paddingVertical: 16
        // paddingBottom: 32,
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 1
    },
    imageContent: {
        width: '100%',
        height: 280,
    },
    textPost: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
        paddingHorizontal: 16,
        marginBottom: 8,
        lineHeight: 24,
    },
    ctnButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    ctnInteract: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.7,
        borderTopColor: '#ccc',
        borderTopWidth: 0.7,
    },
    textInteract: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 16,
        color: '#65676b',
        marginLeft: 8,
    },
    ctnComment: {
        paddingBottom: 80,
        marginTop: 20,
    },
    ctnInputComment: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        bottom: 0,
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    input: {
        fontFamily: 'Inconsolata-Medium',
        borderColor: 'transparent',
        borderWidth: 0,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 18,
        marginLeft: 4,
        width: '85%',
        backgroundColor: '#f0f2f5',
        borderRadius: 20,
        color: '#212121',
    },
});

export default styles;
