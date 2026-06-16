import React from 'react';
import clevertap from 'clevertap-web-sdk';

const PopUps = () => {
  
  const handleTriggerPopup = () => {
    // Check to ensure the global clevertap object exists before calling it
    if (typeof window !== 'undefined' && window.clevertap) {
      
      // 1. Raise the event that triggers your campaign
      window.clevertap.event.push("html event");
      console.log("CleverTap event pushed!");
      
    } else {
      console.warn("CleverTap SDK not found on window object.");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800">CleverTap Web Pop-ups</h2>
      <p className="text-slate-600 mb-6 text-center max-w-md">
        Clicking the button below will fire a CleverTap event. If you have an active campaign matching this event, the pop-up will appear.
      </p>
      
      <button 
        onClick={handleTriggerPopup}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg shadow transition-all transform active:scale-95"
      >
        Show Me a Pop-up
      </button>
    </div>
  );
};

export default PopUps;