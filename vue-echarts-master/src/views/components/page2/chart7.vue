<template>
    <div class="pieChart"></div>
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
                title: [
                    {
                        text: "水质检测参数",
                        left: '15.5%',
                        bottom: '8%',
                        textStyle: {
                            color: "#fff",
                            fontSize: 13
                        }
                    }
                    // ,
                    // {
                    //     text: "【人数】",
                    //     left: '46%',
                    //     bottom: '6%',
                    //     textStyle: {
                    //         color: "#fff",
                    //         fontSize: 12
                    //     }
                    // }
                    ,
                    {
                        text: "水质检测设备",
                        right: '22.5%',
                        bottom: '8%',
                        textStyle: {
                            color: "#fff",
                            fontSize: 13
                        }
                    }
                ],
                tooltip: {
                    trigger: 'item',
                    formatter: "{d}%"
                },
                legend: {
                    data: [
                        {name: '分类1', icon: 'circle'},
                        {name: '分类2', icon: 'circle'},
                        {name: '分类3', icon: 'circle'},
                        {name: '分类4', icon: 'circle'},
                        {name: '分类5', icon: 'circle'},
                    ],
                    left: "8%",
                    top: "10%",
                    itemWidth: 7,
                    itemHeight: 7,
                    textStyle: {
                        color: '#00CCFF',
                        fontSize: 10
                    }
                },
                series: [
                    {
                        name: '水质检测参数',
                        type: 'pie',
                        radius: '40%',
                        center: ['26%', '50%'],
                        data: [
                            {value: 20, name: '物理参数'},
                            {value: 55, name: '化学参数'},
                            {value: 15, name: '生物参数'},
                            {value: 10, name: '其它参数'},
                            // {value: 1548, name: '分类5'}
                        ],
                        label: {
                            fontSize: 8,
                            color: '#00CCFF'
                        },
                        labelLine: {
                            length: 15,
                            length2: 10,
                            lineStyle: {
                                color: '#3F3F5C'
                            }
                        },
                        itemStyle: {
                            color: function (params) {
                                var colorList = ['#F74F64', '#00CCFF', '#315371', '#142AFE', '#9814FE'];
                                return colorList[params.dataIndex];
                            },
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                    // ,
                    // {
                    //     name: '【人数】',
                    //     type: 'pie',
                    //     radius: '40%',
                    //     center: ['50%', '60%'],
                    //     data: [
                    //         {value: 545, name: '分类1'},
                    //         {value: 210, name: '分类2'},
                    //         {value: 2534, name: '分类3'},
                    //         {value: 1335, name: '分类4'},
                    //         {value: 1548, name: '分类5'}
                    //     ],
                    //     label: {
                    //         fontSize: 8,
                    //         color: '#00CCFF'
                    //     },
                    //     labelLine: {
                    //         length: 15,
                    //         length2: 10,
                    //         lineStyle: {
                    //             color: '#3F3F5C'
                    //         }
                    //     },
                    //     itemStyle: {
                    //         color: function (params) {
                    //             var colorList = ['#F74F64', '#00CCFF', '#315371', '#142AFE', '#9814FE'];
                    //             return colorList[params.dataIndex];
                    //         },

                    //     },
                    //     emphasis: {
                    //         itemStyle: {
                    //             shadowBlur: 10,
                    //             shadowOffsetX: 0,
                    //             shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //         }
                    //     }
                    // }
                    ,
                    {
                        name: '水质检测设备',
                        type: 'pie',
                        radius: '40%',
                        center: ['68%', '50%'],
                        data: [
                            {value: 40, name: '水质分析仪'},
                            {value: 30, name: '水质在线监测系统'},
                            {value: 20, name: '水质传感器'},
                            {value: 10, name: '新型检测产品'},
                        ],
                        label: {
                            fontSize: 8,
                            color: '#00CCFF'
                        },
                        labelLine: {
                            length: 15,
                            length2: 10,
                            lineStyle: {
                                color: '#3F3F5C'
                            }
                        },
                        emphasis: {
                           itemStyle: {
                               shadowBlur: 10,
                               shadowOffsetX: 0,
                               shadowColor: 'rgba(0, 0, 0, 0.5)'
                           }
                        },
                        itemStyle: {
                            color: function (params) {
                                var colorList = ['#F74F64', '#00CCFF', '#315371', '#142AFE', '#9814FE'];
                                return colorList[params.dataIndex];
                            }
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
.pieChart {
    height: 100%;
    width: 100%;
    padding: 0 20px;
}
</style>
