// Script repondant a la question "Qui est la chargée formulation  sur le DAXXXX "


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
                $match: { nomAffaire: search }
            },
            {
                $lookup: {
                    from: "testRD2",
                    localField: "_id",
                    foreignField: "daId",
                    as: "testRD2"
                }
            },
            {
                $unwind: {
                    path: "$testRD2",                // On part de testRD2 maintenant   
                    preserveNullAndEmptyArrays: true // Si testRD2 peut être vide
                }
            },
            {
                $lookup: {
                    from: "essai",
                    localField: "testRD2.essaiId", 
                    foreignField: "_id",
                    as: "essai"
                }
            },
            {
                $unwind: {
                    path: "$essai",
                    preserveNullAndEmptyArrays: true 
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "essai.chargeFormulationId", 
                    foreignField: "_id",
                    as: "chargeFormulation"
                }
            },
            {
                $unwind: {
                    path: "$chargeFormulation",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]).toArray();

        if (documents.length === 0) {
            console.log("Aucun résultat trouvé pour cette affaire.");
            return;
        }

        documents.forEach(doc => {
            if (doc.chargeFormulation) {
                console.log(`Le chargé de formulation pour l'affaire ${search} est : ${doc.chargeFormulation.nom} ${doc.chargeFormulation.prenom}`);
            } else {
                console.log(`Aucun chargé de formulation trouvé pour l'affaire ${search}.`);
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

getLastCommentByDA("1C0244A - CREME RICHE DEFI ANTI-AGE (GAMME ANTI AGE)");
