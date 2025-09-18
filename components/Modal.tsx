import React, { useEffect } from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="relative z-50 grid w-full max-w-lg gap-4 border bg-card p-6 shadow-lg rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg font-semibold leading-none tracking-tight text-foreground">{title}</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {children}
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button 
                onClick={onClose} 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-2 sm:mt-0"
            >
                Close
            </button>
        </div>
        <button onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;