 //import fra https://rapidapi.com/rphrp1985/api/open-ai21
  import axios from "axios";
  import { CHATMESSAGES } from "./const"; //importer vores CHATMESSAGES array fra const.js, som indeholder alle spørgsmål og svar til ai'en, som den skal lære af

  export default async function SendMessage(message) { //exporter vores SendMessage funktion, som vi bruger til at sende beskeder til api'en
    
    const toChatMessagesUSER = {
      role: 'user',
      content: message
    }
    CHATMESSAGES.push(toChatMessagesUSER); //pusher brugerens besked til CHATMESSAGES array

    //definerer vores options til axios request, som vi sender til api'en, som indeholder vores api key, api host og data
    const options = {
      method: 'POST',
      url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '4c4836105dmsh0904283da9b43dfp14128fjsn7563ba9da4cd', /*erstat med api key med 3f5cedf79cmsh2feae816ccba32cp197526jsn4d6963b8ba1b, hvis den nuværende er udløbet/opbrugt/ugyldig */
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com',
      },
      data: {
        messages: CHATMESSAGES, //her sender vi vores CHATMESSAGES array med til api'en, som indeholder alle spørgsmål og svar til ai'en, som den skal lære af
        web_access: false,
        stream: false,
      },
    };

    try {
      const response = await axios.request(options); //her sender vi vores request til api'en
      console.log(response.data);
      //her pusher vi ai'ens svar til CHATMESSAGES array, så den kan lære af det
      const toChatMessages = { //definerer vores toChatMessages objekt, som indeholder ai'ens svar
        role: 'assistant', //rolle skal være assistant, da det er ai'ens svar
        content: response
      }
      CHATMESSAGES.push(toChatMessages); //opdatere vores CHATMESSAGES array med den nye besked
      //returner svar til brugeren
      return response

      //her håndterer vi fejl, hvis der er nogle
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