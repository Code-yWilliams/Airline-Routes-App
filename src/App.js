import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';
import DATA, { getAirlineById, getAirportByCode } from './data.js';
const { routes, airlines, airports } = DATA;

const App = () => {
  const [currentAirline, setCurrentAirline] = useState('All');
  const [currentAirport, setCurrentAirport] = useState('All');

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  
  const formatValue = (dataProperty, value) => {
    if (dataProperty === 'airline') {
      return getAirlineById(value);
    } else {
      return getAirportByCode(value);
    }
  }

  const filteredRoutes = () => {
    return routes.filter(route => {
      return (
        (currentAirline === 'All' || currentAirline === getAirlineById(route.airline)) &&
        (currentAirport === 'All' || currentAirport === getAirportByCode(route.src) || currentAirport === getAirportByCode(route.dest))
      )
    })
  }

  const selectAirline = (e) => {
    const airline = e.target.value;
    setCurrentAirline(airline);
  }

  const selectAirport = (e) => {
    const airport = e.target.value;
    setCurrentAirport(airport);
  }

  return  (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Select name="airlines" label="Show routes on:" options={airlines.map(a => a.name).concat('All')} onChange={selectAirline}></Select>
        <Select name="airports" label="flying to or from:" options={airports.map(a => a.name).concat('All')} onChange={selectAirport}></Select>
        <Table className="routes-table" columns={columns} rows={filteredRoutes()} format={formatValue}></Table>
      </section>
    </div>
  )
}

export default App;