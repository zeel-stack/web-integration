import clevertap from "clevertap-web-sdk";
import React from "react";

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">My APP</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("create-user")}
          className={`px-4 py-2 rounded transition ${
            activeTab === "create-user" ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Create User
        </button>

        <button
          onClick={() => setActiveTab("notification")}
          className={`px-4 py-2 rounded transition ${
            activeTab === "notification" ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Notification
        </button>

        {/* NEW BUTTON TO CHOOSE THE POPUPS TAB */}
        <button
          onClick={() => {
            setActiveTab("popups");
            clevertap.event.push("html event")
          } }
          className={`px-4 py-2 rounded transition ${
            activeTab === "popups" ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Web Pop-ups
        </button>
      </div>
    </nav>
  );
};

export default Navbar;