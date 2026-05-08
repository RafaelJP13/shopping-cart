import ReactECharts from "echarts-for-react";

export default function MyChart() {
    const option = {
        title: {
            text: "Users Growth",
        },
        tooltip: {},
        xAxis: {
            data: ["Jan", "Feb", "Mar", "Apr"],
        },
        yAxis: {},
        series: [
            {
                name: "Users",
                type: "bar",
                data: [120, 200, 150, 320],
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: "400px", width: "100%" }}
        />
    );
}