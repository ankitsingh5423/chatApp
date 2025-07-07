import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center align-middle items-center min-h-lvh">
      <h1
        className="inline-block text-9xl font-bold
      bg-gradient-to-r from-10% to-80% from-slate-100 to-neutral-700
      bg-clip-text text-transparent  animate-bounce"
      >
        404
      </h1>
      <h2 className="text-8xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-20% to-70% from-white to-blue-900">
        Not Found
      </h2>
    </div>
  );
};

export default NotFound;
