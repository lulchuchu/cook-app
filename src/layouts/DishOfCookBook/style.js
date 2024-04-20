import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ctn: {
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        marginBottom: 20,
    },
    btn: {
        padding: 4,
        marginTop: -4,
    },
    textCookBook: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
    },
    textDelete: {
        fontFamily: 'Inconsolata-Bold',
        color: '#da7e4f',
        fontSize: 16,
    },
    body: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 200,
    },
    itemRecipe: {
        width: '48%',
        position: 'relative',
    },
    imgRecipe: {
        width: '100%',
        height: 240,
        borderRadius: 18,
    },
    nameRecipe: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        marginVertical: 16,
    },
    ctnChef: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgChef: {
        width: 28,
        height: 28,
        borderRadius: 50,
        marginRight: 12,
        borderColor: '#ccc',
        borderWidth: 0.2,
    },
    nameChef: {
        fontFamily: 'Inconsolata-Medium',
        color: '#da7e4f',
        fontSize: 14,
    },
    ctnHeart: {
        position: 'absolute',
        bottom: 88,
        right: 10,
        backgroundColor: '#fff',
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
    },
    textHeart: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        marginLeft: 8,
    },
    ctnDelete: {
        position: 'absolute',
        bottom: -24,
        zIndex: 5,
        right: 12,
        backgroundColor: '#FFFFFF',
        padding: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        width: 60
    },
    textDelete2: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 14,
        textAlign: 'center',
    },
    ctnModal: {
        position: 'absolute',
        zIndex: 150,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default styles;
