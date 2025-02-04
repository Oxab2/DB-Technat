// Script repondant a la question "Est-ce qu’une formule est validée dans le DAXXXX ?"

const { MongoClient } = require("mongodb");

// Info connexion
const uri = "mongodb://ia-oxab:m8QmKHpKAwMJQuU47TYG@192.168.1.29:27017/?authSource=da";
const client = new MongoClient(uri);

async function getNbFormuleByDA(search) {
    try {
        await client.connect();
        console.log("Connecté");

        const db = client.db("da");

        const collection = db.collection("dossier_affaires");

        const documents = await collection.aggregate([
            {
                $match: { codeAffaire1: search }
            },
            {
                $lookup: {
                    from: "testrds",
                    localField: "_id",
                    foreignField: "dossier_affaire",
                    as: "testrds"
                }
            }
        ]).toArray();

        if (documents.length === 0) {
            console.log("Aucun résultat trouvé pour cette affaire.");
            return;
        }

        documents.forEach(doc => {

            const formuleValidated = doc.testrds.some(testrd => testrd.validationTest === true);

            if (formuleValidated) {
                console.log(`il y a eu formule validée pour l'affaire ${search} `);
            } else {
                console.log(`Aucune formule validée pour l'affaire ${search}.`);
            }
        });

        // console.log(JSON.stringify(documents, null, 2));

    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close();
        console.log("Fermée");
    }
}

getNbFormuleByDA("DA20221111");
