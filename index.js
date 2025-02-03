
// Script repondant a la question "Qui sont l’ensemble des personnes travaillant sur le projet  “non du da “"

require('dotenv').config();
const { MongoClient } = require("mongodb");

// Info connexion
const uri = process.env.DB_URI;
const client = new MongoClient(uri);

async function getCollection(nameCollection) {
    try {
        await client.connect();  
        console.log("Connecter ");

        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(nameCollection);  

        const documents = await collection.find().toArray();  
        console.log("Contenu  :", documents);
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close(); 
        console.log("Fermeture");
    }
}

getCollection("dossier_affaires");
