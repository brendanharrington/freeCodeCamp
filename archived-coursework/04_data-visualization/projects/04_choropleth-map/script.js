const countiesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

const svg = d3.select("#map")
  .append("svg")
  .attr("width", 960)
  .attr("height", 600);

const tooltip = d3.select("#tooltip");

const path = d3.geoPath();

const color = d3.scaleQuantize()
  .range(d3.schemeBlues[9]); // 9 shades of blue

Promise.all([d3.json(countiesUrl), d3.json(educationUrl)]).then(([us, education]) => {
  const eduMap = new Map(education.map(d => [d.fips, d]));
  
  const values = education.map(d => d.bachelorsOrHigher);
  color.domain([d3.min(values), d3.max(values)]);
  
  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .join("path")
    .attr("class", "county")
    .attr("d", path)
    .attr("fill", d => {
      const county = eduMap.get(d.id);
      return county ? color(county.bachelorsOrHigher) : "#ccc";
    })
    .attr("data-fips", d => d.id)
    .attr("data-education", d => eduMap.get(d.id)?.bachelorsOrHigher || 0)
    .on("mousemove", (event, d) => {
      const county = eduMap.get(d.id);
      tooltip
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px")
        .style("opacity", 0.9)
        .attr("data-education", county?.bachelorsOrHigher)
        .html(`${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`);
    })
    .on("mouseout", () => tooltip.style("opacity", 0));
  
  // Legend
  const legendWidth = 300;
  const legendHeight = 10;

  const x = d3.scaleLinear()
    .domain(color.domain())
    .range([0, legendWidth]);

  const legend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(560,30)`);

  legend.selectAll("rect")
    .data(color.range().map(d => {
      const invert = color.invertExtent(d);
      if (!invert[0]) invert[0] = x.domain()[0];
      if (!invert[1]) invert[1] = x.domain()[1];
      return invert;
    }))
    .join("rect")
    .attr("x", d => x(d[0]))
    .attr("y", 0)
    .attr("width", d => x(d[1]) - x(d[0]))
    .attr("height", legendHeight)
    .attr("fill", d => color(d[0]));

  const bins = color.range().map(d => color.invertExtent(d)[0]);
bins.push(Math.round(d3.max(values)));
  
  legend.call(d3.axisBottom(x)
    .tickSize(13)
    .tickFormat(d => Math.round(d) + "%")
    .tickValues(bins)
  ).select(".domain").remove();
});
