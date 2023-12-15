import {
    getFirestore,
    doc,
    getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const fetchUserGrades = async () => { // Selve funktionen der indhenter uddannelsesdate fra databasen
    try {
        console.log("Fetching grade average for user");
        const db = getFirestore();
        const auth = getAuth(); 
        const user = auth.currentUser;
        const userDocRef = doc(db, "users", user.uid); //finder den bruger der er logget ind.
        const docSnap = await getDoc(userDocRef); //henter brugerens data fra databasen
        console.log("test");
        console.log(docSnap.data().snit);
        return docSnap.data().snit;
    } catch (error) {
    console.error("Error fetching grade average:", error);
    }
};

export default fetchUserGrades;