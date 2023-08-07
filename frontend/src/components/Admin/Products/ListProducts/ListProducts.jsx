import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../store/productSlice";
import EditProduct from "../EditProducts/EditProducts";

export default function ListProducts() {
  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image.url,
        pname: item.name,
        pdesc: item.desc,
        price: item.price.toLocaleString(),
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 110,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pname", headerName: "Name", width: 160 },
    {
      field: "pdesc",
      headerName: "Description",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <SCActions>
            <Delete
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              Delete
            </Delete>
            <EditProduct prodId={params.row.id} />
            <View
              onClick={() => {
                navigate(`/product/${params.row.id}`);
              }}
            >
              View
            </View>
          </SCActions>
        );
      },
    },
  ];
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <div style={{ marginTop: 20, height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
const SCActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    outline: none;
  }
`;
const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;
const Delete = styled.button`
  padding: 5px 10px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const View = styled.button`
  padding: 5px 10px;
  background-color: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
