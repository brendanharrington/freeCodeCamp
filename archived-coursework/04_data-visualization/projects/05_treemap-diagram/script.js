const width = 1000;
const height = 600;
const legendHeight = 100;

const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height + legendHeight);

const tooltip = d3.select("#tooltip");

const dataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

// Color scale for platforms
const color = d3.scaleOrdinal(d3.schemeCategory10);

d3.json(dataUrl).then(data => {
  const root = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  const treemapLayout = d3.treemap()
    .size([width, height])
    .padding(1);

  treemapLayout(root);

  // Treemap nodes
  const nodes = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

  nodes.append("rect")
    .attr("class", "tile")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => color(d.data.category))
    .attr("data-name", d => d.data.name)
    .attr("data-category", d => d.data.category)
    .attr("data-value", d => d.data.value)
    .on("mouseover", (event, d) => {
      tooltip.style("opacity", 1)
             .html(`<strong>${d.data.name}</strong><br>Platform: ${d.data.category}<br>Sales: ${d.data.value} million`)
             .attr("data-value", d.data.value)
             .style("left", event.pageX + 10 + "px")
             .style("top", event.pageY + 10 + "px");
    })
    .on("mouseout", () => tooltip.style("opacity", 0));

  nodes.append("text")
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .join("tspan")
    .attr("x", 4)
    .attr("y", (d, i) => 12 + i * 10)
    .text(d => d)
    .attr("font-size", "10px")
    .attr("fill", "white");

  // Legend
  const categories = Array.from(new Set(root.leaves().map(d => d.data.category)));

  const legend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(10, ${height + 20})`);

  const legendItemSize = 15;
  let xOffset = 0;

  categories.forEach(cat => {
    const g = legend.append("g")
      .attr("transform", `translate(${xOffset},0)`);

    // legend rect with class
    g.append("rect")
      .attr("class", "legend-item")
      .attr("width", legendItemSize)
      .attr("height", legendItemSize)
      .attr("fill", color(cat));

    g.append("text")
      .attr("x", legendItemSize + 3)
      .attr("y", legendItemSize - 3)
      .text(cat)
      .attr("font-size", "12px");

    xOffset += legendItemSize + 3 + getTextWidth(cat, "12px Arial") + 15;
  });

  function getTextWidth(text, font) {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
  }
});
