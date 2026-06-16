import { useState } from "react";
import Navbar from "./components/Navbar";
import CreateUser from "./components/CreateUser";
import Notification from "./components/Notification";

function App() {
  const [activeTab, setActiveTab] = useState("create-user");

  return (
    <div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-6">
        {activeTab === "create-user" && <CreateUser />}
        {activeTab === "notification" && <Notification />}
      </div>
    </div>
  );
}

export default App;