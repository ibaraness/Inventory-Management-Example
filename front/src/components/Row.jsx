import RowItem from "./RowItem";

 
export default function Row({product, onEdit = (e) => {}, onDelete = (e) => {}}){
    const {id, category_title, title, price, quantity} = product;

    function handleEdit(){
        onEdit(product)
    }

    return (
        <div className="flex flex-row px-4 shrink-0 odd:bg-slate-300 py-2">
            <RowItem>{id}</RowItem>
            <RowItem>{title}</RowItem>
            <RowItem>{category_title}</RowItem>
            <RowItem>{price}</RowItem>
            <RowItem>{quantity}</RowItem>
            <RowItem><button onClick={()=>onEdit(product)} className=" bg-blue-800 text-sm rounded-md px-2 py-2 text-white hover:bg-blue-500">Edit</button></RowItem>
            <RowItem><button onClick={()=>onDelete(product)} className=" bg-red-800 text-sm rounded-md px-2 py-2 text-white hover:bg-red-500">Delete</button></RowItem>
        </div>
    )
}

