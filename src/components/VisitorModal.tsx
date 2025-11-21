import VisitorForm from "./VisitorForm";

type Visitor = {
    id: string;
    fullName: string;
    company: string;
    group: string;
    present: boolean;
};

type VisitorModalProps = {
    isOpen: boolean;
    onClose: () => void;
    editVisitor: Visitor | null;
    onSave: (data: Omit<Visitor, "id">, id?: string) => void;
    onDelete: (id: string) => void;
};

export default function VisitorModal({
                                         isOpen,
                                         onClose,
                                         editVisitor,
                                         onSave,
                                         onDelete,
                                     }: VisitorModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center" onClick={onClose}>
            <div className="absolute inset-0 "></div>

            <div
                className="relative z-50  rounded-2xl left-[55%] mt-[180px] shadow-2xl w-[880px] bg-white p-8 h-[400px] shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-[1%] top-[1%] text-gray-400 hover:text-gray-600 text-2xl"
                    onClick={onClose}
                >
                    ×
                </button>
                <VisitorForm
                    initialData={editVisitor}
                    onSubmit={(data) => onSave(data, editVisitor?.id)}
                    onDelete={editVisitor?.id ? () => onDelete(editVisitor.id) : undefined}
                    onClose={onClose}
                />
            </div>
        </div>
    );
}
