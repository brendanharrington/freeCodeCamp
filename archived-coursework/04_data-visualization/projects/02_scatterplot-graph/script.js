document.addEventListener("DOMContentLoaded", async () => {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  const margin = { top: 20, right: 20, bottom: 60, left: 70 };
  const totalWidth = 950;
  const totalHeight = 500;
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  const response = await fetch(url);
  const data = await response.json();

  // Convert Seconds to Date object for y-axis
  data.forEach(d => {
    d.TimeDate = new Date(1970, 0, 1, 0, Math.floor(d.Seconds / 60), d.Seconds % 60);
  });

  // Scales
  const xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.Year) - 1, d3.max(data, d => d.Year) + 1])
    .range([0, width]);

  const yScale = d3.scaleTime()
    .domain([d3.max(data, d => d.TimeDate), d3.min(data, d => d.TimeDate)])
    .range([height, 0]);

  // SVG container
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight); 

  const chart = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Axes
  chart.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

  chart.append("g")
    .attr("id", "y-axis")
    .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S")));

  // Tooltip
  const tooltip = d3.select("#tooltip")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("padding", "8px")
    .style("border-radius", "6px")
    .style("border", "1px solid #333")
    .style("box-shadow", "2px 2px 5px rgba(0,0,0,0.3)")
    .style("pointer-events", "none");

  // Scatterplot points
  chart.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", d => xScale(d.Year))
    .attr("cy", d => yScale(d.TimeDate))
    .attr("r", 6)
    .attr("fill", d => d.Doping ? "red" : "green")
    .attr("stroke", "#333")
    .attr("stroke-width", 1)
    .attr("data-xvalue", d => d.Year)
    .attr("data-yvalue", d => d.TimeDate)
    .style("cursor", "pointer")
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip.html(`
          <strong>${d.Name} (${d.Nationality})</strong><br>
          Year: ${d.Year}<br>
          Time: ${d.Time}<br>
          ${d.Doping ? "Doping: " + d.Doping : ""}
          <br><a href="${d.URL}" target="_blank">More info</a>
        `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px")
        .attr("data-year", d.Year);
    })
    .on("mouseout", () => tooltip.transition().duration(200).style("opacity", 0));

  // Axis labels
  chart.append("text")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .text("Year");

  chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -55)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .text("Time (Minutes:Seconds)");

  // Legend
  const legendData = [
    { label: "Doping Allegation", color: "red" },
    { label: "No Doping", color: "green" }
  ];

  const legend = chart.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${width - 150}, 20)`);

  // Optional background box for legend
  legend.append("rect")
    .attr("x", -10)
    .attr("y", -10)
    .attr("width", 160)
    .attr("height", 70)
    .attr("fill", "white")
    .attr("stroke", "black")
    .lower();

  legend.selectAll("rect.color-box")
    .data(legendData)
    .enter()
    .append("rect")
    .attr("class", "color-box")
    .attr("x", 0)
    .attr("y", (d, i) => i * 30)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", d => d.color);

  legend.selectAll("text")
    .data(legendData)
    .enter()
    .append("text")
    .attr("x", 30)
    .attr("y", (d, i) => i * 30 + 12)
    .text(d => d.label)
    .style("font-weight", "bold")
    .style("font-size", "14px")
    .attr("alignment-baseline", "middle");

});
