import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    itemLeft: {
        flexDirection: 'row',
    },
    imgUser: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    itemRight: {
        width: '100%',
        paddingLeft: 56
    },
    ctnInfor: {
        backgroundColor: '#f0f2f5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        minWidth: 60,
        borderRadius: 16,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 12
    },
    name: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 17,
    },
    content: {
        fontFamily: 'Inconsolata-Medium',
        marginTop: 2,
        fontSize: 16,
    },
    ctnImg: {
        paddingLeft: 56,
        marginVertical: 8
    },
    img: {
        width: '100%',
        borderRadius: 12
    },
    ctnInteract: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 12
    },
    textInterace: {
        fontFamily: 'Inconsolata-Bold',
        color: '#65676b',
    },
    btnIterace: {
        paddingVertical: 4,
        paddingHorizontal: 4,
        marginHorizontal: 6,
    },
});

export default styles;
