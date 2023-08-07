import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editProduct } from "../../../../store/productSlice";
export default function EditProduct({ prodId }) {
  const { items, editStatus } = useSelector((state) => state.products);
  const [open, setOpen] = React.useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [previewProductImage, setPreviewProductImage] = useState("");
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const handleClickOpen = () => {
    let productItem = items.find((item) => item._id === prodId);
    setCurrentProduct(productItem);
    setPreviewProductImage(productItem.image.url);
    setProductImage("");
    setName(productItem.name);
    setPrice(productItem.price);
    setDescription(productItem.desc);
    setBrand(productItem.brand);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        setPreviewProductImage(reader.result);
      };
    } else {
      setProductImage("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editProduct({
        productImage,
        product: {
          ...currentProduct,
          name,
          price,
          desc,
          brand,
        },
      })
    );
  };

  return (
    <div>
      <ButtonI variant="outlined" onClick={handleClickOpen}>
        Edit
      </ButtonI>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
        <DialogContent>
          <div className="create-product">
            <form onSubmit={handleSubmit} className="create-product__form">
              <h3>Thêm sản phẩm mới</h3>
              <input
                type="text"
                placeholder="Tên sản phẩm"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="text"
                placeholder="Giá sản phẩm"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <input
                type="text"
                placeholder="Mô tả sản phẩm"
                onChange={(e) => setDescription(e.target.value)}
                value={desc}
              />
              <select
                required
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              >
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
              <button type="submit">
                {editStatus === "pending" ? "Loading..." : "Chỉnh sửa"}
              </button>
            </form>
            <div className="create-product__imgPrev">
              {previewProductImage ? (
                <>
                  <img src={previewProductImage} alt="preview" />
                </>
              ) : (
                <p>Ảnh sản phẩm</p>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const ButtonI = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: #137909;
  color: #fff;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ff5722;
  }
`;
