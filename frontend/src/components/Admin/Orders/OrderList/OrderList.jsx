import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import moment from "moment";
import { editOrder, orderFetch } from "../../../../store/orderSlice";
import { useNavigate } from "react-router-dom";
export default function OrderList() {
  const { list } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(orderFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows =
    list &&
    list.map((item) => {
      return {
        id: item._id,
        oname: item.shipping.name,
        amount: item.total,
        dStatus: item.delivery_status,
        date: moment(item.createdAt).fromNow(),
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },

    { field: "oname", headerName: "Name", width: 120 },
    {
      field: "dStatus",
      headerName: "Status",
      width: 80,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <SCActions>
            <Dispatch onClick={() => handleOrderDispatch(params.row.id)}>
              Dispatch
            </Dispatch>
            <Delete onClick={() => handleOrderDelivery(params.row.id)}>
              Delivered
            </Delete>
            <View
              onClick={() => {
                navigate(`/orders/${params.row.id}`);
              }}
            >
              View
            </View>
          </SCActions>
        );
      },
    },
  ];
  const handleOrderDispatch = (id) => {
    dispatch(
      editOrder({
        id,
        delivery_status: "dispatched",
      })
    );
  };
  const handleOrderDelivery = (id) => {
    dispatch(
      editOrder({
        id,
        delivery_status: "delivered",
      })
    );
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
const Delete = styled.button`
  padding: 5px 10px;
  background-color: #137909;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const Dispatch = styled.button`
  padding: 5px 10px;
  background-color: #db1126;
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
