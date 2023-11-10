import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import GlobalStyles from "../../GlobalStyles";

function FilterLocation() {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for location:", selectedLocation);
        if (selectedLocation) {
          const db = getFirestore();
          const uddannelserRef = collection(db, "Uddannelser");
          const q = query(
            uddannelserRef,
            where(`Lokationer.${selectedLocation}`, "==", true)
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
  }, [selectedLocation]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const locations = ["Esbjerg", "Aalborg", "Aarhus", "Odense", "København"];

  const clearLocationFilter = () => {
    setSelectedLocation(""); // Clear the location filter
  };

  return (
    <View style={GlobalStyles.containerL}>
      <TouchableOpacity
        onPress={toggleModal}
        style={GlobalStyles.dropdownContainer}
      >
        <Text style={GlobalStyles.dropdownInput}>Vælg en by</Text>
        <Text style={GlobalStyles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={GlobalStyles.modalContainerL}>
          <Text style={GlobalStyles.modalTitleL}>Vælg en by</Text>
          <FlatList
            data={locations}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={GlobalStyles.locationItemL}
                onPress={() => {
                  setSelectedLocation(item);
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

      {data.map((document, index) => (
  <View key={index} style={GlobalStyles.documentContainerL}>
    <Text style={GlobalStyles.headerL}>{document.Navn}</Text>
    <Text style={GlobalStyles.textL}>
      Bachelor: {document.Bachelor ? "Ja" : "Nej"}
    </Text>
    <Text style={GlobalStyles.textL}>
      Kandidat: {document.Kandidat ? "Ja" : "Nej"}
    </Text>
    <Text style={[GlobalStyles.textL, {fontWeight: 'bold'}]}>
      Din by: {String(selectedLocation)}
    </Text>
    <Text style={GlobalStyles.textL}>
      Findes i: {Object.keys(document.Lokationer).join(", ")}
    </Text>
  </View>
))}

      <Pressable style={GlobalStyles.button} onPress={clearLocationFilter}>
        <Text>Clear Filter</Text>
      </Pressable>
    </View>
  );
}

export default FilterLocation;
