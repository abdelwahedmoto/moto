import React, { useEffect, useState } from "react";
import { UseMainContext } from "../context/MainContext";
import axios from "axios";
const Produits = () => {
  const { products, createProduit, SupprimerProduit, ModifierProd } =
    UseMainContext();
  const [checked, setChecked] = useState([]);
  const [nom, setNom] = useState("");
  const [unitaire, setUnitaire] = useState("");
  const [vente, setVente] = useState("");
  const [id, setId] = useState(0);
  //set state by checkbox
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  // add product
  const AjouterProduit = (event) => {
    event.preventDefault();
    if (nom === "" && unitaire === "" && vente === "") {
      alert("svp remplir tout les champs");
      return;
    }
    
    createProduit(nom, unitaire, vente);
    //createProduit()
  };
  //Modifer
  const handlePdoduit = (e) => {
    e.preventDefault();
    if (nom === "" && unitaire === "" && vente === "") {
      alert("svp remplir tout les champs");
      return;
    }
    ModifierProd(id, nom, unitaire, vente);
  };
  // delete produit
  const deleteProduit = (id) => {
    SupprimerProduit(id);
  };

  const handleUpdate = (id) => {
    const prod = products.filter((state) => state.id === id);
    setNom(prod[0].nom);
    setUnitaire(prod[0].prix_unitaire);
    setVente(prod[0].prix_vente);
    setId(prod[0].id);
  };
  return (
    <div className=" mt-4 flex flex-col gap-3 p-10">
       <h1 className=" text-slate-900 font-bold text-[20px] m-auto mt-3 w-fit">
        La Gestion Des Produits
      </h1>
      <form action="" className=" w-[50%]">
        <div className=" flex flex-col gap-1 mt-3">
          <label className=" text-slate-900/70 font-medium ">Nom Produit</label>
          <input
            value={nom}
            className=" border border-slate-300 px-3 py-2 outline-none rounded-lg focus:border-blue-400"
            type="text"
            placeholder="entrer nom produit"
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className=" flex flex-col gap-1 mt-3">
          <label className=" text-slate-900/70 font-medium ">
            Prix Unitaire
          </label>
          <input
            className=" border border-slate-300 px-3 py-2 outline-none rounded-lg focus:border-blue-400"
            type="text"
            value={unitaire}
            placeholder="Prix Unitaire"
            onChange={(e) => setUnitaire(e.target.value)}
          />
        </div>
        <div className=" flex flex-col gap-1 mt-3">
          <label>Prix Vente</label>
          <input
            className=" border border-slate-300 px-3 py-2 outline-none rounded-lg focus:border-blue-400"
            type="text"
            value={vente}
            placeholder="Prix Vente"
            onChange={(e) => setVente(e.target.value)}
          />
        </div>
        <div className=" flex gap-2 items-center">
          <button
            className=" bg-blue-500 text-white py-2 px-5 rounded-lg mt-3"
            onClick={AjouterProduit}
          >
            Ajouter Produit
          </button>
          <button
            className=" bg-green-500 text-white py-2 px-5 rounded-lg mt-3"
            onClick={handlePdoduit}
          >
            Modifier Produit
          </button>
        </div>
      </form>

      <table className="table-auto">
        <thead>
          <tr className=" bg-blue-200">
            {/* <th className="pt-5 pl-5 pr-5 pb-5">Selected</th> */}
            <th className="pt-5 pl-5 pr-5 pb-5">Nom Produit</th>
            <th className="pt-5 pl-5 pr-5 pb-5">Prix Unitaire</th>
            <th className="pt-5 pl-5 pr-5 pb-5">Prix De Vente</th>
            <th className="pt-5 pl-5 pr-5 pb-5">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {products?.map((item) => (
            <tr key={item.id} className="hover:bg-blue-300/10 text-center">
              {/* <td className="pt-5 pl-5 pr-5 pb-5 "><input type="checkbox" onChange={handleCheck} value={item.id}/></td> */}
              <td className="pt-5 pl-5 pr-5 pb-5 ">{item.nom}</td>
              <td className="pt-5 pl-5 pr-5 pb-5 ">{item.prix_unitaire} DH</td>
              <td className="pt-5 pl-5 pr-5 pb-5 ">{item.prix_vente} DH</td>
              <td className="pt-5 pl-5 pr-5 pb-5 flex gap-2 items-center justify-center ">
                <button
                  className=" bg-red-600 px-4 py-1 rounded-xl text-white"
                  onClick={() => deleteProduit(item.id)}
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
  );
};

export default Produits;
