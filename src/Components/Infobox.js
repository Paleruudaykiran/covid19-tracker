import React from 'react'
import axios from 'axios'
const Infobox = ({cases,recovered,deaths,title}) => {
    return (
      <div className="infobox_content">
         <h2 className="infobox_title">{title}</h2>
        <div className="cards">
           <div className="card">
              <h2>Corona cases</h2>
              <p>{cases}</p>
           </div>
           <div className="card">
              <h2>Recovered</h2>
              <p>{recovered}</p>
           </div>
           <div className="card">
              <h2>Deaths</h2>
              <p>{deaths}</p>
           </div>
        </div>
      </div>
    )
}

export default Infobox
