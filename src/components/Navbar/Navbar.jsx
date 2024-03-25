import React,{useState} from "react";
import moto from "../../assets/moto.png";
import { Link } from "react-router-dom";
const Navbar = () => {
   // Define state variable to keep track of active item
   const [activeItem, setActiveItem] = useState('home');

   // Function to update active item
   const handleItemClick = (item) => {
     setActiveItem(item);
   };
  return (
    <div className=" w-[200px] h-[100vh] bg-[#17191e] top-0 left-0  shadow-lg text-white shadow-gray-500 fixed">
      <img
        src={moto}
        alt=""
        width={140}
        height={140}
        className=" m-auto cursor-pointer"
      />
      <ul className=" flex flex-col gap-4 w-full">
        <li  className={activeItem === 'home' ? 'active pl-2 w-full p-2' : 'pl-2 w-full p-2 hover:bg-[#4f7fbd45]'} onClick={() => handleItemClick('home')}>
          <Link className=" w-full block" to="/">
            Home
          </Link>
        </li>
        <li className={activeItem === 'fournisseur' ? 'active pl-2 w-full p-2' : 'pl-2 w-full p-2 hover:bg-[#4f7fbd45]'} onClick={() => handleItemClick('fournisseur')}>
          <Link className="w-full block" to="/fournisseurs">
            Fournissuer
          </Link>
        </li>
        <li className={activeItem === 'achat' ? 'active pl-2 w-full p-2' : 'pl-2 w-full p-2 hover:bg-[#4f7fbd45]'} onClick={() => handleItemClick('achat')}>
          <Link className=" w-full block" to="/achat">
            Achats
          </Link>
        </li>
        <li className={activeItem === 'vente' ? 'active pl-2 w-full p-2' : 'pl-2 w-full p-2 hover:bg-[#4f7fbd45]'} onClick={() => handleItemClick('vente')}>
          <Link className=" w-full block" to="/vente">
            Vente
          </Link>
        </li>
        <li className={activeItem === 'client' ? 'active pl-2 w-full p-2' : 'pl-2 w-full p-2 hover:bg-[#4f7fbd45]'} onClick={() => handleItemClick('client')}>
          <Link className=" w-full block" to="/client">
            Client
          </Link>
        </li>
        <li className={activeItem === 'produits' ? 'active pl-2 w-full p-2' : 'pl-2 w-full p-2 hover:bg-[#4f7fbd45]'} onClick={() => handleItemClick('produits')}>
          <Link className=" w-full block" to="/produits">
            Produits
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
