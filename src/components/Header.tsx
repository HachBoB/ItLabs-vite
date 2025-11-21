type HeaderProps = {
    presentCount: number;
    absentCount: number;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onAddClick: () => void;
};

export default function Header({
                                   presentCount,
                                   absentCount,
                                   searchValue,
                                   onSearchChange,
                                   onAddClick,
                               }: HeaderProps) {
    return (
        <div className="flex-wrap justify-between flex content-between items-center mb-4">
            <div className="flex items-center">
                <img src="/src/assets/logo.png" alt="Logo" />
                <input
                    type="text"
                    placeholder="Поиск по имени"
                    className=" rounded-lg ml-[20px] border-none w-[394px] h-[52px]  shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] focus:outline-none focus:ring-0"
                    value={searchValue}
                    onChange={e => onSearchChange(e.target.value)}
                />
                <button
                    onClick={onAddClick}
                    className=" rounded-lg bg-[#4CAF50] w-[273px] ml-[20px] h-[52px] text-white font-bold hover:bg-green-600 transition"
                >
                    Добавить
                </button>
            </div>
            <div className="text-right text-[30px] font-bold flex items-center ">
                <b className="green">{presentCount}</b>
                <b className="text-[#6c4009] mx-1">/</b>
                <b className="rad">{absentCount}</b>
            </div>
        </div>
    );
}
