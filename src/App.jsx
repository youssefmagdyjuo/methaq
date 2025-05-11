import "./App.css";
import MainContent from "./assets/components/mainContent";
import { Route, Routes } from "react-router-dom";
import Zakah from "./assets/pages/zahah";
import Money from "./assets/pages/money";
import Gold from "./assets/pages/gold";
import Silver from "./assets/pages/silver";
import Zoroa from "./assets/pages/zoroa";
import Azkar from "./assets/pages/azkar";
import AzkarDetils from "./assets/pages/azkarDetils";
import NavBar from "./assets/components/navBar";
import Sbha from "./assets/pages/sbha";
import Notfound from "./assets/pages/notfound";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/zakah" element={<Zakah />} />
        <Route path="/zakah/money" element={<Money />} />
        <Route path="/zakah/gold" element={<Gold />} />
        <Route path="/zakah/silver" element={<Silver />} />
        <Route path="/zakah/zoroa" element={<Zoroa />} />
        <Route path="*" element={<Notfound/>} />
        <Route path="/azkar" element={<Azkar />} />
        <Route path="/azkarDetils/:zekrId" element={<AzkarDetils />} />
        <Route path="/sbha" element={<Sbha/>}/>
      </Routes>
      {/* <NavBar /> */}
    </div>
  );
}

export default App;
