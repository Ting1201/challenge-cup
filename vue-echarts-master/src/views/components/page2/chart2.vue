<template>
    <div class="doubleBarChart"></div>
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
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    backgroundColor: '#11367a',
                    textStyle: {
                        color: '#6dd0e3',
                        fontSize: 10,
                    },
                },
                legend: [
                    {
                        top: '8%',
                        right: '5%',
                        itemWidth: 7,
                        itemHeight: 7,
                        textStyle: {
                            color: '#5CB1C1',
                        }
                    },
                ],
                grid:
                    {
                        top: '14%',
                        left: '3%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true,
                    },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            color: '#61B9C8',
                            fontSize: 10
                        },
                        axisLine: {
                            symbol: ['none', 'arrow'],
                            symbolSize: [6, 6],
                            symbolOffset: [0, 5],
                            lineStyle: {
                                color: '#122C49'
                            }
                        },
                        axisTick: {show: false},
                        data: ['2018', '2019', '2020', '2021', '2022', '2023']
                    },
                ],
                yAxis:
                    {
                        type: 'value',
                        min: 0,
                        max: 160,
                        axisLabel: {
                            color: '#61B9C8',
                            fontSize: 9,
                            showMaxLabel: false,
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
                            length: 3
                        },
                        name: '(万架)',
                        nameGap: -5,
                        nameTextStyle: {
                            color: '#61B9C8',
                            fontSize: 9,
                            align: 'right',
                            padding: [0, 6, 0, 0]
                        },
                        splitLine: {show: false}

                    },
                series: [
                    {
                        name: '新增',
                        type: 'bar',
                        barWidth: 7,
                        stack: '总数',
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#FC9386' // 0% 处的颜色
                                },
                                    {
                                        offset: 0.4, color: '#F87B86' // 40% 处的颜色
                                    }, {
                                        offset: 1, color: '#F36087' // 100% 处的颜色
                                    }],
                                global: false // 缺省为 false
                            }, //背景渐变色
                            borderRadius: [3.5, 3.5, 0, 0],
                        },
                        data: [11,16,12,29,10,24]
                    },
                    {
                        name: '总数',
                        type: 'bar',
                        barWidth: 7,
                        stack: '总数',
                        itemStyle: {
                            color: '#8C14EA',
                            borderRadius: [3.5, 3.5, 0, 0,],
                        },
                        data: [25,41,53,81,91,115]
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
.doubleBarChart {
    width: 100%;
    height: 100%;
}
</style>
