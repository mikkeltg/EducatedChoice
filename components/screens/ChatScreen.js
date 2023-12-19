import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, AsyncStorage } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';

import SendMessage from '../services/RequestPage';
import ChatFaceData from '../services/ChatFaceData';
import { CHATMESSAGES } from '../services/const';

let CHAT_BOT_FACE = 'https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = async () => {
    const id = await AsyncStorage.getItem('chatFaceId');
    CHAT_BOT_FACE = id ? ChatFaceData[id].image : ChatFaceData[0].image;
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am ' + ChatFaceData[id].name + ', How can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: CHAT_BOT_FACE,
        },
      },
    ]);
  };

  const [forceUpdate, setForceUpdate] = useState(0);

  const getBardResp = async (msg) => {
    try {
      const response = await SendMessage(msg, 'da');
      console.log('API Response:', response);
  
      if (response && response.data && response.data.result) {
        const chatAIResp = {
          _id: Math.random() * (9999999 - 1),
          text: response.data.result,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: CHAT_BOT_FACE,
          },
        };
  
        console.log('New Message:', chatAIResp);
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [chatAIResp]));
        setForceUpdate(forceUpdate + 1);
      } else {
        console.error('Unexpected API response:', response);
      }
    } catch (error) {
      console.error('API Request Error:', error.message);
  
      if (error.response) {
        console.error('Server Response:', error.response.data);
        console.error('Status Code:', error.response.status);
        if (error.response.status === 504) {
          // Håndtering af timeout-fejl - f.eks. forsøg igen efter nogle sekunder
          console.log('Trying again after a delay...');
          setTimeout(() => {
            getBardResp(msg);
          }, 5000); // Vent i 5 sekunder, før du prøver igen (kan justeres)
        }
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error configuring the request:', error.message);
      }
    }
  };
  

  const onSend = useCallback(async (messages = []) => { //når brugeren sender en besked
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    if (messages[0].text) {
      try {
        setLoading(true);
        await getBardResp(messages[0].text);
      } catch (error) {
        // Handle API request error
        console.error('API Request Error:', error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#CFD7C7',
          },
          left: {},
        }}
        textStyle={{
          right: {
            padding: 2,
          },
          left: {
            color: '#671ddf',
            padding: 2,
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
          padding: 3,
          backgroundColor: '#CFD7C7',
          color: '#fff',
        }}
        textInputStyle={{ color: '#fff' }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome name="send" size={24} color="white" resizeMode={'center'} />
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
