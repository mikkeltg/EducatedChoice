import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import GlobalStyles from "../../GlobalStyles";


function FilterEducationType({ navigation }) {
  const [data, setData] = useState([]);
  const [SelectedEducationType, setSelectedEducationType] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for location:", SelectedEducationType);
        if (SelectedEducationType) {
          const db = getFirestore();
          const uddannelserRef = collection(db, "Uddannelser");
          const q = query(
            uddannelserRef,
            where(`${SelectedEducationType}`, "==", true)
          );
          const querySnapshot = await getDocs(q);

          const newData = [];
          querySnapshot.forEach((doc) => {
            newData.push(doc.data());
          });

          console.log("Fetched data:", newData);
          setData(newData);
        } else {
          console.log("No location selected. Clearing data.");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [SelectedEducationType]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const locations = ["Bachelor", "Kandidat"];

  const clearEducationTypeFilter = () => {
    setSelectedEducationType(""); // Clear the Education Type filter
  };

  return (
    <View style={GlobalStyles.containerL}>
      <TouchableOpacity
        onPress={toggleModal}
        style={GlobalStyles.dropdownContainer}
      >
        <Text style={GlobalStyles.dropdownInput}>Vælg en uddannelsestype</Text>
        <Text style={GlobalStyles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={GlobalStyles.modalContainerL}>
          <Text style={GlobalStyles.modalTitleL}>Vælg en uddannelsestype</Text>
          <FlatList
            data={locations}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={GlobalStyles.locationItemL}
                onPress={() => {
                  setSelectedEducationType(item);
                  toggleModal();
                }}
              >
                <Text style={GlobalStyles.locationItemTextL}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>
      <Text style={[GlobalStyles.textL, {fontWeight: 'bold'}]}>
      Viser følgende uddannelsestype: {String(SelectedEducationType)}
    </Text>
    <ScrollView>
    {/* Her vises de enkelte uddannelser */}
    {data.map((document, index) => (
        <View key={index} style={GlobalStyles.documentContainerL}>
            <Text style={GlobalStyles.headerL}>{document.Navn}</Text>
            <Button
              onPress={() => navigation.navigate("Uddannelsesdetaljer", {educationName: document.Navn})}
              title="Læs mere"
            >
            </Button>
        </View>
    ))}
    </ScrollView>

      <Pressable style={GlobalStyles.button} onPress={clearEducationTypeFilter}>
        <Text>Clear Filter</Text>
      </Pressable>
    </View>
  );
}

export default FilterEducationType;