import React, { useEffect, useState } from "react";
import { UseMainContext } from "../context/MainContext";
import axios from "axios";
const Vente = () => {
  const {ajouterVente, products, client ,deleteVente,ModifierVente} = UseMainContext();
  const [quantite, setQutite] = useState("");
  const [idproduit, setIdProduit] = useState();
  const [idClient, setIdClient] = useState();
  const [displayVente, setDisplayVente] = useState([]);
  const [idA,setIdA] = useState()
  const [sum,setSum] = useState()
  const [handle,setHandle] = useState(true)


  const VenteDelete = (id) =>{
    deleteVente(id);
  }
  const ajouter = (e) => {   
    if (quantite === "" || idproduit === "" || idClient === "") {
      alert("svp remplir tout les champs");
      return;
    }
    ajouterVente(quantite, idproduit, idClient);
    makeDisplayAchat()
  };
  const makeDisplayAchat = (e) => {
    // Making a GET request to a specific URL
    axios
      .get("http://localhost:3000/displayVente")
      .then((response) => {
        // Handle successful response
        setDisplayVente(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  const getSum = (e) => {
    // Making a GET request to a specific URL
    axios
      .get("http://localhost:3000/getSumVente")
      .then((response) => {
        // Handle successful response
        setSum(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
   //Modifer
    const ModifieAchat = (e) => {
     e.preventDefault();
     if (quantite === "" && idClient === "" && idproduit === "") {
       alert("svp remplir tout les champs");
       return;
     }
     ModifierVente(idA,quantite, idproduit, idClient);
   };
// const deleteV = (id) => {
//   deleteClient(id)
// }
 const handleUpdate = (id) => {
   const Newachat = displayVente.filter((item) => item.id === id)
   setQutite(Newachat[0].quantite_vente)
   setIdA(id)
 }
  useEffect(() => {
    makeDisplayAchat();
    getSum();
  }, [displayVente]);
  return (
    <div>   
    <h1 className=" text-slate-900 font-bold text-[20px] m-auto mt-3 w-fit">
      Table De Vente
    </h1>
    <span className=" text-green-800 font-medium text-[20px] absolute top-2 right-4">  { sum ? sum[0].sum : null} DH</span>
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
          {products?.map((prod, index) => (
            <option key={index} value={prod.id}>
              {prod.nom}
            </option>
          ))}
        </select>
      </div>
      <div className=" flex flex-col gap-2">
        <label htmlFor="" className="text-gray-700">
          Nom Client
        </label>
        <select
          onChange={(e) => setIdClient(e.target.value)}
          className="max-h-56 w-full  rounded-md bg-[#17191e] text-white py-2 px-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {client?.map((forn, index) => (
            <option key={index} value={forn.id}>
              {forn.nom}
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
            <th className=" py-4 px-2 border border-blue-500">Date Achat</th>
            <th className=" py-4  px-2 border border-blue-500">Quantité</th>
            <th className=" py-4  px-2 border border-blue-500">Prix U Achat</th>
            <th className=" py-4  px-2 border border-blue-500">Prix U Vente</th>
            <th className=" py-4  px-2 border border-blue-500">Différence De Bénéfice</th>
            <th className=" py-4  px-2 border border-blue-500">Bénéfice Net</th>
            <th className=" py-4  px-2 border border-blue-500">Nom Produit</th>
            <th className=" py-4  px-2 border border-blue-500">Nom Client</th>
            <th className=" py-4  px-2 border border-blue-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayVente?.map((item, index) => (
            <tr key={index} className=" text-center border cursor-pointer">
              <td className=" py-3 px-2  border border-blue-500">{item.date_vent}</td>
              <td className=" py-3 px-2  border border-blue-500">{item.quantite_vente}</td>
              <td className=" py-3 px-2  border border-blue-500">{item.pu_achat} DH</td>
              <td className=" py-3 px-2  border border-blue-500">{item.pu_vente} DH</td>
              <td className=" py-3 px-2  border border-blue-500">{item.différence_de_bénéfice} DH</td>
              <td className=" py-3 px-2  border border-blue-500">{item.bénéfice_net} DH</td>
              <td className=" py-3 border border-blue-500">{item.nom_produit}</td>
              <td className=" py-3 px-2  border border-blue-500">{item.nom}</td>
              <td className="pt-5 pl-5 pr-5 pb-5 flex gap-2 items-center justify-center border border-blue-500">
            <button
              className=" bg-red-600 px-4 py-1 rounded-xl text-white"
              onClick={() => VenteDelete(item.id)}
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
  )
}

export default Vente