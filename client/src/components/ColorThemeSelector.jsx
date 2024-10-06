/* eslint-disable react/prop-types */
import React from 'react';

const colorOptions = [
    { color: "#000000", theme: 'black' },
    { color: "#fff248", theme: 'cyberpunk' },
    { color: '#171212', theme: 'forest' },
    { color: '#1a103d', theme: 'synthwave' },
    { color: '#09090b', theme: 'luxury' },
    { color: '#ebe2ca', theme: 'retro' },
    { color: '#f8def', theme: 'lemonade' }
];

const ColorThemeSelector = ({ colorTheme, setColorTheme }) => (
    <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Choose your color theme</h2>
        <div className="flex flex-wrap gap-2 mb-4">
            {colorOptions.map((option) => (
                <button
                    key={option.color}
                    className={`w-8 h-8 rounded-full ring-2 ring-offset-1 ring-white-500 ${option.color === colorTheme.color ? 'ring-2 ring-offset-1 ring-red-500' : ''}`}
                    style={{ backgroundColor: option.color }}
                    onClick={() => setColorTheme(option)}
                />
            ))}
        </div>
    </div>
);

export default ColorThemeSelector;