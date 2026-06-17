import clevertap from "clevertap-web-sdk";
import React, { useState, useEffect } from "react";

const Navbar = ({ activeTab, setActiveTab }) => {

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Poll the unread count shortly after the component mounts 
    // to give the SDK time to fetch active messages
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && clevertap) {
        try {
          const count = clevertap.getInboxMessageUnreadCount() || 0;
          setUnreadCount(count);
        } catch (error) {
          console.error("Error reading CleverTap unread count:", error);
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeTab]); // Refreshes

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

          <button
          onClick={() => {
            setActiveTab("native-display");

            clevertap.event.push("web native event");
          }}
          className={`px-4 py-2 rounded transition font-medium ${
            activeTab === "native-display"
              ? "bg-amber-600 text-white"
              : "bg-slate-700 hover:bg-slate-600 text-amber-400"
          }`}
        >
          ✨ Native Display
        </button>


        <button
          id="bell-icon" // <-- CRITICAL: Must match the Inbox Selector ID in your dashboard settings
          onClick={(e) => {
            setActiveTab("web-inbox");
            
            if (clevertap) {
              clevertap.toggleInbox(e); // <-- CRITICAL: Pass the click event for dropdown positioning
            }
          }}
          className={`px-4 py-2 rounded transition relative flex items-center gap-2 ${
            activeTab === "web-inbox" ? "bg-rose-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-rose-400"
          }`}
        >
          <span>📥 Inbox</span>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;