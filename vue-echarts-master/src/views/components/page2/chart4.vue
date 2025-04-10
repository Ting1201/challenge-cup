<template>
    <div class="doubleLine"></div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            myChart: null
        }
    },
    methods: {
        setChart() {
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    left: "11%",
                    top: "10%",
                    itemWidth: 7,
                    itemHeight: 7,
                    textStyle: {
                        color: '#5CB1C1',
                        fontSize: 10
                    }
                },
                grid: {
                    top: '12%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    containLabel: false
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        symbol: ['none', 'arrow'],
                        symbolSize: [6, 6],
                        symbolOffset: [0, 10],
                        lineStyle: {
                            color: '#122C49'
                        }
                    },
                    axisTick: {show: false},
                    axisLabel: {
                        color: '#61B9C8',
                        fontSize: 9
                    },
                    data: ["2023-10-19","2023-10-20",  "2023-10-21", "2023-10-22","2023-10-23","2023-10-24","2023-10-25"]
                },
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        max: 15,
                        min: -3,
                        interval: 3,
                        axisLine: {
                            symbol: ['none', 'arrow'],
                            symbolSize: [6, 6],
                            lineStyle: {
                                color: '#122C49'
                            }
                        },
                        axisLabel: {
                            color: '#61B9C8',
                            showMaxLabel: false,
                            fontSize: 9
                        },
                        name: '(℃)',
                        nameGap: -10,
                        nameTextStyle: {
                            color: '#61B9C8',
                            fontSize: 9,
                            align: 'right',
                            padding: [0, 6, 0, 0]
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    {
                        type: 'value',
                        scale: true,
                        max: 15,
                        min: -3,
                        axisLine: {
                            symbol: ['none', 'arrow'],
                            symbolSize: [6, 6],
                            lineStyle: {
                                color: '#122C49'
                            }
                        },
                        axisLabel: {
                            color: '#61B9C8',
                            showMaxLabel: false,
                            fontSize: 9
                        }
                        // ,
                        // name: '(个)',
                        // nameGap: -10,
                        // nameTextStyle: {
                        //     color: '#61B9C8',
                        //     fontSize: 9,
                        //     align: 'left',
                        //     padding: [0, 0, 0, 6]
                        // }
                        ,
                        interval: 3,
                        splitLine: {
                            show: false,
                        },
                    }
                ],
                series: [
                    {
                        name: '水质检测',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: {
                            color: '#F39800',
                        },
                        itemStyle: {
                            color: '#F39800'
                        },
                        data: [10,11.14,13,11.14,12,12.1,9]
                    },
                    {
                        name: '排污监测',
                        yAxisIndex: 1,
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: {
                            color: '#BF232A',

                        },
                        itemStyle: {
                            color: '#BF232A'
                        },
                        data: [1.57,-2,1.57,4.9,3,1.6,0]
                    },
                ]
            };
            if (!this.myChart) this.myChart = this.$echarts(this.$el);

            this.myChart.clear();
            this.myChart.resize()
            this.myChart.setOption(option);
        }
    },
    mounted() {
        this.setChart()
    },
}
</script>

<style lang="less" scoped>
.doubleLine {
    height: 100%;
    width: 100%;
}
</style>
