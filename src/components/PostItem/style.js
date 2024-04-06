import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderTopColor: '#c9cdd0',
        borderTopWidth: 8,
        width: '100%',
    },
    ctnHeader: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageUser: {
        width: 44,
        height: 44,
        borderRadius: 50,
        borderColor: '#ddd',
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
    ctnImage: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ctnInteracted: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    textInteracted: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 16,
        color: '#65676b',
    },
    imageContent: {
        width: '100%',
        height: 280,
    },
    textPost: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
        paddingHorizontal: 16,
        lineHeight: 24,
        marginBottom: 8,
    },
    ctnButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    textInteract: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 16,
        color: '#65676b',
        marginLeft: 8,
    },
});

export default styles;
