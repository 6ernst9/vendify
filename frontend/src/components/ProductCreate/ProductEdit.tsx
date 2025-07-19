import React, {useEffect, useState} from "react";
import './ProductCreate.css';
import {useNavigate} from "react-router-dom";
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
import {adminProductSelect} from "../../widgets/admin-product-page-widget/model/selectors";
import {deleteProduct, updateProduct} from "../../widgets/admin-product-edit-widget/model/effects";

const ProductEdit: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const id = useSelector(adminSessionSelect.id);
    const dispatch = useDispatch();
    const stores = useSelector(storesSelect.stores);

    const name = useSelector(adminProductSelect.name);
    const productId = useSelector(adminProductSelect.id);
    const price = useSelector(adminProductSelect.price);
    const images = useSelector(adminProductSelect.images);
    const description = useSelector(adminProductSelect.description);
    const category = useSelector(adminProductSelect.category);
    const reviews = useSelector(adminProductSelect.reviews);
    const noReviews = useSelector(adminProductSelect.noReviews);
    const selectedStore = useSelector(adminProductSelect.store);
    const stock = useSelector(adminProductSelect.stock);

    const [productName, setProductName] = useState(name);
    const [productStore, setProductStore] = useState(selectedStore);
    const [productCategory, setProductCategory] = useState(category);
    const [productDescription, setProductDescription] = useState(description);
    const [productImages, setProductImages] = useState<string[]>(images);
    const [productPrice, setProductPrice] = useState(price);
    const [productStock, setProductStock] = useState(stock);

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
    const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setProductPrice(Number(e.target.value));
    const handleProductStockChange = (e: React.ChangeEvent<HTMLInputElement>) => setProductStock(Number(e.target.value));

    const handleSubmit = async () => {
        await updateProduct(productId, productName, productStore, productImages, productDescription, productCategory, Number(productPrice), Number(productStock), accessToken);
        navigate('/admin/products');
    };

    const handleDeleteProduct = async () => {
        await deleteProduct(productId, accessToken);
        navigate('/admin/products');
    }

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [accessToken, id]);

    return (
        <div className="product-create-container">
            <div className="product-create-header">
                <h1>Product:edit</h1>
                <div className="product-create-header-buttons">
                    <div className="product-create-configuration-delete-button"
                         onClick={handleDeleteProduct}>
                        Delete
                    </div>
                    <div className="product-create-header-button" onClick={() => navigate(`/admin/products/${productId}`)}>
                        Back
                    </div>
                </div>
            </div>
            <div className="product-create-info-container">
                <div className="product-create-info">
                    <h1>Product Info</h1>
                </div>
                <div className="product-create-selector">
                    <h1>ID</h1>
                    <input
                        type="text"
                        value={productId}/>
                </div>
                <div className="product-create-selector">
                    <h1>Name</h1>
                    <input
                        type="text"
                        value={productName}
                        onChange={handleProductNameChange}/>
                </div>
                <div className="product-create-selector">
                    <h1>Product Store</h1>
                    <select className="product-create-select" onChange={handleProductStoreChange}>
                        {stores.map((store) => <option selected={store.id === selectedStore}
                                                       value={store.id}>{store.name}</option>)}
                    </select>
                </div>
                <div className="product-create-selector">
                    <h1>Product Category</h1>
                    <input
                        type="text"
                        value={productCategory}
                        onChange={handleProductCategoryChange}/>
                </div>
                <div className="product-create-selector">
                    <h1>Product Description</h1>
                    <input
                        type="text"
                        value={productDescription}
                        onChange={handleProductDescriptionChange}/>
                </div>
            </div>
            <div className="product-create-info-container">
                <div className="product-create-info">
                    <h1>Product Details</h1>
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
                    <input
                        type="text"
                        value={productPrice}
                        onChange={handleProductPriceChange}/>
                </div>
                <div className="product-create-selector">
                    <h1>Stock</h1>
                    <input
                        type="text"
                        value={productStock}
                        onChange={handleProductStockChange}/>
                </div>
                <div className="product-create-selector">
                    <h1>Reviews</h1>
                    <input
                        type="text"
                        value={reviews + ' stars with ' + noReviews + ' reviews.'}/>
                </div>
            </div>
            <div className="product-create-info">
                <div className="product-create-final-button" onClick={handleSubmit}>
                    Edit
                </div>
            </div>
        </div>
    )
}

export default ProductEdit;