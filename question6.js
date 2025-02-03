

// Script repondant a la question "Est-ce que les parties Qualité/Création AC/Nomenclature .... ont été validées (Manque la partie Création AC)"

const { MongoClient } = require("mongodb");

// Info connexion
const uri = "mongodb://ia-oxab:m8QmKHpKAwMJQuU47TYG@192.168.1.29:27017/?authSource=da";
const client = new MongoClient(uri);

async function getQualité(search) {
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
                    from: "qualites",
                    localField: "_id",
                    foreignField: "dossierAffaireId",
                    as: "qualites"
                }
            },
            {
                $lookup: {
                    from: "nomenclature_packs",
                    localField: "_id",
                    foreignField: "dossierAffaireId",
                    as: "nomenclature"
                }
            }
        ]).toArray();

        if (documents.length === 0) {
            console.log("Aucun résultat trouvé pour cette affaire.");
            return;
        }

        documents.forEach(doc => {
            let phrase = `Dans le projet ${doc.nomAffaire}`;
        
            if (doc.qualites.length > 0 && doc.qualites[0].validationQualiteDate) {
                const dateValidation = new Date(doc.qualites[0].validationQualiteDate).toLocaleDateString("fr-FR");
                phrase += `la partie Qualité a été validé le ${dateValidation}.`;
            } else {
                phrase += "la partie Qualité n'a pas encore été validé.";
            }

            if (doc.nomenclature.length > 0 && doc.nomenclature[0].validationCarton) {
                phrase += `la partie Nomenclature Validation carton est validé.`;
            } else {
                phrase += "la partie Nomenclature Validation carton n'a pas encore été validé.";
            }

            if (doc.nomenclature.length > 0 && doc.nomenclature[0].validationPalette) {
                phrase += `la partie Nomenclature Validation palette est validé.`;
            } else {
                phrase += "la partie Nomenclature Validation palette n'a pas encore été validé.";
            }
        
            console.log(phrase);
        });
        
        // console.log(JSON.stringify(documents, null, 2));

    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close(); 
        console.log("Fermée");
    }
}

getQualité("1S0113AN030 - CALMING HYDRA BOOST SERUM FACIAL");