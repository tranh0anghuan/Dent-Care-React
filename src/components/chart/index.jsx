import React, { useEffect, useMemo, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import api from '../../config/axios'
import { getMonth, parse } from "date-fns"
function AdminChart() {
  const [data, setData] = useState([])
  const array = new Array(12).fill(0);
  const fetchData = async () => {
    try {
      const response = await api.get("/appointment-patient");
      console.log(response.data);
      const quantity = response.data;
      console.log(quantity)

      quantity.forEach(item => {
        const month = parse(item.date, 'yyyy-MM-dd', new Date());
        const monthIndex = getMonth(month); // Lấy tháng (giá trị từ 0 đến 11)

        // Tăng giá trị tương ứng trong mảng array lên 1
        array[monthIndex]++;
      });
      setData([
        {
          "month": "Jan",
          "quantity": array[0],
        },
        {
          "month": "Feb",
          "quantity": array[1],
        },
        {
          "month": "Mar",
          "quantity": array[2],
        },
        {
          "month": "Apr",
          "quantity": array[3],
        },
        {
          "month": "May",
          "quantity": array[4],
        },
        {
          "month": "Jun",
          "quantity": array[5],
        },
        {
          "month": "Jul",
          "quantity": array[6],
        },
        {
          "month": "Aug",
          "quantity": array[7],

        },
        {
          "month": "Sep",
          "quantity": array[8],
        },
        {
          "month": "Oct",
          "quantity": array[9],
        },
        {
          "month": "Nov",
          "quantity": array[10],

        },
        {
          "month": "Dec",
          "quantity": array[11],
        }
      ])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { fetchData() }, []);


  return <div style={{ width: "auto", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <LineChart width={1500} height={700} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis label={{
        value: 'Quantity',
        angle: -90,
        position: 'insideLeft',
        style: { fontSize: '20px', fontWeight: 'bold' }
      }} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="quantity" stroke="#1677ff" strokeWidth={3} />
    </LineChart>
  </div>
}

export default AdminChart