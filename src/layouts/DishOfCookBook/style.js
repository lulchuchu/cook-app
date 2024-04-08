import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ctn: {
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        marginBottom: 32,
    },
    btn: {
        padding: 4,
        marginTop: -4,
    },
    textCookBook: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
    },
    textDelete: {
        fontFamily: 'Inconsolata-Bold',
        color: '#da7e4f',
        fontSize: 16,
    },
    itemRecipe: {
        width: '46%',
        marginRight: 20,
        position: 'relative',
    },
    imgRecipe: {
        width: '100%',
        height: 200,
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
        fontFamily: 'Inconsolata',
        fontSize: 18,
        marginLeft: 8,
    },
});

export default styles;
