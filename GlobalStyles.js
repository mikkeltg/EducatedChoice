import { StyleSheet } from 'react-native'

const GlobalStyles = StyleSheet.create
({ 
    backgroundColor: {
        backgroundColor: '#CFD7C7',
    },

    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    textAdvise: {
        fontSize: 12,
        textAlign: 'center',
        margin: 10,
        color: "grey"
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
    smallButton: {
        backgroundColor: '#CFD7C7',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        // paddingVertical: 9,
        // paddingHorizontal: 22,
        // elevation: 3,
        justifyContent: 'center',
        // marginTop: 20,
    },
    button: {
        display: "flex",
        backgroundColor: '#CFD7C7',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        // paddingVertical: 9,
        // paddingHorizontal: 22,
        // elevation: 3,
        justifyContent: 'center',
        margin: 20,
        
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 18,
        letterSpacing: 0.25,
        alignSelf: "center",
        padding: 20
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
    numberInput: {
      alignSelf: "center",
      height: 40,
      width: "30 %",
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      fontSize: 16,
      borderRadius: 5,
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

    headerL: {
      fontSize: 30,
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

    educationItem: {
        backgroundColor: "#CFD7C7",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      educationName: {
        fontSize: 18,
        fontWeight: "bold",
      },
      educationDescription: {
        fontSize: 16,
      },
      inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: 300,
        alignSelf: 'center',
      },
      modalStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        width: 200,
        borderRadius: 5,
      },
      touchableOpacityStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
     profileTextStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
       // alignSelf: 'center',
      },
      containerL: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
      },
      textL: {
        fontSize: 16,
        marginBottom: 10,
      },
      documentContainerL: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      modalContainerL: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
      },
      containerGap: {
        flex: 1,
        backgroundColor: 'white',
        gap: 15
      },
      modalContainerLHorizontal: {
        flexDirection: "row",
        backgroundColor: 'white',
        justifyContent: "space-around",
        gap: 15
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 20,
        textAlign: 'center',
      },
      modalTitleL: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 50,
        textAlign: 'center',
      },
      locationItemL: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      },
      locationItemTextL: {
        fontSize: 16,
      },
      dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
      },
      dropdownInput: {
        flex: 1,
        fontSize: 16,
      },
      dropdownArrow: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
      },  
      table: {
        borderWidth: 1,
      borderColor: '#000',
      margin: 10,
    },
    header: {
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      padding: 10,
    },
    headerText: {
      flex: 1,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 10,
    },
    cell: {
      flex: 1,
    },
  
});


export default GlobalStyles