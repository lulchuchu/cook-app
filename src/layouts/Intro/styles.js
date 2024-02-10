import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    appName: {
        color: '#000',
        fontSize: 40,
        fontFamily: 'Inconsolata',
        marginVertical: 4,
    },
    slogan: {
        color: '#000',
        textTransform: 'uppercase',
        fontFamily: 'Inconsolata',
    },
});

export default styles;
