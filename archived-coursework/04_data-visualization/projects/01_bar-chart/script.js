document.addEventListener("DOMContentLoaded", async () => {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  const margin = { top: 20, right: 20, bottom: 60, left: 70 };
  const totalWidth = 950;
  const totalHeight = 500;
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  const response = await fetch(url);
  const dataset = await response.json();
  const data = dataset.data;

  const parseDate = d3.timeParse("%Y-%m-%d");

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => parseDate(d[0])))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .range([height, 0]);

  const container = d3.select("#container")
    .append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const barWidth = width / data.length;

  // Tooltip
  const tooltip = d3.select("#tooltip");

  container.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(parseDate(d[0])))
    .attr("y", d => yScale(d[1]))
    .attr("width", barWidth)
    .attr("height", d => height - yScale(d[1]))
    .attr("class", "bar")
    .attr("data-date", d => d[0])
    .attr("data-gdp", d => d[1])
    .on("mouseover", (event, d) => {
      tooltip.style("opacity", 1)
             .html(`<strong>${d[0]}</strong><br>$${d[1].toLocaleString()} Billion`)
             .attr("data-date", d[0]);
    })
    .on("mousemove", event => {
      tooltip.style("left", (event.pageX + 12) + "px")
             .style("top", (event.pageY - 30) + "px");
    })
    .on("mouseout", () => tooltip.style("opacity", 0));

  // X Axis
  container.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Y Axis
  container.append("g")
    .attr("id", "y-axis")
    .call(d3.axisLeft(yScale));

  // X Axis label
  container.append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", height + 45)
    .attr("text-anchor", "middle")
    .text("Year");

  // Y Axis label
  container.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .text("GDP (Billion USD)");
});