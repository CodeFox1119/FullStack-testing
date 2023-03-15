import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Header from '../components/header'

import { API_URL } from '../constants';

export default function Admin() {

  const navigate = useNavigate();
  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Scale",
      selector: row => row.scale,
      sortable: true,
      right: true,
    },
    {
      key: "action",
      name: "Action",
      className: "action",
      sortable: false,
      cell: (record) => {
        return (
          <>
            <Button
              variant="filled"
              className="btn btn-primary btn-sm"
              onClick={() => {
                onHandleEditItem(record);
              }}
            >
              Edit
            </Button>
            <Button
              variant="filled"
              className="btn btn-primary btn-sm ml-4"
              onClick={() => {
                onHandleDeleteItem(record);
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  const [data, setData] = React.useState([]);

  useEffect(() => {
    if (data.length === 0) {
      fetch(`${API_URL}/api/models`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((dataObject) => {
          const data = dataObject.data;
          setData(data)
        }
        )
        .catch((err) => console.error(err));
    }
  }, [])

  const onHandleEditItem = (record) => {
    navigate(`/edit/${record.id}`);
  }
  const onHandleDeleteItem = (record) => {
    fetch(`${API_URL}/api/models/${record?.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((dataObject) => {
        const deletedItemIndex = data.findIndex(item => item.id === record.id)
        if (deletedItemIndex > -1) {
          const tempData = data.splice(deletedItemIndex, 1);
          setData(tempData)
        }
      }
      )
      .catch((err) => console.error(err));
  }
  return (
    <>
      <Header />
      <Button onClick={() => navigate('/add')}>Add New Model</Button>
      <DataTable
        columns={columns}
        data={data}
        pagination
      />
    </>
  )
}
