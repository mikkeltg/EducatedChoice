import { StyleSheet } from 'react-native'

const GlobalStyles = StyleSheet.create
({ 
    backgroundColor: {
        backgroundColor: '#CFD7C7',
    },
    
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
        backgroundColor: '#CFD7C7',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        paddingVertical: 9,
        paddingHorizontal: 22,
        elevation: 3,
        justifyContent: 'center',
        marginTop: 20,
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 18,
        letterSpacing: 0.25,
        justifyContent: 'center',

    },

    buttonContainer: {
        margin: 10,
      },

    textBox: {
        borderWidth: 0.5, 
        borderColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',

    },

    TextInput: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
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

    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
      },

      header: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 10,
        color: '#40798C',
    },

    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: 300
    },

}) 



export default GlobalStyles