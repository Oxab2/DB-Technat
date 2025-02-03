// Script repondant a la question "Qui est le commercial pour le chargé d’affaire réglementaire XXXX"


const { MongoClient } = require("mongodb");

// Info connexion
const uri = "mongodb://ia-oxab:m8QmKHpKAwMJQuU47TYG@192.168.1.29:27017/?authSource=da";
const client = new MongoClient(uri);

let commercialList = []

async function getCommercialByReglementaire(search) {
    try {
        await client.connect();
        console.log("Connecté ");

        const db = client.db("da");  
        const collection = db.collection("dossier_affaires");  

        const documents = await collection.find(
            { reglementaire: search }
        ).toArray();

        if (documents.length === 0) {
            console.log("Pas de resultat")
            return;
        }

        documents.forEach(doc => {
            if (!commercialList.includes(doc.commercial) && doc.commercial !== ""){
                commercialList.push(doc.commercial)
            }
        });

        console.log(`Il y a eu ${commercialList} en tant que commerciale lorsque le réglementaire était ${search}`)

    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close();
        console.log("Fermée");
    }
}

getCommercialByReglementaire("Aurore  BILLOT");