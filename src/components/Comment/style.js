import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
    },
    ctnImg: {
        marginRight: 12
    },
    imgUser: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    ctnInfor: {
        backgroundColor: '#f0f2f5',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 20
    },
    name: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
    },
    content: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16
    },
    ctnInteract: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        paddingHorizontal: 12,
        marginTop: 8
    }
});

export default styles;