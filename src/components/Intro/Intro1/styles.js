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
    title: {
        position: 'absolute',
        top: 60,
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
    textWelcome: {
        fontFamily: 'Other',
        fontSize: 48,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
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
    },
});

export default styles;
