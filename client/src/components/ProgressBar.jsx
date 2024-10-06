/* eslint-disable react/prop-types */
import React from 'react';

const ProgressBar = ({ currentPage, totalPages }) => (
    <div className="w-full md:w-3/4 mb-4 mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
            ></div>
        </div>
    </div>
);

export default ProgressBar;