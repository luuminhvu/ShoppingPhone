import React, { useState } from "react";
import "./CreateProduct.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../store/productSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };
  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
    } else {
      setProductImage("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ name, price, desc, brand, image: productImage }));
  };

  return (
    <div className="create-product">
      <form onSubmit={handleSubmit} className="create-product__form">
        <h3>Thêm sản phẩm mới</h3>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Giá sản phẩm"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mô tả sản phẩm"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select required onChange={(e) => setBrand(e.target.value)}>
          <option value="" disabled selected>
            Chọn thương hiệu
          </option>
          <option value="apple">Apple</option>
          <option value="samsung">Samsung</option>
          <option value="xiaomi">Xiaomi</option>
          <option value="huawei">Huawei</option>
          <option value="oppo">Oppo</option>
          <option value="other">Other</option>
        </select>
        <input
          type="file"
          placeholder="Hình ảnh sản phẩm"
          accept="image/*"
          onChange={handleProductImageUpload}
        />
        <button type="submit">Thêm sản phẩm</button>
      </form>
      <div className="create-product__imgPrev">
        {productImage ? (
          <>
            <img src={productImage} alt="preview" />
          </>
        ) : (
          <p>Ảnh sản phẩm</p>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
