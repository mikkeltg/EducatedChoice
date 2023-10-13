import React, { useState } from 'react';
import { View, Text, Pressable} from 'react-native';
import GlobalStyles  from '../../GlobalStyles';
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const FilterEducation = () => {

    async function getAllEducations() {
        const q = query(collection(db, "Uddannelser"))
        console.log(q)
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
});
        
    }
    
    return (
        <View>
            <Pressable onPress={getAllEducations}>
                <Text>Hent alle uddannelser</Text>
            </Pressable>
        </View>
    );

}

export default FilterEducation;