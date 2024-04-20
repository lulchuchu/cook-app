import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 16,
        backgroundColor: '#f6f6f6',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 20,
        paddingBottom: 12,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 4,
    },
    ctnSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginRight: 12,
        width: '90%',
        paddingVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: '#ccc',
        borderWidth: 0.5,
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
    ctnText: {
        paddingVertical: 20,
    },
    textIn: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 24,
        textAlign: 'center',
    },
    ctnBody: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%',
    },
    marginTop: {
        marginTop: 92,
    },
});

export default styles;
