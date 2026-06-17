import React, { useEffect, useState } from 'react';
import clevertap from 'clevertap-web-sdk';

const WebInbox = () => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchInboxData = () => {
    if (typeof window !== 'undefined' && clevertap) {
      const allMessages = clevertap.getAllInboxMessages();
      const unread = clevertap.getInboxMessageUnreadCount() || 0;
      
      if (allMessages) {
        // CleverTap returns an object map keyed by message ID; convert it to an array
        setMessages(Object.values(allMessages));
      }
      setUnreadCount(unread);
    }
  };

  useEffect(() => {
    // Wait for the SDK connection state to be ready
    const timer = setTimeout(() => {
      fetchInboxData();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleMarkAllRead = () => {
    if (clevertap) {
      clevertap.markReadAllInboxMessage();
      setUnreadCount(0);
      fetchInboxData(); // Refresh list layout state
    }
  };

  const handleDeleteMessage = (msgId) => {
    if (clevertap) {
      clevertap.deleteInboxMessage(msgId);
      setMessages(prev => prev.filter(m => m.id !== msgId));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Notification Archive
            {unreadCount > 0 && (
              <span className="text-xs bg-rose-100 text-rose-700 rounded-full px-2.5 py-1 font-semibold">
                {unreadCount} Unread
              </span>
            )}
          </h2>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition"
        >
          Mark All as Read
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
          <span className="text-4xl block mb-2">📭</span>
          Your custom inbox list is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border transition ${
                !msg.viewed 
                  ? 'border-blue-300 bg-blue-50/50 shadow-sm' 
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  {/* Extract titles dynamically based on format nested rules */}
                  <h3 className="font-bold text-slate-900">{msg.msg?.[0]?.title || "Notification"}</h3>
                  <p className="text-sm text-slate-600 mt-1">{msg.msg?.[0]?.description || "No text description provided."}</p>
                </div>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-700 p-1 bg-rose-50 hover:bg-rose-100 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebInbox;