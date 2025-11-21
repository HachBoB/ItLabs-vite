type FilterBarProps = {
    filter: {name: string; present: boolean | null};
    onFilterChange: (filter: {name: string; present: boolean | null}) => void;
};

export default function FilterBar({filter, onFilterChange}: FilterBarProps) {
    return (
        <div className="flex items-center pt-4 pb-2 absolute bottom-[2%] left-[2%]">
            <div className="flex gapgap items-center">
                <b className=" text-sm font-bold mr-[30px]">Фильтровать по:</b>
                <button
                    className={`bg-bot rounded border text-sm transition ${
                        filter.present === false ? "" : ""
                    }`}
                    onClick={() => onFilterChange({...filter, present: false})}
                >
                    Отсутствующие
                </button>
                <button
                    className={`bg-bot rounded border text-sm transition ${
                        filter.present === true ? "bg-green" : ""
                    }`}
                    onClick={() => onFilterChange({...filter, present: true})}
                >
                    Присутствующие
                </button>
                <button
                    className="bg-bot rounded border text-sm transition "
                    onClick={() => onFilterChange({...filter, present: null})}
                >
                    Без фильтра
                </button>
            </div>
        </div>
    );
}
