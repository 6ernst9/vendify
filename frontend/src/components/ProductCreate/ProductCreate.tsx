import React, {useEffect, useState} from "react";
import './ProductCreate.css';
import {useNavigate} from "react-router-dom";
import {createProduct} from "../../widgets/admin-product-create-widget/model/effects";
import {useDispatch, useSelector} from "react-redux";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes
} from "firebase/storage";
import {storage} from "../../util/firebase";
import {getStores} from "../../widgets/admin-store-widget/model/effects";
import {storesSelect} from "../../redux/core/stores/selectors";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";

const ProductCreate: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const id = useSelector(adminSessionSelect.id);
    const dispatch = useDispatch();
    const stores = useSelector(storesSelect.stores);

    const [productName, setProductName] = useState('');
    const [productStore, setProductStore] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImages, setProductImages] = useState<string[]>([]);
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');

    const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const uploadedUrls: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uuid = crypto.randomUUID();
            const imageRef = storageRef(storage, `products/${uuid}`);

            const snapshot = await uploadBytes(imageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            uploadedUrls.push(url);
        }

        setProductImages(prev => [...prev, ...uploadedUrls]);
    };


    const handleProductStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => setProductStore(e.target.value);
    const handleProductCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => setProductCategory(e.target.value);
    const handleProductDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setProductDescription(e.target.value);
    const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setProductPrice(e.target.value);
    const handleProductStockChange = (e: React.ChangeEvent<HTMLInputElement>) => setProductStock(e.target.value);

    const handleSubmit = async () => {
        await createProduct(productName, productStore, productImages, productDescription, productCategory, parseFloat(productPrice), parseInt(productStock, 10), accessToken);
    };

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [accessToken, id]);

    return (
        <div className="product-create-container">
            <div className="product-create-header">
                <h1>Product:create</h1>
                <div className="product-create-header-button" onClick={() => navigate('/admin/products')}>
                    Back
                </div>
            </div>
            <div className="product-create-info-container">
                <div className="product-create-info">
                    <h1>Product Info</h1>
                    <p>Define the basic details of your product, including its name, store belonging, category and description.
                        These details will help customers find and understand your product.</p>
                </div>
                <div className="product-create-selector">
                    <h1>Product Name</h1>
                    <input type="text" onChange={handleProductNameChange}/>
                </div>
                <div className="product-create-selector">
                    <h1>Product Store</h1>
                    <select className="product-create-select" onChange={handleProductStoreChange}>
                        {stores.map((store) => <option value={store.id}>{store.name}</option>)}
                    </select>
                </div>
                <div className="product-create-selector">
                    <h1>Product Category</h1>
                    <input type="text" onChange={handleProductCategoryChange}/>
                </div>
                <div className="product-create-selector">
                    <h1>Product Description</h1>
                    <input type="text" onChange={handleProductDescriptionChange}/>
                </div>
            </div>
            <div className="product-create-info-container">
                <div className="product-create-info">
                    <h1>Product Details</h1>
                    <p>Upload product images and provide additional details like available sizes, price, and stock quantity.
                        These specifications help customers make informed purchase decisions.</p>
                </div>
                <div className="product-create-selector">
                    <h1>Images</h1>
                    <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleImageUpload}
                        style={{display: 'none'}}/>
                    <label htmlFor="file-upload" className="product-create-upload-button">
                        Upload
                    </label>
                    {productImages.length > 0 && (
                        <ul className="product-create-image-list">
                            {productImages.map((url, index) => {
                                const filename = decodeURIComponent(url.split('/').pop()?.split('?')[0] || `image-${index}`);
                                return <li key={index}>{filename}</li>;
                            })}
                        </ul>
                    )}
                </div>
                <div className="product-create-selector">
                    <h1>Price</h1>
                    <input type="text" onChange={handleProductPriceChange}/>
                </div>
                <div className="product-create-selector">
                    <h1>Stock</h1>
                    <input type="text" onChange={handleProductStockChange}/>
                </div>
            </div>
            <div className="product-create-info">
                <div className="product-create-final-button" onClick={handleSubmit}>
                    Create
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;