import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center my-5">
            <div className="w-32 h-32 border-4 border-primary border-dashed rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;