import React from 'react';

const NativeDisplay = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Native Display</h2>

      {/* This div ID must exactly match what you configured in CleverTap dashboard */}
      <div id="native-display-banner" className='top-banner-container' style={{ minHeight: '400px' }}>
        {/* CleverTap will inject the banner/carousel here */}
      </div>
    </div>
  );
};

export default NativeDisplay;