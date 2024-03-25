import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import postData from "../API/axios";
const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [user, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [fournissuers, setFornisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userOnile, setUserOnline] = useState({});
  const [achat, setAchat] = useState([]);
  const [client, setClients] = useState([]);
  const [vente,setVente] = useState([])
  //#region
  /* =================================================== Produit ========================================= */
  const createProduit = async (nom, unitaire, vente) => {
    try {
      await axios.post("http://localhost:3000/createProduit", {
        nom: nom,
        prix_unitaire: unitaire,
        prix_vente: vente,
      });
      getProducts();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const createUser = async (nom, prenom, telephone, type, password) => {
    let formData = new FormData();
    formData.append("nom_user", nom);
    formData.append("prenom_user", prenom);
    formData.append("telephone", telephone);
    formData.append("type_user", type);
    formData.append("password", password);

    try {
      await axios.post(
        "http://localhost:3000/createUser",
        nom,
        prenom,
        telephone,
        type,
        password
      );
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };
  const getProducts = () => {
    // Making a GET request to a specific URL
    axios
      .get("http://localhost:3000/getAllProducts")
      .then((response) => {
        // Handle successful response
        setProducts(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  // delete produit
  const SupprimerProduit = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteProduit/${id}`
      );
      console.log("Item deleted:", response.data);
      getProducts();
    } catch (error) {
      console.error("Error deleting item:", error.response.data);
    }
  };
  //Modifier Produit
  const ModifierProd = (id, nom, prix_unitaire, prix_vente) => {
    let prodData = {
      nom: nom,
      prix_unitaire: prix_unitaire,
      prix_vente: prix_vente,
    };
    axios
      .put(`http://localhost:3000/updateProduit/${id}`, prodData)
      .then((response) => {
        console.log("Item updated successfully:", response.data);
        getProducts();
        // Handle success, e.g., show a success message or redirect
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        // Handle error, e.g., display an error message
      });
  };

  // =====================================================  Fournisseur  =============================================================
  const getFournissuers = () => {
    // Making a GET request to a specific URL
    axios
      .get("http://localhost:3000/getAllFournisseurs")
      .then((response) => {
        // Handle successful response
        setFornisseurs(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  const createFournisseur = async (nom, telephone, adress) => {
    try {
      await axios.post("http://localhost:3000/createFournisseur", {
        nom_f: nom,
        telephone: telephone,
        adress: adress,
      });
      getFournissuers();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  const ModifierFournissuer = (id, nom, telephone, adress) => {
    let fourData = {
      nom_f: nom,
      telephone: telephone,
      adress: adress,
    };
    axios
      .put(`http://localhost:3000/updateFournisseur/${id}`, fourData)
      .then((response) => {
        console.log("Item updated successfully:", response.data);
        getFournissuers();
        // Handle success, e.g., show a success message or redirect
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        // Handle error, e.g., display an error message
      });
  };
  // delete Fournisseur
  const SupprimerFournisseur = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteFournisseur/${id}`
      );
      console.log("Item deleted:", response.data);
      getFournissuers();
    } catch (error) {
      console.error("Error deleting item:", error.response.data);
    }
  };

  //#endregion

  // ======================================= Achats ==============================================================
  const getAllAchat = () => {
    // Making a GET request to a specific URL
    axios
      .get("http://localhost:3000/getAllAchat")
      .then((response) => {
        // Handle successful response
        setAchat(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  const ajouterAchat = async (quantite, idproduit, idFournisseur) => {
    const itemData = {
      date_achat: new Date(),
      quantite_achat: quantite,
      id_produit: idproduit,
      id_user: userOnile.id,
      id_fournisseur: idFournisseur,
    };
    try {
      await axios.post("http://localhost:3000/createAchat", itemData);
      getAllAchat();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  const deleteAchat = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteAchat/${id}`
      );
      console.log("Item deleted:", response.data);
      getAllAchat()
    } catch (error) {
      console.error("Error deleting item:", error.response.data);
    }
  }
  const ModifierAchat = (id, quantite, idproduit, idFournisseur) => {
    const itemData = {
      quantite_achat: quantite,
      id_produit: idproduit,
      id_user: userOnile.id,
      id_fournisseur: idFournisseur,
    };
    axios
      .put(`http://localhost:3000/updateAchat/${id}`, itemData)
      .then((response) => {
        console.log("Item updated successfully:", response.data);
        getAllAchat();
        // Handle success, e.g., show a success message or redirect
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        // Handle error, e.g., display an error message
      });
  };
  //Get Users
  const getAllUsers = () => {
    // Making a GET request to a specific URL
    axios
      .get("http://localhost:3000/getAllUsers")
      .then((response) => {
        // Handle successful response
        setUserOnline(response.data[0]);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

//================================================== Client ========================================================

const getAllClients = () => {
  // Making a GET request to a specific URL
  axios
    .get("http://localhost:3000/getAllClients")
    .then((response) => {
      // Handle successful response
      setClients(response.data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
};
const ajouterClient = async (nom, telephone, adress) => {
  const itemData = {
    nom: nom,
    telephone: telephone,
    adress: adress,
  };
  try {
    await axios.post("http://localhost:3000/createClient", itemData);
   getAllClients();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
const deleteClient = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/deleteClient/${id}`
    );
    console.log("Item deleted:", response.data);
    getAllClients()
  } catch (error) {
    console.error("Error deleting item:", error.response.data);
  }
}
const ModifierClient = (id, nom, telephone, adress) => {
  const itemData = {
    nom: nom,
    telephone: telephone,
    adress: adress,
  };
  axios
    .put(`http://localhost:3000/updateClient/${id}`, itemData)
    .then((response) => {
      console.log("Item updated successfully:", response.data);
     getAllClients();
      // Handle success, e.g., show a success message or redirect
    })
    .catch((error) => {
      console.error("Error updating item:", error);
      // Handle error, e.g., display an error message
    });
};
// ------------------------------------------------------------------ Vente ========================

const ajouterVente = async (quantite, idproduit, idClient) => {
  if(quantite === null && idClient ===null && idproduit === null)
  {
    return alert('remplir tout les champs')
  }
  const itemData = {
    date_vent: new Date(),
    quantite_vente: quantite,
    id_produit: idproduit,
    id_user: userOnile.id,
    id_client: idClient,
  };
  try {
    await axios.post("http://localhost:3000/createVente", itemData);  
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const deleteVente = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/deleteVente/${id}`
    );
    console.log("Item deleted:", response.data);    
  } catch (error) {
    console.error("Error deleting item:", error.response.data);
  }
}

const ModifierVente = async (id , quantite, idproduit, idClient) => {
  if(quantite === null && idClient ===null && idproduit === null)
  {
    return alert('remplir tout les champs')
  }
  const itemData = {
    date_vent: new Date(),
    quantite_vente: quantite,
    id_produit: idproduit,
    id_user: userOnile.id,
    id_client: idClient,
  };
  axios.put(`http://localhost:3000/updateVente/${id}`, itemData)
  .then((response) => {
    console.log("Item updated successfully:", response.data);
   getAllClients();
    // Handle success, e.g., show a success message or redirect
  })
  .catch((error) => {
    console.error("Error updating item:", error);
    // Handle error, e.g., display an error message
  });
};

// =================================================================================================================================

  useEffect(() => {
    getProducts();
    getFournissuers();
    getAllUsers();
    getAllAchat();
    getAllClients();
  }, []);

  return (
    <MainContext.Provider
      value={{
        userOnile,
        createUser,
        products,
        createProduit,
        SupprimerProduit,
        ModifierProd,
        fournissuers,
        achat,
        createFournisseur,
        ModifierFournissuer,
        SupprimerFournisseur,
        ajouterAchat,
        ModifierAchat,
        deleteAchat,
        client,
        ajouterClient,
        deleteClient,
        ModifierClient,
        ajouterVente,
        vente,
        deleteVente,
        ModifierVente
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const UseMainContext = () => {
  return useContext(MainContext);
};

export default MainProvider;
