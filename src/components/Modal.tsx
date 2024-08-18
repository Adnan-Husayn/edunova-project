import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg overflow-hidden w-full max-w-lg mx-auto">
                <div className="p-4">
                    <button className="float-right" onClick={onClose}>
                        Close
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
