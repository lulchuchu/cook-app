import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundVideo: {
        position: 'relative',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    ctnSkip: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    textSkip: {
        fontFamily: 'Inconsolata-Bold',
        color: '#fff',
        fontSize: 18,
    },
    title: {
        position: 'absolute',
        top: 68,
        width: '100%',
    },
    appName: {
        color: '#fff',
        fontSize: 32,
        fontFamily: 'Inconsolata',
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 32,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paging: {
        width: '15%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 28,
        marginBottom: 8,
    },
    textWelcome: {
        fontFamily: 'Other',
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
        width: '80%',
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Inconsolata',
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
        lineHeight: 22,
        paddingHorizontal: 26,
    },
    ctnButton: {
        backgroundColor: '#458e6e',
        width: '80%',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 24,
        marginTop: 12,
    },
    textButton: {
        fontFamily: 'Inconsolata',
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
        lineHeight: 22,
    },
});

export default styles;
