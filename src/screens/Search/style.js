import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    body: {
        width: '100%',
        height: '100%',
        paddingTop: 20,
        marginTop: 40,
        paddingHorizontal: 16,
    },
    searchLabel: {
        marginBottom: 12,
        fontSize: 24,
        fontFamily: 'Inconsolata-Bold',
    },
    searchView: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#fff',
        width: '100%',
        marginBottom: 12,
    },
    ctnSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: '#ccc',
        borderWidth: 0.5,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        fontFamily: 'Inconsolata-Medium',
        borderColor: 'transparent',
        borderWidth: 0,
        paddingVertical: 8,
        paddingHorizontal: 8,
        fontSize: 18,
        marginLeft: 4,
        width: '100%',
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#ffe',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 8,
        marginVertical: 8,
        marginRight: 10,
        color: '#000',
        position: 'relative',
    },
    selectSearch: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 20,
    },
    selectSearchChild: {
        // aspectRatio: 1,
        width: Dimensions.get('window').width / 3 - 16,
        backgroundColor: '#fdf6eb',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    selectSearchChildImg: {
        height: 60,
        width: '100%'
    },
    selectSearchChildTxt: {
        marginTop: 16,
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
    },
    ctnSuggest: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 80,
    },
    textSuggest: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
        marginVertical: 20,
    },
    itemRecipe: {
        width: '44%',
        marginHorizontal: 10,
        position: 'relative',
        // height: 320
        marginBottom: 24,
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
        top: 160,
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
