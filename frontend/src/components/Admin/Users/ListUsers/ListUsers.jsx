import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser, userFetch } from "../../../../store/userSlice";

export default function ListUsers() {
  const { list } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(userFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const rows =
    list &&
    list.map((item) => {
      return {
        id: item._id,
        uname: item.name,
        uemail: item.email,
        urole: item.isAdmin,
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "uname",
      headerName: "Name",
      width: 110,
    },
    { field: "uemail", headerName: "Email", width: 160 },
    {
      field: "urole",
      headerName: "Role",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.urole ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
          </div>
        );
      },
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
            <View
              onClick={() => {
                navigate(`/users/${params.row.id}`);
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
    dispatch(deleteUser(id));
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
const Admin = styled.span`
  color: #f44336;
`;
const Customer = styled.span`
  color: #1fdb11;
`;
