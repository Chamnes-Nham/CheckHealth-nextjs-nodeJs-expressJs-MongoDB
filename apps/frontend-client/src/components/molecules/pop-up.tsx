import React, { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="ml-[5%] fixed inset-0 w-[90%]  flex items-center justify-center z-50">
      <div className="absolute -inset-40 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-10 w-[98%] h-auto mt-[15px]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">{title} </h2>
          <button onClick={onClose} className="text-xl bg-gray-500 rounded-full px-2 -py-1 -mr-2 -mt-[8px] text-white font-semibold">&times;</button>
        </div>
        <div className='p-5 pt-1'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
