document.addEventListener("DOMContentLoaded", async () => {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
  const data = await d3.json(url);

  const baseTemp = data.baseTemperature;
  const dataset = data.monthlyVariance.map(d => ({
    year: d.year,
    month: d.month,
    temp: baseTemp + d.variance,
    variance: d.variance
  }));

  const margin = { top: 10, right: 20, bottom: 80, left: 100 };
  const width = 1600 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // X scale (years)
  const years = dataset.map(d => d.year);
  const x = d3.scaleBand()
    .domain(years)
    .range([0, width])
    .padding(0);

  // Y scale (months 1–12)
  const y = d3.scaleBand()
    .domain(d3.range(1, 13))
    .range([0, height])
    .padding(0);

  // Color scale
  const color = d3.scaleSequential()
    .interpolator(d3.interpolateRdYlBu)
    .domain([
      d3.max(dataset, d => d.temp), 
      d3.min(dataset, d => d.temp)
    ]);

  // X axis
  const xAxis = d3.axisBottom(x)
    .tickValues(x.domain().filter(year => year % 10 === 0))
    .tickFormat(d3.format("d"));

  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  // Y axis
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const yAxis = d3.axisLeft(y)
    .tickFormat(m => months[m - 1]);

  svg.append("g")
    .attr("id", "y-axis")
    .call(yAxis);

  // Tooltip
  const tooltip = d3.select("#container")
    .append("div")
    .attr("id", "tooltip")   // FCC requires this
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "1px solid #999")
    .style("padding", "6px")
    .style("pointer-events", "none");

  // Draw heatmap cells
  svg.selectAll()
    .data(dataset)
    .join("rect")
    .attr("x", d => x(d.year))
    .attr("y", d => y(d.month))
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .attr("class", "cell")
    .attr("data-year", d => d.year)
    .attr("data-month", d => d.month - 1)  // FCC expects 0–11
    .attr("data-temp", d => d.temp)
    .style("fill", d => color(d.temp))
    .on("mouseover", function(event, d) {
      tooltip
        .style("opacity", 1)
        .attr("data-year", d.year) // FCC checks this
        .html(
          `Year: ${d.year}<br>
           Month: ${months[d.month - 1]}<br>
           Temp: ${d.temp.toFixed(2)}°C<br>
           Variance: ${d.variance.toFixed(2)}°C`
        )
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 30) + "px");
    })
    .on("mouseout", () => tooltip.style("opacity", 0));

  
  // Legend dimensions
  const legendWidth = 400;
  const legendHeight = 20;

  const legend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${(width - legendWidth) / 2}, ${height + 40})`);

  // Legend scale
  const tempExtent = d3.extent(dataset, d => d.temp);
  const legendScale = d3.scaleLinear()
    .domain(tempExtent)
    .range([0, legendWidth]);

  // Breakpoints for discrete colors
  const legendSteps = 8;
  const stepSize = (tempExtent[1] - tempExtent[0]) / legendSteps;
  const thresholds = d3.range(tempExtent[0], tempExtent[1], stepSize);
  thresholds.push(tempExtent[1]); // ensure the max is included

  // Color rectangles
  legend.selectAll("rect")
    .data(thresholds.slice(0, -1)) // draw one rect per interval
    .join("rect")
    .attr("x", d => legendScale(d))
    .attr("y", 0)
    .attr("width", legendScale(thresholds[1]) - legendScale(thresholds[0]))
    .attr("height", legendHeight)
    .attr("fill", d => color(d));

  // Legend axis (include max label)
  const legendAxis = d3.axisBottom(legendScale)
    .tickValues(thresholds) // includes both min and max
    .tickFormat(d3.format(".1f"));

  legend.append("g")
    .attr("transform", `translate(0, ${legendHeight})`)
    .call(legendAxis);
});
