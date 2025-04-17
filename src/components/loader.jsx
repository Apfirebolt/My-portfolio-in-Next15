import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-24 bg-gray-100">
            <div className="relative w-24 h-24 border-4 border-t-4 border-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
        </div>
    );
};

export default Loader;