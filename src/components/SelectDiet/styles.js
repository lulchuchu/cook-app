import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 48,
        backgroundColor: '#fdf6eb',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
        width: '100%',
        height: '92%'
    },
    ctnIcon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    iconXMark: {
        paddingHorizontal: 2,
        paddingVertical: 2,
    },
    paging: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    item1: {
        height: 6,
        width: '48%',
        backgroundColor: '#c64d24',
        borderRadius: 8,
    },
    item2: {
        height: 6,
        width: '48%',
        backgroundColor: '#e1ddd6',
        borderRadius: 8,
    },
    ctnText: {
        width: '100%',
        marginVertical: 32,
    },
    textHeader: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 22,
        textAlign: 'center',
    },
    textHeader2: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 22,
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 28,
    },
    ctnSelect: {
        marginVertical: 24,
    },
    itemSelect: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 12,
    },
    imgSelect: {
        width: 40,
        height: 40,
    },
    textSelect: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 18,
    },
    footer: {
        position: 'absolute',
        bottom: 32,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSkip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#f0eeed',
        marginRight: 12,
        borderRadius: 20,
    },
    textSkip: {
        fontFamily: 'Inconsolata',
        fontSize: 18,
        color: '#212',
        textAlign: 'center',
    },
    btnNext: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#458e6e',
        borderRadius: 20,
    },
    textNext: {
        fontFamily: 'Inconsolata',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    ctnSelect2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemLeft: {
        flexDirection: 'column',
    },
    itemRight: {
        flexDirection: 'column',
    },
    itemCountry: {
        width: 184,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 8,
    },
    textCountry: {
        justifyContent: 'center',
        fontFamily: 'Inconsolata',
        textAlign: 'center',
        fontSize: 18,
    },
    btnSelectAll: {
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 8,
        marginTop: 16,
    },
});

export default styles;
