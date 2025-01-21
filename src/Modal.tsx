interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function Modal({ isOpen, onClose, message }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-100 rounded-lg p-8 max-w-sm w-full m-4 ">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{message}</h3>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#fc869a] to-[#8a48fc] text-white px-4 py-2 border-2 border-black rounded-lg hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
