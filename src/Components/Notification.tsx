import React from "react";
import CleverTap from "clevertap-web-sdk";

const Notification = () => {

  const handleEnablePush = () => {

    CleverTap.event.push("Web Notification On")

    // CleverTap.notifications.push({
    //   titleText: "Would you like to receive Push Notifications?",
    //   bodyText: "We promise to only send you relevant content and give you updates on your transactions",
    //   okButtonText: "Sign me up!",
    //   rejectButtonText: "No thanks",
    //   okButtonColor: "#1976d2",
    //   askAgainTimeInSeconds: 5,
    //   serviceWorkerPath: "/CleverTap_sw.js"
    // });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Notification</h2>
      <p>Notification-related actions will go here.</p>
      <button
        onClick={handleEnablePush}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Enable Push Notifications
      </button>
    </div>
  );
};

export default Notification;