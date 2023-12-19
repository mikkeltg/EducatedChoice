import React, { useState, useEffect, useCallback } from "react";
import { View, SafeAreaView, AsyncStorage } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { FontAwesome } from "@expo/vector-icons";

import SendMessage from "../services/RequestPage";
import { CHATMESSAGES } from "../services/const";

let CHAT_BOT_FACE =
  "https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png"; //her definerer vi vores chat bot's profilbillede

//her definerer vi vores ChatScreen komponent, som vi bruger til at vise vores chat
export default function ChatScreen({ userName }) { 
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = async () => { //her starter vi chatten med en besked fra vores chat bot
    setMessages([
      {
        _id: 1,
        text: "Hejsa! Hvad kan jeg hjælpe dig med i dag?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: CHAT_BOT_FACE,
        },
      },
    ]);
  };

  const [forceUpdate, setForceUpdate] = useState(0); //gennemtvinger en opdatering af chatten ved at opdatere state med en ny værdi

  //her definerer vi vores getBardResp funktion, som vi bruger til at sende brugerens besked til api'en og modtage et svar
  const getBardResp = async (msg) => {
    try {
      const response = await SendMessage(msg, "da"); //her afventer vi svar fra api'en og gemmer det i vores response variabel, og har defineret sproget til dansk
      console.log("API Response:", response);

      if (response && response.data && response.data.result) { //her tjekker vi om vi har modtaget et svar fra api'en og om det indeholder et resultat
        const chatAIResp = { //her definerer vi vores chatAIResp objekt, som indeholder ai'ens svar
          _id: Math.random() * (9999999 - 1), //her genererer vi et tilfældigt id til beskeden
          text: response.data.result,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: CHAT_BOT_FACE,
          },
        };

        console.log("New Message:", chatAIResp); //her logger vi ai'ens svar i konsollen for at se om det er korrekt
        setMessages((previousMessages) => 
          GiftedChat.append(previousMessages, [chatAIResp]) //samler ai'ens svar med de tidligere beskeder i chatten og opdatere chatten med det nye svar
        );
        setForceUpdate(forceUpdate + 1); //gennemtvinger en opdatering af chatten ved at opdatere state med en ny værdi
      } else {

        //håndtering af errors fra api'en
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("API Request Error:", error.message);

      if (error.response) {
        console.error("Server Response:", error.response.data);
        console.error("Status Code:", error.response.status);
        if (error.response.status === 504) {
          // Håndtering af timeout-fejl - f.eks. forsøg igen efter nogle sekunder
          console.log("Trying again after a delay...");
          setTimeout(() => {
            getBardResp(msg);
          }, 5000); // Vent i 5 sekunder, før du prøver igen (kan justeres)
        }
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error configuring the request:", error.message);
      }
    }
  };

  //her definerer vi vores onSend funktion, som vi bruger til at sende brugerens besked til api'en og modtage et svar
  const onSend = useCallback(async (messages = []) => {
    //når brugeren sender en besked
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages) //samler brugerens besked med de tidligere beskeder i chatten og opdatere chatten med den nye besked
    );

    if (messages[0].text) {
      try {
        setLoading(true);
        await getBardResp(messages[0].text); 
      } catch (error) {
        // Handle API request error
        console.error("API Request Error:", error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const renderBubble = (props) => { //her definerer vi vores renderBubble funktion, som vi bruger til at style vores beskeder
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#CFD7C7",
          },
          left: {},
        }}
        textStyle={{
          right: {
            padding: 2,
          },
          left: {
            color: "#000000",
            padding: 5,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#CFD7C7", 
          borderTopColor: "#013220", 
          borderTopWidth: 1,
          padding: 1,
        }}
        textInputStyle={{ color: "#013220" }}
        placeholder="Skriv en besked..."
        placeholderTextColor="#888"
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome
            name="send"
            size={24}
            color="white"
            resizeMode={"center"}
          />
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        multiline={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />
    </SafeAreaView>
  );
}
