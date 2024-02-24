import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ctnIntro: {
        height: 420,
        with: '100%',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imgIntro: {
        height: 420,
        width: '100%',
    },
    textRecipe: {
        position: 'absolute',
        bottom: 40,
        fontFamily: 'Inconsolata-Bold',
        fontSize: 32,
        color: '#fff',
    },
    ctnInteract: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 32,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    ctnRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberRating: {
        fontFamily: 'Inconsolata-Medium',
        marginVertical: 10,
        fontSize: 18,
    },
    ctnSocial: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    btnSocial: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginHorizontal: 12,
    },
    textSocial: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 20,
        marginLeft: 6,
    },
});

export default styles;
