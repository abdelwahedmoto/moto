import React , {useState} from "react";
import { UseMainContext } from "../context/MainContext";
const Client = () => {
  const { client, ajouterClient, deleteClient, ModifierClient } =
    UseMainContext();
    const [nom, setNom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [adress, setAdress] = useState("");
    const [id, setId] = useState(0);

  // add product
  const AjouterFournissuer = (event) => {
    event.preventDefault();
    if (nom === "" && telephone === "" && adress === "") {
      alert("svp remplir tout les champs");
      return;
    }
    ajouterClient(nom, telephone, adress);
    //createProduit()
  };
  //Modifer
  const handleFournisseur = (e) => {
    e.preventDefault();
    if (nom === "" && telephone === "" && adress === "") {
      alert("svp remplir tout les champs");
      return;
    }
    ModifierClient(id, nom, telephone, adress);
  };
  // delete produit
  const deleteProduit = (id) => {
    deleteClient(id);
  };

  const handleUpdate = (id) => {
    const prod = client.filter((state) => state.id === id);
    setNom(prod[0].nom);
    setTelephone(prod[0].telephone);
    setAdress(prod[0].adress);
    setId(prod[0].id);
  };
  return (
    <div className=" py-10 px-16">
       <h1 className=" text-slate-900 font-bold text-[20px] m-auto mt-3 w-fit">
        Client
      </h1>
      <form action="" className=" w-[50%]">
        <div className=" flex flex-col gap-1 mt-3">
          <label className=" text-slate-900/70 font-medium ">
            Nom Client
          </label>
          <input
            value={nom}
            className=" border border-slate-300 px-3 py-2 outline-none rounded-lg focus:border-blue-400"
            type="text"
            placeholder="entrer nom Client"
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className=" flex flex-col gap-1 mt-3">
          <label className=" text-slate-900/70 font-medium ">Telephone :</label>
          <input
            className=" border border-slate-300 px-3 py-2 outline-none rounded-lg focus:border-blue-400"
            type="text"
            value={telephone}
            placeholder="Telephone"
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className=" flex flex-col gap-1 mt-3">
          <label>Adress</label>
          <input
            className=" border border-slate-300 px-3 py-2 outline-none rounded-lg focus:border-blue-400"
            type="text"
            value={adress}
            placeholder="Adress"
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>
        <div className=" flex gap-2 items-center">
          <button
            className=" bg-blue-500 text-white py-2 px-5 rounded-lg mt-3"
            onClick={AjouterFournissuer}
          >
            Ajouter Fournissuer
          </button>
          <button
            className=" bg-green-500 text-white py-2 px-5 rounded-lg mt-3"
            onClick={handleFournisseur}
          >
            Modifier Fournissuer
          </button>
        </div>
      </form>

      <table className="table-auto mt-10">
        <thead>
          <tr className=" bg-blue-200">
            {/* <th className="pt-5 pl-5 pr-5 pb-5">Selected</th> */}
            <th className="pt-5 pl-5 pr-5 pb-5">Nom Fournissuer</th>
            <th className="pt-5 pl-5 pr-5 pb-5">Telephone</th>
            <th className="pt-5 pl-5 pr-5 pb-5">Adress</th>
          </tr>
        </thead>
        <tbody className="">
          {client?.map((item) => (
            <tr key={item.id} className="hover:bg-blue-300/10 text-center">
              {/* <td className="pt-5 pl-5 pr-5 pb-5 "><input type="checkbox" onChange={handleCheck} value={item.id}/></td> */}
              <td className="pt-5 pl-5 pr-5 pb-5 ">{item.nom}</td>
              <td className="pt-5 pl-5 pr-5 pb-5 ">{item.telephone}</td>
              <td className="pt-5 pl-5 pr-5 pb-5 ">{item.adress} </td>
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

export default Client;
