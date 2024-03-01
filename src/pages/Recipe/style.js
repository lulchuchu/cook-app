import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ctnIntro: {
        height: 400,
        with: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imgIntro: {
        height: '100%',
        width: '100%',
    },
    ctnButtonBack: {
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 15
    },
    buttonBack: {
        paddingHorizontal: 8, 
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    body: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%',
        // backgroundColor: '#fff',
        // marginTop: 400,
    },
    marginTop: {
        marginTop: 400,
    },
    ctnInteract: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 28,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    textRecipe: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 32,
        marginBottom: 20,
    },
    ctnRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberRating: {
        fontFamily: 'Inconsolata-Medium',
        marginVertical: 10,
        fontSize: 18,
    },
    ctnSocialOnScroll: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingBottom: 2,
        paddingTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 100
    },
    ctnSocial: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    btnSocial: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginHorizontal: 12,
    },
    textSocial: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 20,
        marginLeft: 6,
    },
    ctnChef: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    imgChef: {
        width: 76,
        height: 76,
        borderRadius: 50,
    },
    ctnInfoChef: {
        marginLeft: 16,
    },
    nameChef: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
        color: '#da7e4f',
        marginBottom: 4,
    },
    addressWork: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        color: '#686868'
    },
    ctnDesRecipe: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        paddingBottom: 24,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    textDesRecipe: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 19,
        textAlign: 'auto',
        lineHeight: 26,
    },
    btnShowMore: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    textShowMore: {
        fontFamily: 'Inconsolata-Bold',
        color: '#da7e4f',
        marginRight: 4,
        fontSize: 18,
    },
    ctnReviews: {
        paddingTop: 16,
        paddingBottom: 24,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    headingReview: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textHeadingReview: {
        fontFamily: 'Other',
        fontSize: 22,
    },
    ctnIngredients: {
        paddingTop: 16,
        paddingBottom: 24,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    ctnAdjust: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    numberAdjust: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
    },
    adjustQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textAdjust: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        marginHorizontal: 12,
    },
    btnAdjust: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#ede5dc',
        borderRadius: 8,
    },
    renderIngredients: {
        flexDirection: 'row',
        marginTop: 24,
        backgroundColor: '#fff',
    },
    itemLeft: {
        width: '25%',
    },
    itemRight: {
        width: '75%',
    },
    textIngredients: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        marginVertical: 6,
    },
    ctnButtonAddToCart: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28
    },
    buttonAddToCart: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        width: 220,
        paddingVertical: 12,
        borderRadius: 24,
        backgroundColor: '#2c5d48'
    },
    textUtensils: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        marginTop: 16,
        lineHeight: 26,
    },
    ctnNutrition: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingHorizontal: 12,
        paddingVertical: 16,
        backgroundColor: '#fff5ea',
        borderRadius: 12,
    },
    textNutition: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 2,
    },
    ctnCookStep: {
        marginTop: 24,
    },
    textStep: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: 20,
        marginBottom: 12,
    },
    imgStep: {
        width: '100%',
        height: 240,
        borderRadius: 12,
        marginBottom: 16,
    },
    imgIcon: {
        width: 24,
        height: 24,
    },
    textIngreCook: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        marginLeft: 16,
        lineHeight: 26,
        width: '85%',
    },
    textDesCook: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 18,
        lineHeight: 26,
    },
    ctnComment: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        width: '100%'
    },
    userComment: {
        width: '10%',
        marginRight: 16
    },
    imgUserCmt: {
        width: 46,
        height: 46,
        borderRadius: 50,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    ctnTextCmt: {
        width: '85%',
        height: 140,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 1
    },
    textCmt: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: 16,
        padding: 8,
        height: 60,
        lineHeight: 24
    },
    buttonSend: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#2c5d48',
        width: 72,
        position: 'absolute',
        bottom: 12,
        right: 12
    },
    focusInput: {
        borderColor: 'blue',
        borderWidth: 0.5,
        borderRadius: 10
    },
    ctnButtonCook: {
        position: 'absolute',
        bottom: 32,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 100
    },
    buttonStartCook: {
        paddingHorizontal: 20,
        width: 220,
        paddingVertical: 12,
        borderRadius: 24,
        backgroundColor: '#2c5d48'
    },
    textCooking: {
        fontFamily: 'Inconsolata-Medium',
        fontSize:18,
        color: '#fff',
        textAlign: 'center',
    }
});

export default styles;
