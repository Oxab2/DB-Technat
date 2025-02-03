// Script repondant a la question "Où en est le DAXXXX (quelle étape) Quels onglets ont été validés dans le DAXXXXX ?



const { MongoClient } = require("mongodb");

// Info connexion
const uri = "mongodb://ia-oxab:m8QmKHpKAwMJQuU47TYG@192.168.1.29:27017/?authSource=da";
const client = new MongoClient(uri);

async function getCommercialByDA(search) {
    try {
        await client.connect();  
        console.log("Connecté");

        const db = client.db("da");  

        const collection = db.collection("dossier_affaires");  

        const documents = await collection.find(
            { nomAffaire: search },
        ).toArray();

        // Vérifier si des documents existent
        if (documents.length === 0) {
            console.log("Aucun résultat trouvé pour cette affaire.");
            return;
        }

        documents.forEach(doc => {
            let phrase = `État du projet : ${doc.nomAffaire}`;

            const checkField = (value) => value !== undefined && value !== null && value !== "" && value !== false;

            phrase += `\n état actuelle ${doc.etat} :\n`;
            phrase += checkField(doc.laboTab) ? " laboTab validé\n" : " uniteDeVente non-validé\n";
            phrase += checkField(doc.testRDTab) ? " testRDTab validé\n" : " testRDTab non-validé\n";
            phrase += checkField(doc.qualiteTab) ? " qualiteTab validé\n" : " qualiteTab non-validé\n";
            phrase += checkField(doc.codifTab) ? " codifTab validé\n" : " codifTab non-validé\n";
            phrase += checkField(doc.lancementTab) ? " lancementTab validé\n" : " lancementTab non-validé\n";
            phrase += checkField(doc.nomenclaturePack) ? " nomenclaturePack validé\n" : " nomenclaturePack non-validé\n";
            phrase += checkField(doc.etiquetage) ? " etiquetage validé\n" : " etiquetage non-validé\n";
            phrase += checkField(doc.nomenclatureBT) ? " nomenclatureBT validé\n" : " nomenclatureBT non-validé\n";
            
            console.log(phrase);

        });


    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close(); 
        console.log("Fermée");
    }
}

getCommercialByDA("BAUME DÉMAQUILLANT");
