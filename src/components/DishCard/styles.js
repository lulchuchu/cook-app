import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    itemRecipe: {
        width: 240,
        marginRight: 20,
        position: 'relative',
        // height: 320
    },
    imgRecipe: {
        width: '100%',
        height: 280,
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
        fontSize: 17,
    },
    ctnHeart: {
        position: 'absolute',
        top: 240,
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
    ctnType: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#9ee17b',
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
    },
    textType: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 14,
    }
});

export default styles;
