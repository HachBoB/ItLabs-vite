import {useEffect, useState} from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import VisitorsTable from "./components/VisitorsTable";
import VisitorModal from "./components/VisitorModal";

type Visitor = {
    id: string;
    fullName: string;
    company: string;
    group: string;
    present: boolean;
};

const API_URL = "http://localhost:3000/visitors";
export const groupOptions = ["Прохожий", "Клиент", "Партнер"];

export default function App() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [allVisitors, setAllVisitors] = useState<Visitor[]>([]); // ← новый state
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({name: "", present: null as boolean | null});
    const [modal, setModal] = useState(false);
    const [editVisitor, setEditVisitor] = useState<Visitor | null>(null);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setAllVisitors(data));
    }, []);

    useEffect(() => {
        fetchVisitors();
    }, [filter]);

    const fetchVisitors = async () => {
        setLoading(true);
        let query = [];
        if (filter.name) query.push(`fullName_like=${encodeURIComponent(filter.name)}`);
        if (filter.present !== null) query.push(`present=${filter.present}`);
        const res = await fetch(`${API_URL}${query.length ? "?" + query.join("&") : ""}`);
        const data: Visitor[] = await res.json();
        setVisitors(data);
        setLoading(false);
    };

    const presentCount = allVisitors.filter(v => v.present).length;
    const absentCount = allVisitors.filter(v => !v.present).length;
    const openModal = (v?: Visitor) => {
        setEditVisitor(v ?? null);
        setModal(true);
    };

    const closeModal = () => {
        setEditVisitor(null);
        setModal(false);
    };

    const saveVisitor = async (v: Omit<Visitor, "id">, id?: string) => {
        if (id) {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...v, id}),
            });
        } else {
            const newVisitor: Visitor = {...v, id: Date.now().toString()};
            await fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newVisitor),
            });
        }
        closeModal();
        fetchVisitors();
    };

    const deleteVisitor = async (id: string) => {
        await fetch(`${API_URL}/${id}`, {method: "DELETE"});
        closeModal();
        fetchVisitors();
    };

    return (
        <div className="min-h-screen flex-col w-full bg-white">
            <VisitorModal
                isOpen={modal}
                onClose={closeModal}
                editVisitor={editVisitor}
                onSave={saveVisitor}
                onDelete={deleteVisitor}
            />

            <div className="mx-auto px-[5%] py-[2%] w-full flex-col">
                <Header
                    presentCount={presentCount}
                    absentCount={absentCount}
                    searchValue={filter.name}
                    onSearchChange={(name) => setFilter({...filter, name})}
                    onAddClick={() => openModal()}
                />

                <FilterBar
                    filter={filter}
                    onFilterChange={(newFilter) => setFilter(newFilter)}
                />

                <VisitorsTable
                    visitors={visitors}
                    loading={loading}
                    onRowClick={(visitor) => openModal(visitor)}
                />
            </div>
        </div>
    );
}
