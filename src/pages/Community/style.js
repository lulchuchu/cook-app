import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        width: '100%',
        backgroundColor: '#f6f6f6',
        top: 0
    },
    header: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ctnSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: '#ccc',
        borderWidth: 0.5
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
        paddingBottom: 40
    }
});

export default styles;