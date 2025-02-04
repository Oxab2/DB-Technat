// Script repondant a la question "Quel est le dernier commentaire du client + date"



const { MongoClient } = require("mongodb");

// Info connexion
const uri = "mongodb://ia-oxab:m8QmKHpKAwMJQuU47TYG@192.168.1.29:27017/?authSource=da";
const client = new MongoClient(uri);

async function getLastCommentByDA(search) {
    try {
        await client.connect();  
        console.log("Connecté");

        const db = client.db("da");  

        const collection = db.collection("dossier_affaires");  

        const documents = await collection.aggregate([
            {
                $match: {nomAffaire: search}
            },
            {
                $lookup: {
                    from: "echantillonnages",
                    localField: "_id",
                    foreignField: "dossierAffaireId",
                    as: "echantillonnages"
                }
            },
        ]).toArray();

        // Vérifier si des documents existent
        if (documents.length === 0) {
            console.log("Aucun résultat trouvé pour cette affaire.");
            return;
        }

        const echantillonnages = documents[0].echantillonnages.filter(echantillonnage => 
            echantillonnage.commentaireClient && 
            echantillonnage.commentaireClientDate !== "1899-12-31T23:00:00.000Z"
        );
        
        if (echantillonnages.length === 0) {
            console.log("Aucun commentaire client valide trouvé.");
            return;
        }
        
        const dernierCommentaire = echantillonnages.reduce((latest, current) => {
            return new Date(current.commentaireClientDate) > new Date(latest.commentaireClientDate) ? current : latest;
        });

        const dateCommentaire = new Date(dernierCommentaire.commentaireClientDate).toLocaleDateString("fr-FR");

        console.log(`Dernier commentaire client pour le projet ${documents[0].nomAffaire}:`);
        console.log(`Date : ${dateCommentaire}`);
        console.log(`Commentaire : ${dernierCommentaire.commentaireClient}`);



    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close(); 
        console.log("Fermée");
    }
}

getLastCommentByDA("SÉRUM BOOSTER D’HYDRATATION (GAMME HYDRA)");
