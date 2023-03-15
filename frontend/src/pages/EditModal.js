import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import Header from '../components/header'
import { API_URL } from '../constants';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography
} from "@material-tailwind/react";



export default function EditModel() {
  const { id } = useParams();
  const [activeModel, setActiveModel] = useState(null)
  const [scaleValue, setScaleValue] = useState(0);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (id && id !== undefined) {
      fetch(`${API_URL}/api/models/${id}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((dataObject) => {
          const data = dataObject.data;
          setActiveModel(data)
        }
        )
        .catch((err) => console.error(err));
    }
  }, [])



  const handChangeScale = (e) => {
    setScaleValue(e.target.value)
  }

  const handleChangeActive = (e) => {
    if (e.target.checked) {
      setActive(1)
    } else {
      setActive(0);
    }
  }

  const handleUpdateClick = () => {
    const bodyData = {
      scale: scaleValue,
      state: active ? 1 : 0
    }
    fetch(`${API_URL}/api/models/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(bodyData)
    })
      .then((res) => res.json())
      .then((dataObject) => {
        console.log('dataObject:',dataObject)
      }
      )
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Header />
      <Card className="w-50 p-4">
        <CardHeader color="blue" className="relative h-56">
            <Typography className = "text-center mt-4">Edit Model</Typography>
        </CardHeader>
        <CardBody className="text-center">
          <Input label="Scale" success onChange={(e) => handChangeScale(e)} value={scaleValue} />
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Checkbox label="Active" onChange={(e) => handleChangeActive(e)} checked={active} />
          <Button onClick={() => handleUpdateClick()}>Update</Button>
        </CardFooter>
      </Card>
    </>
  )
}
