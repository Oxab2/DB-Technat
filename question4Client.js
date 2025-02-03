
// Script repondant a la question "Qui est la coordinatrice pour le client XXXX"


const { MongoClient } = require("mongodb");

// Info connexion
const uri = "mongodb://ia-oxab:m8QmKHpKAwMJQuU47TYG@192.168.1.29:27017/?authSource=da";
const client = new MongoClient(uri);

let chargeProjetLeadList = []

async function getchargeProjetLeadByClient(search) {
    try {
        await client.connect();  
        console.log("Connecter ");

        const db = client.db("da");  // da et da-re7

        const pipeline = [
            {
                $lookup: {
                    from: "clients", //Collection a joindre 
                    localField: "clientId", //clé  dossier_affaire
                    foreignField: "_id", //clé client
                    as: "clientInfo" 
                }
            },
            {
                $unwind: "$clientInfo" 
            },
            {
                $match: { "clientInfo.nom": search } 
            },
            {
                $project: { 
                    _id: 0,
                    client: "$clientInfo.nom",
                    chargeProjetLead: 1,
                    nomAffaire: 1
                }
            }
        ];

        const documents = await db.collection("dossier_affaires").aggregate(pipeline).toArray();



        if (documents.length === 0){
            console.log("Pas de resultat")
            return;
        }

        documents.forEach(result => {
            if (!chargeProjetLeadList.includes(result.chargeProjetLead) && result.chargeProjetLead !== ""){
                chargeProjetLeadList.push(result.chargeProjetLead)
            }
        });

        console.log(`Le client ${search} a comme chargeProjetLead ${chargeProjetLeadList}.`);


    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close(); 
        console.log("Fermeture");
    }
}

getchargeProjetLeadByClient("LPG SYSTEMS");

