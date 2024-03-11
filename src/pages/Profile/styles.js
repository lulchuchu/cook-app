import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
        top: 0,
        width: '100%'
    },
    header: {
        marginTop: 40,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textHeader: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 30
    },
    ctnProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
        paddingHorizontal: 16,
        width: '100%',
    },
    ctnImage: {
        width: 100,
        height: 100,
        backgroundColor: '#ffc621',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    ctnInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    textName: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20
    },
    textRole: {
        fontFamily: 'Inconsolata-Medium',
        color: '#686868',
        fontSize: 16,
        marginVertical: 12
    },
    btnEdit: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderColor: '#688868',
        borderWidth: 1.5,
        width: 120,
    },
    textEdit: {
        fontFamily: 'Inconsolata-Bold',
        color: '#688868',
        fontSize: 16,
        textAlign: 'center',
    },
    ctnType: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    itemType: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get("window").width / 3,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingVertical: 16
    },
    itemClick: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get("window").width / 3,
        borderBottomColor: '#da7e4f',
        borderBottomWidth: 2,
        justifyContent: 'center',
        paddingVertical: 16
    },
    textType: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        marginLeft: 8
    },
    textTypeClick: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        marginLeft: 8,
        color: '#da7e4f'
    },
    ctnContent: {
        paddingHorizontal: 16,
        paddingVertical: 40,
    },
   
});

export default styles;