// Script repondant a la question "Qui sont l’ensemble des personnes travaillant sur le projet  “non du da “"

require('dotenv').config();
const { MongoClient } = require("mongodb");

// Info connexion
const uri = process.env.DB_URI;
const client = new MongoClient(uri);

const metiers = [
    "commercial",
    "reglementaire",
    "chargeProjetLead",
    "adv",
    "qualite",
    "referentRD",
    "marketing",
    "chargeNomenclature",
    "cq",
    "chargeProjetRD"
];

async function getCollection(search) {
    try {
        await client.connect();  
        console.log("Connecter ");

        const db = client.db(process.env.DB_NAME)
        const collection = db.collection("dossier_affaires");  

        const projection = {};
        metiers.forEach(metier => projection[metier] = 1);

        const documents = await collection.find(
            { nomAffaire: search },
            { projection }
        ).toArray();  

        if (documents.length === 0){
            console.log("Pas de resultat pour ce projet")
            return;
        }

        documents.forEach(document => {
            let phrase = " Dans ce projet :";

            metiers.forEach(metier => {
                if (document[metier]) {
                    phrase += ` ${document[metier]} est en ${metier},`;
                }
            });
            
            console.log(phrase);

        });


    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close(); 
        console.log("Fermeture");
    }
}

getCollection("BAUME DÉMAQUILLANT");

