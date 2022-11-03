import React from 'react'
import Doughnut from './Doughnut'

export default function DoughnutChart(props) {
    var label=['android','ios','linux']
    var series=[103,81,18]
    // var label=props.label
    // var series=props.series
  return (
    <div>
        <div className="card" style={{width: '20rem' }}>
    <div className="card-body">
      <div className="active_blocked_piechart" >
        <div className="apexchart">
        <Doughnut label={label} series={series}/></div>
      <p className="stats" style={{borderBottom:'groove'}}>Active:{series[0]} Blocked:{series[1]}</p>
      <p className="total_user_pt">Total Users:202</p>
      </div>
      </div>
  </div>
    </div>
  )
}
