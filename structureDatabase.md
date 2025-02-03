# Structure des Relations - Base de Données **TechNature**

## Relations entre les Tables

### **alerte**
- Aucun lien.

---

### **auditLog**
- **whoIdentifier** → `users`
- **data.id** → (À confirmer)

---

### **cellophanages**
- **dossierAffaireId** → `dossier_affaires`

---

### **clients**
- Aucun lien.

---

### **codifs**
- **dossierAffaireId** → `dossier_affaires`

---

### **dossier_affaires**
- **clientId** → `clients`

---

### **echantillonnages**
- **dossierAffaireId** → `dossier_affaires`

---

### **entreprise**
- Aucun lien.

---

### **essai**
- **versionId** → `version`
- **chargeFormulationId** → `users`
- **matierePremiere.[x]._id** → `matierePremiere`

---

### **etiquetages**
- **dossierAffaireId** → `dossier_affaires`

---

### **incrementation**
- Aucun lien.

---

### **labos**
- **dossierAffaireId** → `dossier_affaires`

---

### **lancements**
- **dossierAffaireId** → `dossier_affaires`

---

### **lancementtables**
- **dossierAffaireId** → `dossier_affaires`

---

### **lot**
- **essaiId** → `essai`
- **chargeFormulationId** → `users`
- **matierePremiere.[x]._id** → `matierePremiere`

---

### **machinepalettes**
- Aucun lien.

---

### **matierePremiere**
- Aucun lien.

---

### **mesure**
- **essaiId** → `essai`
- **lotID** → `lot`

---

### **misesousetuis**
- **dossierAffaireId** → `dossier_affaires`

---

### **modeOperatoire**
- Aucun lien.

---

### **nomenclature_biocelltissus**
- **dossierAffaireId** → `dossier_affaires`

---

### **nomenclature_packs**
- **dossierAffaireId** → `dossier_affaires`

---

### **nomenclature_poudres**
- **dossierAffaireId** → `dossier_affaires`

---

### **notionAc**
- Aucun lien.

---

### **notionTestRD**
- Aucun lien.

---

### **qualites**
- **dossierAffaireId** → `dossier_affaires`

---

### **reglementaires**
- **dossierAffaireId** → `dossier_affaires`

---

### **substance**
- Aucun lien.

---

### **testRD2**
- **daId** → `dossier_affaires`
- **essaiId** → `essai`
- **who** → `users`
- **lotId** → `lot`
- **notionId** → `notionTestRD`

---

### **testrds**
- **dossier_affaire** → `dossier_affaires`

---

### **users**
- Aucun lien (mais associé à un groupe affaire).

---

### **validationTestRD**
- **dossierAffaireId** → `dossier_affaires`

---

### **version**
- **vfId** → `voieFormulaire`

---

### **voieFormulaire**
- **dossierAffaireId** → `dossier_affaires`

---

## Tables Non Utilisées
- **_migrations**
- **suiviRecupData**
