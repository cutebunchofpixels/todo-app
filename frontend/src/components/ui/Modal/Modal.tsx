import { ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    onModalClose: () => void;
    children: ReactNode;
    title: string;
}

export default function Modal({
    isOpen,
    onModalClose,
    children,
    title,
}: ModalProps) {
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
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
}

