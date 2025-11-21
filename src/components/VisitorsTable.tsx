type Visitor = {
    id: string;
    fullName: string;
    company: string;
    group: string;
    present: boolean;
};

type VisitorsTableProps = {
    visitors: Visitor[];
    loading: boolean;
    onRowClick: (visitor: Visitor) => void;
};

export default function VisitorsTable({visitors, loading, onRowClick}: VisitorsTableProps) {
    if (loading) {
        return <div className="text-gray-500 mt-10">Загрузка...</div>;
    }

    return (
        <table className="w-full border-none rounded-xl shadow-sm">
            <thead>
            <tr className=" text-xs text-gray-600">
                <th className="py-2 px-4 w-32 text-left shadow-[0_1px_1px_0_rgba(0,0,0,0.08)]">Номер</th>
                <th className="py-2 px-4 text-left shadow-[0_1px_1px_0_rgba(0,0,0,0.08)]">ФИО</th>
                <th className="py-2 px-4 text-left shadow-[0_1px_1px_0_rgba(0,0,0,0.08)]">Компания</th>
                <th className="py-2 px-4 text-left shadow-[0_1px_1px_0_rgba(0,0,0,0.08)]">Группа</th>
                <th className="py-2 px-4 text-right shadow-[0_1px_1px_0_rgba(0,0,0,0.08)]">Присутствие</th>
            </tr>
            </thead>
            <tbody>
            {visitors.map((v, idx) => (
                <tr
                    key={v.id}
                    className={` cursor-pointer ${
                        idx < visitors.length - 1 ? "border-b border-gray-200" : ""
                    }`}
                    onClick={() => onRowClick(v)}
                >
                    <td className="py-2 px-4 text-left">{idx + 1}</td>
                    <td className="py-2 px-4">{v.fullName}</td>
                    <td className="py-2 px-4">{v.company}</td>
                    <td className="py-2 px-4">{v.group}</td>
                    <td className="py-2 px-4 flex justify-end mr-[3%]">
                            <span
                                style={{background: v.present ? '#22c55e' : '#ef4444'}}
                                className="inline-block rounded-full w-[59px] h-[59px]"
                            ></span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
