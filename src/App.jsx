import { useState } from "react";
import CreateUser from "./components/CreateUser";
import Notification from "./components/Notification";
import NativeDisplay from "./components/NativeDisplay";
import Navbar from "./components/Navbar";

function App() {
  const [activeTab, setActiveTab] = useState("create-user");

  return (
    <div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-6">
        {activeTab === "create-user" && <CreateUser />}
        {activeTab === "notification" && <Notification />}
        {activeTab === "native-display" && <NativeDisplay />}
      </div>
    </div>
  );
}

export default App;