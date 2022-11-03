import React from 'react'
import Chart from 'react-apexcharts';

export default function Doughnut(props) {
    console.log(props)
  return (
    <div>
        <div className='container-fluid mt-3 mb-3' style={{marginRight: '90px'}}>        
            <Chart 
            type="donut"
            width={254}
            height={250}
            series={props.series}
            options={{
              labels:props.label,
            legend: {show: false},
             title:{
               // align:"center",
             },
              plotOptions:{
                pie:{
                   donut:{
                        // size:'50px',
                       labels:{
                           show:true,
                           total:{
                               show:true,
                            //    showAlways:true,
                                //formatter: () => '343',
                               fontSize:20,
                               color: '#f90000',
                           }
                       },
                   }
                }
                },
                dataLabels:{
                   enabled:false,
                }
               }}
               />
               </div>
    </div>
  )
}
