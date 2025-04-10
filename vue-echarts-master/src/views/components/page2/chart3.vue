<template>
    <div class="singleAreaChart"></div>
</template>

<script>
export default {
    name: '',
    props: {
        selectRangeDate: Array
    },
    data() {
        return {
            myChart:null
        }
    },
    methods: {
        setData(type) {
            let arr = [];
            switch (type) {
                case 'x':
                    for (let i = 0; i < this.selectRangeDate.length; i++) {
                        arr.push(this.selectRangeDate[i][1] + "." + this.selectRangeDate[i][2])
                    }
                    break;
                case 's' :
                    for (let i = 0; i < this.selectRangeDate.length; i++) {
                        arr.push((Math.random() * 250).toFixed(0))
                    }
                    break;

                default:
                    break;
            }

            return arr;
        },
        setChart() {
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    backgroundColor: '#11367a',
                    textStyle: {
                        color: '#6dd0e3',
                        fontSize: 10,
                    },
                },
                grid: {
                    top: '12%',
                    bottom: '12%',
                    left: '10%',
                    right: '5%',
                },
                legend: {
                    right: '3.5%',
                    top: '2%',
                    itemWidth: 7,
                    itemHeight: 7,
                    textStyle: {
                        color: '#5CB1C1',
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        color: '#61B9C8',
                        fontSize: 10,
                    },
                    axisLine: {
                        symbol: ['none', 'arrow'],
                        symbolSize: [6, 6],
                        symbolOffset: [0, 5],
                        lineStyle: {
                            color: '#122C49'
                        }
                    },
                    axisTick: {
                        color: '#122C49',
                        inside: true
                    },
                    z: 2,
                    data: [2020,2021,2022,2023,2024,2025]
                },
                yAxis:
                    {
                        type: 'value',
                        interval: 200,
                        min: 500,
                        max: 2000,
                        splitNumber: 7,
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
                            fontSize: 10
                        },
                        splitLine: {
                            show: false,
                        }
                        // ,
                        // name: '（亿元）',
                        // nameGap: -10,
                        // nameTextStyle: {
                        //     color: '#61B9C8',
                        //     fontSize: 9,
                        //     align: 'right',
                        //     padding: [0, 6, 0, 0]
                        // },
                    },

                series: [{
                    name: '销售额',
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    data: [670.04,857.24,1065,1571.23,1737,2007],
                    lineStyle: {
                        width: 1,
                        color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#B21356' // 0% 处的颜色
                            },
                                {
                                    offset: 0.5, color: '#B21356' // 40% 处的颜色
                                }, {
                                    offset: 1, color: '#F59111' // 100% 处的颜色
                                }],
                            global: false // 缺省为 false
                        } //背景渐变色
                    },
                    itemStyle: {
                        color: 'rgb(212,37,43)'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#A41B68' // 0% 处的颜色
                            },
                                {
                                    offset: 0.5, color: 'rgba(112,20,82,1)' // 40% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(112,20,82,0)' // 100% 处的颜色
                                }],
                            global: false // 缺省为 false
                        }, //背景渐变色
                        origin: 'start'
                    }
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
.singleAreaChart {
    width: 100%;
    height: 100%;
}
</style>
