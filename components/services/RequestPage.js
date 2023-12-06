//Sample import fra https://rapidapi.com/rphrp1985/api/open-ai21
// Hunsk at insætte den sample de giver in i en function som jeg har gjort i lijne 5, dernæst ændre content: "hello" til en variable (message her), Husk også at addere en return response
import axios from "axios";

export default async function SendMessage(message) {
  const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'de425c7196msh76ea8e574de06fbp1fbaf9jsn658f09cbca4b',
      'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com',
    },
    data: {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      web_access: false,
      stream: false,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
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