import React, { useEffect, useState } from "react";
import { UseMainContext } from "../context/MainContext";
import axios from "axios";
const Achat = () => {
  const { ajouterAchat, products, achat, fournissuers,ModifierAchat ,deleteAchat} = UseMainContext();
  const [quantite, setQutite] = useState();
  const [idproduit, setIdProduit] = useState();
  const [idFournisseur, setIdFournisseur] = useState();
  const [displayAchat, setDisplayAchat] = useState([]);
  const [idA,setIdA] = useState()

  const ajouter = () => {
    if(quantite === "" || idFournisseur ==="" || idFournisseur === ""){
      return alert('svp remplir tout les champs')
    }
    ajouterAchat(quantite, idproduit, idFournisseur);
  };
  const makeDisplayAchat = (e) => {
    // Making a GET request to a specific URL
    axios
      .get("http://localhost:3000/dispalyAchats")
      .then((response) => {
        // Handle successful response
        setDisplayAchat(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
   //Modifer
   const ModifieAchat = (e) => {
    e.preventDefault();
    if (quantite === "" && idFournisseur === "" && idproduit === "") {
      alert("svp remplir tout les champs");
      return;
    }
    ModifierAchat(idA,  quantite, idproduit, idFournisseur);
  };
const deleteAch = (id) => {
  deleteAchat(id)
}
const handleUpdate = (id) => {
  const Newachat = displayAchat.filter((item) => item.id === id)
  setQutite(Newachat[0].quantite_achat)
  setIdA(id)
}
  useEffect(() => {
    makeDisplayAchat();
  }, [achat]);
  return (
    <div>
      <h1 className=" text-slate-900 font-bold text-[20px] m-auto mt-3 w-fit">
        Table D'chat
      </h1>
      <div className=" flex flex-col gap-3 mt-2 p-10 w-[400px]">
        <div className=" flex flex-col gap-2">
          <label htmlFor="" className="text-gray-700 ">
            Quantité
          </label>
          <input
            onChange={(e) => setQutite(e.target.value)}
            type="text"
            value={quantite}
            className=" w-full outline-none border border-gray-300 rounded-xl py-2 px-4"
            placeholder="quantite"
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="" className=" text-gray-700">
            Nom Produit
          </label>
          <select
            onChange={(e) => setIdProduit(e.target.value)}
            className="max-h-56 w-full  rounded-md bg-[#17191e] text-white py-2 px-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            name=""
            id=""
          >
            {products.map((prod, index) => (
              <option key={index} value={prod.id}>
                {prod.nom}
              </option>
            ))}
          </select>
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="" className="text-gray-700">
            Nom Fournisseur
          </label>
          <select
            onChange={(e) => setIdFournisseur(e.target.value)}
            className="max-h-56 w-full  rounded-md bg-[#17191e] text-white py-2 px-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {fournissuers.map((forn, index) => (
              <option key={index} value={forn.id}>
                {forn.nom_f}
              </option>
            ))}
          </select>
        </div>
        <div className=" flex gap-3 items-center">
          <button
            onClick={ajouter}
            className=" py-1 px-3 rounded-lg outline-none bg-green-300 text-white hover:bg-green-600"
          >
            Ajouter Achat
          </button>
          <button onClick={ModifieAchat} className=" py-1 px-3 rounded-lg outline-none bg-black/15 text-white hover:bg-black">
            Modifier Achat
          </button>
        </div>
      </div>

      <div>
        <h1 className=" text-xl w-fit m-auto mb-3">List Achats</h1>

        <table class=" w-full bg-slate-400/5">
          <thead className=" bg-slate-600 text-white w-full">
            <tr className=" py-4">
              <th className=" py-4">Date Achat</th>
              <th className=" py-4">Quantité</th>
              <th className=" py-4">Nom Produit</th>
              <th className=" py-4">Nom Fournisseur</th>
              <th className=" py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayAchat.map((item, index) => (
              <tr key={index} className=" text-center border cursor-pointer" onClick={() => handleUpdate(item.id)} >
                <td className=" py-3">{item.date_achat}</td>
                <td className=" py-3">{item.quantite_achat}</td>
                <td className=" py-3">{item.nom}</td>
                <td className=" py-3">{item.nom_f}</td>
                <td className="pt-5 pl-5 pr-5 pb-5 flex gap-2 items-center justify-center ">
              <button
                className=" bg-red-600 px-4 py-1 rounded-xl text-white"
                onClick={() => deleteAch(item.id)}
              >
                Supprimer
              </button>
              <button
                className=" bg-green-600 px-4 py-1 rounded-xl text-white"
                onClick={() => handleUpdate(item.id)}
              >
                Modifier
              </button>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Achat;
