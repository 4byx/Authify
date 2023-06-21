import React, { useEffect } from "react";

const AlertBox = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 top-2 flex justify-center z-50">
      <div className="bg-green-500 text-white font-bold rounded-lg py-2 px-4 h-10">
        {message}
      </div>
    </div>
  );
};

export default AlertBox;
