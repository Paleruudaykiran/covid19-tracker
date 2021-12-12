import React from 'react'

const TableData = ({tableData,setTableData}) => {
    function sortData(value) { 
        let data = [...tableData]
        if(value=="lh") 
          data.sort((a,b) =>{
              return a.cases - b.cases
          })
        if(value=="hl")
          data.sort((a,b) => b.cases - a.cases) 
        if(value=="c") 
          data.sort((a,b) => {
              if(a.country >= b.country) 
                return 1
              else
                return -1
          })
        console.log(tableData)
        setTableData(data)
    }
    return (
        <div className="table_content">
         <nav className="nav_bar">
             <ul>
                 <li onClick={() => sortData("lh")}>low-high</li>
                 <li onClick={() => sortData("hl")}>high-low</li>
                 <li onClick={() => sortData("c")}>countries</li>
             </ul>
         </nav>
         <div className="table">
            <tr>
                <th>country</th>
                <th>cases</th>
            </tr>
            {
                tableData.map(row => {
                    console.log("row",row)
                    return (
                        <tr>
                            <td>{row.country}</td>
                            <td>{row.cases}</td>
                        </tr>
                    )
                })
            }
         </div>
         </div>
    )
}

export default TableData
