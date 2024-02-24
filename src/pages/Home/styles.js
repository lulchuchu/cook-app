import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ctnImage: {
        width: '100%',
        height: 420,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    body: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%',
    },
    marginTop: {
        marginTop: 380,
    },
    ctnSuggest: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    suggest: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 26,
        backgroundColor: '#fdf6eb',
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    headerSuggest: {
        fontFamily: 'Inconsolata',
        fontSize: 20,
        marginBottom: 20,
    },
    textSuggest: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 24,
        lineHeight: 32,
        paddingRight: 52,
    },
    infoAuthor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    author: {
        fontFamily: 'Inconsolata-Bold',
        color: '#da7e4f',
        fontSize: 17,
    },
    iconHeart: {
        marginRight: 12,
        color: '#747678',
    },
    content: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        width: '100%',
        paddingBottom: 140,
        paddingTop: 40,
    },
    textHeader: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 22,
        width: 260,
    },
    btnSeeAll: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 16,
        alignItems: 'center',
    },
    textAll: {
        color: '#da7e4f',
        fontSize: 18,
        fontFamily: 'Inconsolata-Bold',
        textTransform: 'uppercase',
        marginRight: 4,
    },
    itemRecipe: {
        width: 240,
    },
    imgRecipe: {
        width: '100%',
        height: 300,
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
});

export default styles;
