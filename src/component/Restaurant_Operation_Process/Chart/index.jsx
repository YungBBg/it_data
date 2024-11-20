import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import {
    Grid,
    Stack,
    Typography,
    Button,
    MenuItem,
    Select,
} from '@mui/material';

export default function Chart() {
    const maxDate = new Date().toISOString().split('T')[0]
    const chartRef = useRef(null);
    const [chartType, setChartType] = useState("bar");
    const handleChartType = (event) => {
        setChartType(event.target.value)
    }

    useEffect(() => {
        const barOpt = {
            chart: {
                width:1000,
                height:500,
                type: 'bar'
            },
            title: {
                text: 'Performance($)',
                align: 'left'
            },
            series: [{
                data: [
                    {
                        x: 'Chinese Restaurant',
                        y: 2587496
                    },
                    {
                        x: 'Korean Restaurant',
                        y: 6985214
                    },
                    {
                        x: 'Western Restaurant',
                        y: 4587491
                    },
                    {
                        x: 'Japan Restaurant',
                        y: 2596378
                    }
                ]
            }]
        };

        var pieOpt = {
            series: [2587496, 6985214, 4587491, 2596378],
            chart: {
                width: 1000,
                height:500,
                type: 'pie',
            },
            title: {
                text: 'Performance($)',
                align: 'left'
            },
            labels: ['Chinese Restaurant', 'Korean Restaurant', 'Western Restaurant', 'Japan Restaurant'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        var lineOpt = {
            series: [
                {
                    name: "Chinese Restaurant",
                    data: [153663, 87513, 93165, 234750, 37624, 221692, 23045, 95384, 25853, 102021, 195701, 161865]
                },
                {
                    name: "Korean Restaurant",
                    data: [1768553, 1234567, 987654, 234567, 345678, 876543, 456789, 567890, 678901, 789012, 890123, 901234]
                },
                {
                    name: "Western Restaurant",
                    data: [581273, 503955, 410365, 904312, 850472, 421225, 267824, 292400, 71972, 126845, 278796, 371752]
                },
                {
                    name: "Japan Restaurant",
                    data: [213842, 297896, 158372, 268431, 147901, 309487, 154209, 289750, 256378, 286421, 233596, 317025]
                }
            ],
            chart: {
                width: 1000,
                height:500,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#DA4F2C', '#77B6EA', "#86c036", '#9400FF'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Performance($)',
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                title: {
                    text: 'Month'
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        };


        var option = chartType == "bar" ? barOpt : chartType == "pie" ? pieOpt:lineOpt

        const chart = new ApexCharts(chartRef.current, option);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [chartType]);



    return (
        <>
            <Grid container direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item sx={{ xs: 12 }}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography variant='h4'>Chart</Typography>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant='h5'>From</Typography>
                                <input type="date" id="from" name="from" min="2023-01-01" style={{ height: 30.75, padding: 5, width:122.33 }} />
                                <Typography variant='h5'>To</Typography>
                                <input type="date" id="to" name="to" max={maxDate} style={{ height: 30.75, padding: 5, width:122.33 }} />
                                <Button variant='contained' size='small'>{"Search"}</Button>
                            </Stack>
                            <Select
                                size='small'
                                value={chartType}
                                onChange={handleChartType}
                            >
                                <MenuItem value={"bar"}>Bar Chart</MenuItem>
                                <MenuItem value={"pie"}>Pie Chart</MenuItem>
                                <MenuItem value={"line"}>Line Chart</MenuItem>
                            </Select>
                        </Stack>

                        <Stack >
                            <div ref={chartRef} />
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>

        </>
    );
}