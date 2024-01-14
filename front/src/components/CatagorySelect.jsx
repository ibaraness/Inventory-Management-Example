import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function CatagorySelect({change = (e)=>{}, categoryId=0}) {
    const { categories } = useContext(AppContext);

    const categoryOptions = categories.map(({ id, title }) => (
        <option key={id} value={id}>{title}</option>
    ));
    return (
        <select value={categoryId} onChange={event => change(event.target.value)} className="w-96 border border-slate-300 outline-none py-1 rounded-md text-slate-800 ml-2 px-4">
            <option value={0}>All</option>
            {categoryOptions}
        </select>
    )
}