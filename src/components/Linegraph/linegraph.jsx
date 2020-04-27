import React, { useContext, useEffect,useState } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { Line } from "react-chartjs-2";
import './linegraph.styles.scss';

export default function Chart() {
const appContext = useContext(WeatherContext);
const { results, details, isActive, chartData_cel, chartData_fah, celciusToFahrenheit,  ConvertUTCTimeToLocalTime } = appContext;
const [chartData, setChartData] = useState({});

const graph = () =>{
    const timefetch = [];
    timefetch.push(ConvertUTCTimeToLocalTime(details.hourly[1].dt,results.timezone));
    timefetch.push(ConvertUTCTimeToLocalTime(details.hourly[4].dt,results.timezone));
    timefetch.push(ConvertUTCTimeToLocalTime(details.hourly[7].dt,results.timezone));
    timefetch.push(ConvertUTCTimeToLocalTime(details.hourly[10].dt,results.timezone));
    timefetch.push(ConvertUTCTimeToLocalTime(details.hourly[13].dt,results.timezone));
    timefetch.push(ConvertUTCTimeToLocalTime(details.hourly[16].dt,results.timezone));
    timefetch.push(ConvertUTCTimeToLocalTime(details.hourly[19].dt,results.timezone));
    timefetch.push(ConvertUTCTimeToLocalTime(details.hourly[22].dt,results.timezone));
    
    const temp_fah = [];
    temp_fah.push(celciusToFahrenheit(Math.floor(details.hourly[1].temp)));
    temp_fah.push(celciusToFahrenheit(Math.floor(details.hourly[4].temp)));
    temp_fah.push(celciusToFahrenheit(Math.floor(details.hourly[7].temp)));
    temp_fah.push(celciusToFahrenheit(Math.floor(details.hourly[10].temp)));
    temp_fah.push(celciusToFahrenheit(Math.floor(details.hourly[13].temp)));
    temp_fah.push(celciusToFahrenheit(Math.floor(details.hourly[16].temp)));
    temp_fah.push(celciusToFahrenheit(Math.floor(details.hourly[19].temp)));
    temp_fah.push(celciusToFahrenheit(Math.floor(details.hourly[22].temp)));

      setChartData ({ 
        labels:timefetch,
        datasets: [
            {
            label: 'tempareture(℉)',
            backgroundColor: 'rgb(255, 248, 248,0.4)',
            borderColor: 'rgb(255, 248, 248,1)',
            pointBorderColor: 'rgb(245, 239, 239)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 4,
            pointHoverBackgroundColor: 'black',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: temp_fah,
            }
        ],
    });
}
useEffect(() => {
    graph();
    }, []);
    
    return (
    <div className='graph'>
            {!isActive?(
            <Line 
            data={chartData_cel} 
                options={{
                maintainAspectRatio:false,
                responsive:true,
                legend:{
                    display: false,    
                },
                scales:{
                    yAxes:[
                        {
                            ticks:{
                                autoSkip:true,
                                maxTicksLimit:4,
                                fontColor: "white",
                            },
                            gridLines:{
                                display:false
                            }
                        }
                    ],
                    xAxes:[
                        {
                            ticks:{
                                fontColor: "white"
                            },
                            gridLines:{
                                display:false,
                            }
                        }
                    ], 
                }
            }}
        />
        ):(
        <Line 
            data={chartData_fah} 
                options={{
                maintainAspectRatio:false,
                responsive:true,
                legend:{
                    display: false,    
                },
                scales:{
                    yAxes:[
                        {
                            ticks:{
                                autoSkip:true,
                                maxTicksLimit:4,
                                fontColor: "white",
                            },
                            gridLines:{
                                display:false
                            }
                        }
                    ],
                    xAxes:[
                        {
                            ticks:{
                                fontColor: "white"
                            },
                            gridLines:{
                                display:false,
                            }
                        }
                    ], 
                }
            }}
        />
        )}
        </div>
    );
};