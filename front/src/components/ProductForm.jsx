import { useState, useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext";
import CatagorySelect from "./CatagorySelect";

export const productTemplate = {
    id:'',
    title:'',
    category_id:0,
    category_title:'All',
    price:'',
    quantity:''
}

export default function ProductForm({product = productTemplate, onSave = (value)=>{}, onClear = () => {}}) {
    const [currentProduct, setCurrentProduct] = useState(product);
    const { categories } = useContext(AppContext);
    const [formValid, setFormValid] = useState(false);

    useEffect(()=>{
        setCurrentProduct(product);
        validateForm(product);
    },[product])

    function setTitle(title){
        setCurrentProduct({...currentProduct, title});
        validateForm({...currentProduct, title});
    }

    function validateForm(product){
        const {title, category_id, price, quantity} = product;
        setFormValid(title && category_id && price && quantity || false);
    }

    function setCategory(categoryId){
        const category = categories.find(cat => +cat.id === +categoryId);
        if(!category){
            return;
        }
        setCurrentProduct({...currentProduct, category_id:category.id, category_title:category.title});
        setFormValid({...currentProduct, category_id:category.id, category_title:category.title});
    }
    function setPrice(price){
        setCurrentProduct({...currentProduct, price});
        validateForm({...currentProduct, price});
    }

    function setQuantity(quantity){
        setCurrentProduct({...currentProduct, quantity});
        validateForm({...currentProduct, quantity});
    }

    function save(){
        onSave(currentProduct);
        setCurrentProduct({...productTemplate});
        setFormValid(false);
    }

    function clear(){
        onClear();
        setCurrentProduct({...productTemplate});
        setFormValid(false);
    }

    return (
        <>
            {/* Form */}
            <div className="p-4 border border-slate-500 mt-4">
                <h2 className=" text-xl font-bold mb-4 text-left">Edit Product Form</h2>
                <div className="flex flex-row w-full mb-4">
                    <label className="basis-1/6 text-right mr-2">Id</label>
                    <input type="text" value={currentProduct.id || ''} disabled className=" basis-1/2 border border-slate-300 outline-none py-1 shadow-sm ring-1 ring-inset ring-gray-300 pl-3 rounded-md text-slate-500" />
                </div>
                <div className="flex flex-row w-full mb-4">
                    <label className="basis-1/6 text-right mr-2">Title</label>
                    <input type="text" value={currentProduct.title} onChange={event => setTitle(event.target.value)} className=" basis-1/2 border border-slate-300 outline-none py-1 shadow-sm ring-1 ring-inset ring-gray-300 pl-3 rounded-md text-slate-500" />
                </div>
                <div className="flex flex-row w-full mb-4">
                    <label className="basis-1/6 text-right mr-2">Category</label>
                    <CatagorySelect categoryId={currentProduct.category_id || 0} change={value => setCategory(value)}></CatagorySelect>
                </div>

                <div className="flex flex-row w-full mb-4">
                    <label className="basis-1/6 text-right mr-2">Price</label>
                    <input type="number" value={currentProduct.price} onChange={event => setPrice(event.target.value)} className=" basis-1/2 border border-slate-300 outline-none py-1 shadow-sm ring-1 ring-inset ring-gray-300 pl-3 rounded-md text-slate-500" />
                </div>
                <div className="flex flex-row w-full mb-4">
                    <label className="basis-1/6 text-right mr-2">Quantity</label>
                    <input type="number" value={currentProduct.quantity} onChange={event => setQuantity(event.target.value)} className=" basis-1/2 border border-slate-300 outline-none py-1 shadow-sm ring-1 ring-inset ring-gray-300 pl-3 rounded-md text-slate-500" />
                </div>
                <div className="flex flex-row w-full mb-4 justify-center">
                    <button disabled={!formValid} onClick={()=>save()} type="button" role="button" className="m-2 disabled:opacity-50 bg-blue-800 rounded-md px-4 py-2 text-white hover:bg-blue-500">{currentProduct.id !== '' ? 'Save' : 'Add new'}</button>
                    <button onClick={()=>clear()} type="button" role="button" className="m-2 bg-slate-800 rounded-md px-4 py-2 text-white hover:bg-slate-500">Cancel</button>
                </div>
            </div>
        </>
    )
}