import './App.css';
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Infobox from './Components/Infobox';
import LineGraph from './Components/LineGraph';
import TableData from './Components/TableData';
function App() {
  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState('worldwide')
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([]);
  useEffect(() => {
     axios.get("https://disease.sh/v3/covid-19/countries")
     .then(res => {
       const dataArray = res.data 
       const cntrs = dataArray.map(data => {
             return (
               {
                 name : data.country,
                 value : data.countryInfo.iso2
               }
             )
       })
      //  const sorteddata = sortedData(res.data)
       setTableData(res.data)
       setCountries(cntrs)
     }) 
     .catch(err => console.log(err))
  },[country])
  const handleChange = async e => {
     const url = e.target.value === 'worldwide' ? 'https://disease.sh/v3/covid-19/all'
                                                : `https://disease.sh/v3/covid-19/countries/${e.target.value}`
     axios.get(url)
     .then(res => setCountryInfo(res.data))
     setCountry(e.target.value)
  }
  useEffect(() => {
     console.log('fectching all data')
     let url = `https://disease.sh/v3/covid-19/all`
     axios.get(url)
     .then(res => setCountryInfo(res.data))
     .catch(err => console.log(err))
     console.log(countryInfo)
  },[])
  return (
    <div className="App">
      <div>
        <div className="app_header">
          <div className="title">
             {/* <img className="logo" src="/virus.png" alt="virus" /> */}
             <h1>COVID19 TRACKER</h1>
          </div>
          <select className="select" value={country} onChange={handleChange}>
            <option value="worldwide">worldwide</option>
            {
              countries.map(country => {
                return (
                  <option value={country.value}>{country.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="app_info_overal">
          <Infobox cases={countryInfo.cases} 
                   recovered={countryInfo.recovered} 
                   deaths={countryInfo.deaths} 
                   title="overall"
          />
        </div>
        <div className="app_info_today">
          <Infobox  cases={countryInfo.todayCases} 
                   recovered={countryInfo.todayRecovered} 
                   deaths={countryInfo.todayDeaths} 
                   title="today"
          />  
        </div>
      </div>
      <div className="app_data">
        <TableData tableData={tableData} setTableData={setTableData} />
        <LineGraph />
      </div>
    </div>
  );
}

export default App;
