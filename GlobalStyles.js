import { StyleSheet } from 'react-native'

const GlobalStyles = StyleSheet.create
({ 
    container: { 
        flex: 1, 
        width: '100%', 
        color: 'black', 
    },

    touchableObject:{
        padding: 10,
        textAlign:'center',
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: '#FFDAB9',
    },

    textContainer: {
        flex: 0.1,
        marginTop: 200,
        alignItems: 'center',
        height: 100,
    },
   
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },

    textBox: {
        borderWidth: 0.5, 
        borderColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',

    },

    headlineText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        marginTop: -400,
    },
    
    profileHeadline: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        marginTop: 10,
    },

}) 





export default GlobalStyles