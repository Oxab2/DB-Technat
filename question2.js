
// Script repondant a la question "Qui est le commercial pour le client XXXX"


const { MongoClient } = require("mongodb");

// Info connexion
const uri = process.env.DB_URI;
const client = new MongoClient(uri);

let commercialList = []

async function getCommercialByClient(search) {
    try {
        await client.connect();  
        console.log("Connecter ");

        const db = client.db(process.env.DB_NAME)

        const pipeline = [
            {
                $lookup: {
                    from: "clients", //Collection a joindre 
                    localField: "clientId", //clé a dossier_affaire
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
                    commercial: 1,
                    nomAffaire: 1
                }
            }
        ];

        const results = await db.collection("dossier_affaires").aggregate(pipeline).toArray();



        if (results.length === 0){
            console.log("Pas de resultat")
            return;
        }

        results.forEach(result => {
            if (!commercialList.includes(result.commercial) && result.commercial !== ""){
                commercialList.push(result.commercial)
            }
        });

        console.log(`Le client ${search} a comme commerciale ${commercialList}.`);


    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await client.close(); 
        console.log("Fermeture");
    }
}

getCommercialByClient("LPG SYSTEMS");

