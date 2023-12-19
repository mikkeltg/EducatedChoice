  //Sample import fra https://rapidapi.com/rphrp1985/api/open-ai21
  // Hunsk at insætte den sample de giver in i en function som jeg har gjort i lijne 5, dernæst ændre content: "hello" til en variable (message her), Husk også at addere en return response
  import axios from "axios";
  import { CHATMESSAGES } from "./const";

  export default async function SendMessage(message) { //kun en bruger kan sende en besked 
    //pusher brugerens besked til CHATMESSAGES array
    const toChatMessagesUSER = {
      role: 'user',
      content: message
    }
    CHATMESSAGES.push(toChatMessagesUSER);

    //DEFINERE VORES OPTIONS TIL API KALD
    const options = {
      method: 'POST',
      url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '4c4836105dmsh0904283da9b43dfp14128fjsn7563ba9da4cd',
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com',
      },
      data: {
        messages: CHATMESSAGES, //HER SENDER VI VORES CHATMESSAGES ARRAY MED ALLE SPØRGSMÅL OG SVAR
        web_access: false,
        stream: false,
      },
    };

    try {
      const response = await axios.request(options); //HER SENDER VI REQUEST AFSTED TIL API'EN
      console.log(response.data);
      //pusher AI svaret fra api'en til CHATMESSAGES array
      const toChatMessages = {
        role: 'assistant',
        content: response
      }
      CHATMESSAGES.push(toChatMessages); //opdatere vores CHATMESSAGES array med den nye besked
      //returner svar til brugeren
      return response
    } catch (error) {
      console.error('API Request Error:', error.message);
      if (error.response) {
        console.error('Server Response:', error.response.data);
        console.error('Status Code:', error.response.status);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error configuring the request:', error.message);
      }
    }
  }