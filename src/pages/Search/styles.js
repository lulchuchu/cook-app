import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    body: {
        width: '100%',
        height: '100%',
    },
    searchLabel: {
        margin: 5,
        fontSize: 24,
        fontWeight: '600',
    },
    searchView: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#fff',
        color: 'red',
        width: '100%',
    },
    ctnSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
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
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: '2%',
    },
    selectSearchChild: {
        // aspectRatio: 1,
        width: '31%',
        backgroundColor: '#fdf6eb',
        margin: 4,
        borderRadius: 10,
        alignItems: 'center',
    },
    selectSearchChildImg:{
        marginTop: 20,
        marginBottom: 20,
        height: 60,

    },

    selectSearchChildTxt: {
        marginBottom: 20,
    }

    
});

export default styles;
