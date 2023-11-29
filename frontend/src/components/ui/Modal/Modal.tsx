import { ReactNode } from "react";

export default function Modal({
    isOpen,
    onModalClose,
    children,
}: {
    isOpen: boolean;
    onModalClose: () => void;
    children: ReactNode;
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/25 transition p-10"
            onClick={onModalClose}
        >
            <div
                className="bg-white p-12 rounded"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

