import {useState} from "react";
import {groupOptions} from "../App";

type Visitor = {
    id: string;
    fullName: string;
    company: string;
    group: string;
    present: boolean;
};

type VisitorFormProps = {
    initialData: Visitor | null;
    onSubmit: (data: Omit<Visitor, "id">) => void;
    onDelete?: () => void;
    onClose: () => void;
};

export default function VisitorForm({
                                        initialData,
                                        onSubmit,
                                        onDelete,
                                        onClose,
                                    }: VisitorFormProps) {
    const [form, setForm] = useState<Omit<Visitor, "id">>({
        fullName: initialData?.fullName ?? "",
        company: initialData?.company ?? "",
        group: initialData?.group ?? groupOptions[0],
        present: initialData?.present ?? false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center mt-[50px]">
            <div className="flex items-center justify-between w-[60%]">
                <label className="w-24 font-semibold text-gray-700">ФИО</label>
                <input
                    required
                    type="text"
                    placeholder="Введите ФИО"
                    className=" rounded-lg border-none w-[350px] h-[52px]  shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={form.fullName}
                    onChange={e => setForm({...form, fullName: e.target.value})}
                />
            </div>

            <div className="flex w-[60%] items-center justify-between">
                <label className="w-24 font-semibold text-gray-700">Компания</label>
                <input
                    required
                    type="text"
                    placeholder="Введите компанию"
                    className="rounded-lg border-none w-[350px] h-[52px]  shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={form.company}
                    onChange={e => setForm({...form, company: e.target.value})}
                />
            </div>

            <div className="flex w-[60%] justify-between">
                <label className="w-24 font-semibold text-gray-700">Группа</label>
                <select
                    required
                    className="rounded-lg border-none w-[350px] h-[52px]  shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={form.group}
                    onChange={e => setForm({...form, group: e.target.value})}
                >
                    {groupOptions.map(opt => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex w-[60%] justify-between">
                <label htmlFor="present" className="w-24 font-semibold text-gray-700">
                    Присутствует
                </label>
                <input
                    type="checkbox"
                    id="present"
                    checked={form.present}
                    onChange={e => setForm({...form, present: e.target.checked})}
                    className="w-6 h-6 cursor-pointer"
                />
            </div>

            <div className="flex button-gap mt-[30px]">
                <button
                    type="submit"
                    className="w-[200px] greenbutton  font-bold py-2 px-4 rounded-lg transition"
                >
                    {onDelete ? "Сохранить" : "Добавить"}
                </button>
                {onDelete && (
                    <button
                        type="button"
                        className="w-[200px] redbutton  font-bold py-2 px-4 rounded-lg transition"
                        onClick={onDelete}
                    >
                        Удалить
                    </button>
                )}
                <button
                    type="button"
                    className="w-[200px] greybutton  font-bold  rounded-lg transition"
                    onClick={onClose}
                >
                    Закрыть
                </button>
            </div>
        </form>
    );
}
