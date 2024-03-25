import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Fournisseur from "./pages/Fournisseur";
import Achat from "./pages/Achat";
import Vente from "./pages/Vente";
import Produits from "./pages/Produits";
import MainProvider from "./context/MainContext";
import Client from "./pages/Client";

function App() {
  return (
    <MainProvider>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fournisseurs" element={<Fournisseur />} />
        <Route path="/client" element={<Client />} />
        <Route path="/achat" element={<Achat />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/produits" element={<Produits />} />

      </Routes>
    </Layout>
    </MainProvider>
  );
}

export default App;
