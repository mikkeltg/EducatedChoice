For at køre filen, skal der gøres følgende:
* npm i
Hvis der kommer fejl 
- npm install react-native-gesture-handler
- npm install @react-navigation/bottom-tabs
- npm install @expo/vector-icons


* npx expo start

Hvis der opstår problemer med chatbot, kan det være fordi, at vores API-key er udløbet. I dette tilfælde gøres følgende:
* Åben RequestPage.js
* På linje 20 erstattes variable x-RapidAPI-Key value til "3f5cedf79cmsh2feae816ccba32cp197526jsn4d6963b8ba1b"
* Kør koden igen
