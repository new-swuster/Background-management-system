export default {
    getCountData:()=>{
        return{
            data:{
                CountData:[
                    {
                        name: "今日支付订单",
                        value: 3421,
                        icon:'Star',
                        color: "#2ec7c9",
                        },
                        {
                        name: "今日收藏订单",
                        value: 210,
                        icon: "StarFilled",
                        color: "#ffb980",
                        },
                        {
                        name: "今日未支付订单",
                        value: 3455,
                        icon: "CirclePlusFilled",
                        color: "#5ab1ef",
                        },
                        {
                        name: "本月支付订单",
                        value: 1234,
                        icon: "Grid",
                        color: "#2ec7c9",
                        },
                        {
                        name: "本月收藏订单",
                        value: 450,
                        icon: "Promotion",
                        color: "#ffb980",
                        },
                        {
                        name: "本月未支付订单",
                        value: 1599,
                        icon: "InfoFilled",
                        color: "#5ab1ef",
                        },
                ]
            }
        }
    }
}