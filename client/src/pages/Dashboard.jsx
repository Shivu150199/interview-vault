import React, { useEffect, useState } from 'react'

const Dashboard = () => {
const [data,setData]=useState([])

useEffect(()=>{
  const fetchData=async()=>{
    try{
const res = await fetch('http://localhost:3000/api/app/user')
const result=await res.json()
setData(result)

    }catch(error){
      console.log(error)
    }
  }
  fetchData()
},[])
// fetchData()
console.log(data)

  return (
    // <div className="overflow-x-auto bg-slate-90 0">
    //   <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
    //     {/* Table header */}
    //     <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //       <div className="grid grid-cols-5 gap-4 sm:grid-cols-5 mb-5">
    //         <div className="col-span-1">Sr Num</div>
    //         <div className="col-span-1">Item</div>
    //         <div className="col-span-1">Category</div>
    //         <div className="col-span-1">Time</div>
    //         <div className="col-span-1">Fare</div>
    //       </div>
    //     </div>
    //     {/* Table rows */}
    //     <div className="bg-white divide-y divide-gray-200">
    //       <div className="px-6 py-4 whitespace-nowrap">
    //         {/* Example row */}
    //         {data.map((items,index)=>{
    //           const {item,category,time ,fare}=items
    //           return (
    //             <div key={index} className="grid grid-cols-5 gap-4 sm:grid-cols-5 mb-5 content-between">
    //               <div className="col-span-1">{index+1}</div>
    //               <div className="col-span-1">{item}</div>
    //               <div className="col-span-1">{category}</div>
    //               <div className="col-span-1">{time}</div>
    //               <div className="col-span-1">{fare}</div>
    //             </div>
    //           )
    //         })}
            
    //         {/* Add more rows in a similar structure */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    SR NO
                </th>
                <th scope="col" class="px-6 py-3">
                    Item
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Time
                </th>
                <th scope="col" class="px-6 py-3">
                    Fare
                </th>
            </tr>
        </thead>
        <tbody>
            { 
              data.map((items,index)=>{
               const {item,category,time ,fare}=items  
            return (
              <tr
                key={index}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index+1}
                </th>
                <td class="px-6 py-4">{item}</td>
                <td class="px-6 py-4">{category}</td>
                <td class="px-6 py-4">{time}</td>
                <td class="px-6 py-4">{fare}</td>
              </tr>
            )
            
            })
            }
        
         
         
        </tbody>
    </table>
</div>
  )
}

export default Dashboard
