// Script repondant a la question "Qui est la chargée réglementaire sur le DAXXXX "


const { MongoClient } = require("mongodb");

// Info connexion
const uri = "mongodb://ia-oxab:m8QmKHpKAwMJQuU47TYG@192.168.1.29:27017/?authSource=da";
const client = new MongoClient(uri);

async function getReglementaireByDA(search) {
    try {
        await client.connect();  
        console.log("Connecté");

        const db = client.db("da");  

        const collection = db.collection("dossier_affaires");  

        const documents = await collection.find(
            { nomAffaire: search },
            { projection: { reglementaire: 1 } }
        ).toArray();

        // Vérifier si des documents existent
        if (documents.length === 0) {
            console.log("Aucun résultat trouvé pour cette affaire.");
            return;
        }

        // Construire la phrase à partir des résultats
        documents.forEach(doc => {
            const reglementaire = doc.reglementaire || "inconnu";
            console.log(` Il y a comme chargée reglementaire ${reglementaire} dans le projet ${search}`);
            
        });


    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close(); 
        console.log("Fermée");
    }
}

getReglementaireByDA("1S0113AN030 - CALMING HYDRA BOOST SERUM FACIAL");
