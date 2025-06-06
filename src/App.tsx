import React, { useState } from 'react';
import GhibliBroadcast from './components/GhibliBroadcast';
import { defaultBroadcastData } from './data/broadcastData';
import { BroadcastData } from './types';
import './App.css';

function App() {
  const [broadcastData] = useState<BroadcastData>(defaultBroadcastData);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          LPL Broadcast Viewer
        </h1>
        
        {/* 尺寸控制器 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4">Canvas Dimensions</h2>
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width:
              </label>
              <input
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions(prev => ({ ...prev, width: parseInt(e.target.value) || 895 }))}
                className="border border-gray-300 rounded px-3 py-1 w-20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height:
              </label>
              <input
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions(prev => ({ ...prev, height: parseInt(e.target.value) || 565 }))}
                className="border border-gray-300 rounded px-3 py-1 w-20"
              />
            </div>
            <button
              onClick={() => setDimensions({ width: 895, height: 565 })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
            >
              Reset
            </button>
          </div>
        </div>

        {/* 组件展示区域 */}
        <div className="flex justify-center">
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <GhibliBroadcast 
              data={broadcastData} 
              width={dimensions.width}
              height={dimensions.height}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;