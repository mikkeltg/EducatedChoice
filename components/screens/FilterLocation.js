import React, { useState, useEffect } from "react";
import { View, Text, Button } from 'react-native';
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import GlobalStyles from "../../GlobalStyles";

function FilterLocation() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const docRef = doc(db, "Uddannelser/Jura (BSc)/Lokationer");
            const docSnap = await getDoc(docRef);
            setData(docSnap.data());
        };
        fetchData();
    }, []);

    return (
        <View>
            {data.map((location, index) => (
                <Text key={index}>{location}</Text>
            ))}
        </View>
    );
}

export default FilterLocation;
