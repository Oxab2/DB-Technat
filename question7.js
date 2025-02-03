

// Script repondant a la question "Est-ce que l’ensemble des informations de l’onglet Nomenclature ont été renseignées "

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
                    from: "nomenclature_packs",
                    localField: "_id",
                    foreignField: "dossierAffaireId",
                    as: "nomenclature_packs"
                }
            },
            {
                $lookup: {
                    from: "nomenclature_biocelltissus",
                    localField: "_id",
                    foreignField: "dossierAffaireId",
                    as: "nomenclature_biocelltissus"
                }
            },
            {
                $lookup: {
                    from: "nomenclature_poudres",
                    localField: "_id",
                    foreignField: "dossierAffaireId",
                    as: "nomenclature_poudres"
                }
            }
        ]).toArray();

        if (documents.length === 0) {
            console.log("Aucun résultat trouvé pour cette affaire.");
            return;
        }

        documents.forEach(doc => {
            let phrase = `État détaillé de la nomenclature pour le projet : ${doc.nomAffaire}`;
            
            const checkField = (value) => value !== undefined && value !== null && value !== "" && value !== false;
           
            if (doc.nomenclature_packs.length > 0) {
                let pack = doc.nomenclature_packs[0];
                phrase += `\n Nomenclature Pack :\n`;
                phrase += checkField(pack.uniteDeVente) ? " uniteDeVente renseignée\n" : " uniteDeVente manquante\n";
                phrase += checkField(pack.tolerance) ? " tolerance renseignée\n" : " tolerance manquante\n";
                phrase += checkField(pack.quantiteProduitContenantMl) ? " quantiteProduitContenantMl renseignée\n" : " quantiteProduitContenantMl manquante\n";
                phrase += checkField(pack.quantiteProduitContenantMlL) ? " quantiteProduitContenantMlL renseignée\n" : " quantiteProduitContenantMlL manquante\n";
                phrase += checkField(pack.emplacement) ? " emplacement renseignée\n" : " emplacement manquante\n";
                phrase += checkField(pack.regroupementCarton) ? " regroupementCarton renseignée\n" : " regroupementCarton manquante\n";
                phrase += checkField(pack.typePalette) ? " typePalette renseignée\n" : " typePalette manquante\n";
                phrase += checkField(pack.intercalaire) ? " intercalaire renseignée\n" : " intercalaire manquante\n";
                phrase += checkField(pack.nbCouches) ? " nbCouches renseignée\n" : " nbCouches manquante\n";
                phrase += checkField(pack.nbUniteParCarton) ? " nbUniteParCarton renseignée\n" : " nbUniteParCarton manquante\n";
                phrase += checkField(pack.codeClient) ? " codeClient renseignée\n" : " codeClient manquante\n";
                phrase += checkField(pack.etiquetteCarton) ? " etiquetteCarton renseignée\n" : " etiquetteCarton manquante\n";
                phrase += checkField(pack.infoSupplementaire4) ? " infoSupplementaire4 renseignée\n" : " infoSupplementaire4 manquante\n";
                phrase += checkField(pack.multiLotPalette) ? " multiLotPalette renseignée\n" : " multiLotPalette manquante\n";
                phrase += checkField(pack.hauterMax) ? " hauterMax renseignée\n" : " hauterMax manquante\n";
                phrase += checkField(pack.fichePaletteTN) ? " fichePaletteTN renseignée\n" : " fichePaletteTN manquante\n";
                phrase += checkField(pack.infoSupplementaire) ? " infoSupplementaire renseignée\n" : " infoSupplementaire manquante\n";
                phrase += checkField(pack.texteSpecifique) ? " texteSpecifique renseignée\n" : " texteSpecifique manquante\n";
                phrase += checkField(pack.nbCarton) ? " nbCarton renseignée\n" : " nbCarton manquante\n";
                phrase += checkField(pack.nbCouchePal) ? " nbCouchePal renseignée\n" : " nbCouchePal manquante\n";
                phrase += checkField(pack.poidsMax) ? " poidsMax renseignée\n" : " poidsMax manquante\n";
                phrase += checkField(pack.etiquetteSpecifique) ? " etiquetteSpecifique renseignée\n" : " etiquetteSpecifique manquante\n";
                phrase += checkField(pack.validationNomenclature) ? "validationNomenclature validée \n" : " validationNomenclature non validée\n";

            } else {
                phrase += "\n Nomenclature Pack absente \n";
            }

            if (doc.nomenclature_poudres.length > 0) {
                let poudre = doc.nomenclature_poudres[0];
                phrase += `\n Nomenclature Poudres :\n`;
                phrase += checkField(poudre.quantiteProduitSachet) ? " quantiteProduitSachet renseignée\n" : " quantiteProduitSachet manquante\n";
                phrase += checkField(poudre.quantiteProduitSachetGrK) ? "quantiteProduitSachetGrK renseigné\n" : " quantiteProduitSachetGrK manquant\n";
                phrase += checkField(poudre.tolerancePreemballage) ? "tolerancePreemballage renseigné\n" : " tolerancePreemballage manquant\n";
                phrase += checkField(poudre.laize) ? "laize renseigné\n" : " laize manquant\n";
                phrase += checkField(poudre.pas) ? "pas renseigné\n" : " pas manquant\n";
                phrase += checkField(poudre.emplacement) ? "emplacement renseigné\n" : " emplacement manquant\n";
                phrase += checkField(poudre.marquage) ? "marquage renseigné\n" : " marquage manquant\n";
                phrase += checkField(poudre.couleurDataflex) ? "couleurDataflex renseigné\n" : " couleurDataflex manquant\n";
                phrase += checkField(poudre.expiration) ? "expiration renseigné\n" : " expiration manquant\n";
                phrase += checkField(poudre.nbMoisExpir) ? "nbMoisExpir renseigné\n" : " nbMoisExpir manquant\n";
                phrase += checkField(poudre.formatDLUO) ? "formatDLUO renseigné\n" : " formatDLUO manquant\n";
                phrase += checkField(poudre.formatDLUOEmplacement) ? "formatDLUOEmplacement renseigné\n" : " formatDLUOEmplacement manquant\n";
                phrase += checkField(poudre.regroupementCaissePlastique) ? "regroupementCaissePlastique renseigné\n" : " regroupementCaissePlastique manquant\n";
                phrase += checkField(poudre.reference) ? "reference renseigné\n" : " reference manquant\n";
                phrase += checkField(poudre.typePalettePoudre) ? "typePalettePoudre renseigné\n" : " typePalettePoudre manquant\n";
                phrase += checkField(poudre.fichePaletteTN) ? "fichePaletteTN renseigné\n" : " fichePaletteTN manquant\n";
                phrase += checkField(poudre.uniteDeVente) ? "uniteDeVente renseigné\n" : " uniteDeVente manquant\n";
                phrase += checkField(poudre.codeClient) ? "codeClient renseigné\n" : " codeClient manquant\n";
                phrase += checkField(poudre.regroupementCarton) ? "regroupementCarton renseigné\n" : " regroupementCarton manquant\n";
                phrase += checkField(poudre.validationNomenclature) ? "validationNomenclature validée \n" : " validationNomenclature non validée\n";



            } else {
                phrase += "\n Nomenclature Poudres absente \n";
            }

            if (doc.nomenclature_biocelltissus.length > 0) {
                let poudre = doc.nomenclature_biocelltissus[0];
                phrase += `\n Nomenclature biocelltissus :\n`;
                phrase += checkField(poudre.etiquetteSachet) ? " etiquetteSachet renseignée\n" : " etiquetteSachet manquante\n";
                phrase += checkField(poudre.miseEnEtui) ? " miseEnEtui renseignée\n" : " miseEnEtui manquante\n";
                phrase += checkField(poudre.typeMachine) ? " typeMachine renseignée\n" : " typeMachine manquante\n";
                phrase += checkField(poudre.expiration) ? " expiration renseignée\n" : " expiration manquante\n";

            } else {
                phrase += "\n Nomenclature biocelltissus absente\n";
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