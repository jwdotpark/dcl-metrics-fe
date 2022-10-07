import { ResponsiveBar } from "@nivo/bar"

const SceneBarChart = () => {
  const data = [
    {
      country: "AD",
      "hot dog": 179,
      "hot dogColor": "hsl(206, 70%, 50%)",
      burger: 119,
      burgerColor: "hsl(320, 70%, 50%)",
      sandwich: 127,
      sandwichColor: "hsl(353, 70%, 50%)",
      kebab: 194,
      kebabColor: "hsl(195, 70%, 50%)",
      fries: 45,
      friesColor: "hsl(125, 70%, 50%)",
      donut: 152,
      donutColor: "hsl(106, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 70,
      "hot dogColor": "hsl(47, 70%, 50%)",
      burger: 74,
      burgerColor: "hsl(247, 70%, 50%)",
      sandwich: 57,
      sandwichColor: "hsl(77, 70%, 50%)",
      kebab: 22,
      kebabColor: "hsl(305, 70%, 50%)",
      fries: 31,
      friesColor: "hsl(210, 70%, 50%)",
      donut: 96,
      donutColor: "hsl(331, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 14,
      "hot dogColor": "hsl(314, 70%, 50%)",
      burger: 172,
      burgerColor: "hsl(228, 70%, 50%)",
      sandwich: 143,
      sandwichColor: "hsl(19, 70%, 50%)",
      kebab: 57,
      kebabColor: "hsl(232, 70%, 50%)",
      fries: 165,
      friesColor: "hsl(179, 70%, 50%)",
      donut: 20,
      donutColor: "hsl(232, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 96,
      "hot dogColor": "hsl(10, 70%, 50%)",
      burger: 5,
      burgerColor: "hsl(174, 70%, 50%)",
      sandwich: 181,
      sandwichColor: "hsl(308, 70%, 50%)",
      kebab: 71,
      kebabColor: "hsl(188, 70%, 50%)",
      fries: 102,
      friesColor: "hsl(106, 70%, 50%)",
      donut: 139,
      donutColor: "hsl(110, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 111,
      "hot dogColor": "hsl(140, 70%, 50%)",
      burger: 168,
      burgerColor: "hsl(176, 70%, 50%)",
      sandwich: 69,
      sandwichColor: "hsl(250, 70%, 50%)",
      kebab: 89,
      kebabColor: "hsl(65, 70%, 50%)",
      fries: 21,
      friesColor: "hsl(267, 70%, 50%)",
      donut: 12,
      donutColor: "hsl(93, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 131,
      "hot dogColor": "hsl(236, 70%, 50%)",
      burger: 161,
      burgerColor: "hsl(339, 70%, 50%)",
      sandwich: 1,
      sandwichColor: "hsl(297, 70%, 50%)",
      kebab: 103,
      kebabColor: "hsl(27, 70%, 50%)",
      fries: 128,
      friesColor: "hsl(30, 70%, 50%)",
      donut: 86,
      donutColor: "hsl(224, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 133,
      "hot dogColor": "hsl(251, 70%, 50%)",
      burger: 14,
      burgerColor: "hsl(24, 70%, 50%)",
      sandwich: 34,
      sandwichColor: "hsl(126, 70%, 50%)",
      kebab: 49,
      kebabColor: "hsl(358, 70%, 50%)",
      fries: 88,
      friesColor: "hsl(199, 70%, 50%)",
      donut: 116,
      donutColor: "hsl(324, 70%, 50%)",
    },
  ]

  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 30, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 12,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }}
    />
  )
}

export default SceneBarChart
