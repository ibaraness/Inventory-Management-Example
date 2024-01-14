import { useContext, useEffect, useState } from "react";
import { AppContext, AppDispachContext } from "../context/AppContext";
import Row from "./Row";
import RowItem from "./RowItem";
import CatagorySelect from "./CatagorySelect";
import ProductForm, { productTemplate } from "./ProductForm";
import { addNewProduct, deleteProduct, fetchProducts, updateProduct } from "../services/rest-api";

export default function Dashboard() {
    const { products, categories } = useContext(AppContext);
    const setAppState = useContext(AppDispachContext);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeProduct, setActiveProduct] = useState(productTemplate  );

    useEffect(() => {
        setDisplayProducts(getCategoryProducts());
    }, [categoryId, products])

    function getCategoryProducts() {
        return categoryId > 0 ? products.filter(item => +item.category_id === +categoryId) : products;
    }

    function onSearch(term) {
        setSearchTerm(term);
        const newProducts = !term ? getCategoryProducts() : products.filter(product => product.title.toLowerCase().search(term.toLowerCase()) === 0);
        setDisplayProducts(newProducts);
    }

    function onCategoryChange(categoryId) {
        setCategoryId(categoryId);
    }

    function onEditProduct(product){
        setActiveProduct(product);
    }

    async function onDeleteProduct(product){
        const confirmed =  confirm(`Are you sure you want to delete: ${product.title}`);
        if(!confirmed){
            return;
        }
        const res = await deleteProduct(product.id);
        if(res.error){
            alert(res.error);
            return;
        }
        const products = await fetchProducts();
        setAppState({products, categories});
    }

    async function onSaveProduct(product){
        // Create or update existing product
        const method = isNaN(parseInt(product.id)) ? addNewProduct : updateProduct;
        const res = await method(product);
        if(res.error){
            alert(res.error);
            return;
        }
        const products = await fetchProducts();
        setAppState({products, categories});
    }

    const rows = displayProducts.map(product => (
        <Row key={product.id} product={product} onEdit={(e) => onEditProduct(e)} onDelete={(e) => {onDeleteProduct(e)}} />
    ));

    const categoryOptions = categories.map(({ id, title }) => (
        <option key={id} value={id}>{title}</option>
    ));

    return (
        <>
            <div className="  p-4 border border-slate-500">
                {/* Bar */}
                <div className="flex flex-row border border-slate-500 m-2 p-4">
                    <input placeholder="Search..." className="border border-slate-300 outline-none py-1 shadow-sm ring-1 ring-inset ring-gray-300 pl-3 rounded-md text-slate-500" value={searchTerm} onChange={(event) => onSearch(event.target.value)} />
                    <label className="ml-4">Filter by category</label>
                    <CatagorySelect categoryId={categoryId} change={value => onCategoryChange(value)}></CatagorySelect>
                </div>
                <hr />
                {/* List */}
                <div className="flex flex-row px-4 shrink-0 py-2">
                    <RowItem isHead={true}>Id</RowItem>
                    <RowItem isHead={true}>Title</RowItem>
                    <RowItem isHead={true}>Catagory</RowItem>
                    <RowItem isHead={true}>Price</RowItem>
                    <RowItem isHead={true}>Quantity</RowItem>
                    <RowItem isHead={true}>Edit</RowItem>
                    <RowItem isHead={true}>Delete</RowItem>
                </div>
                <div className="border border-slate-500 h-52 overflow-auto">
                    {rows}
                </div>

            </div>
            {/* Form */}   
            <ProductForm product={activeProduct} onSave={e => onSaveProduct(e)} onClear={e => setActiveProduct(productTemplate)}></ProductForm>
            
        </>

    )
}