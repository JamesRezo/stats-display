function getSpipJson()
{
  fetch('https://jamesrezo.github.io/stats-backup/spip.json')
    .then(response => response.json())
    .then(spip => populate("#spip-data", spip))
    .then(spip => doPie("#spip-pie", spip, [
      "#303030", //greyscale for versions (<3.0)
      "#505050",
      "#707070",
      "#990000", // red, oldoldstable versions (=3.0)
      "#FFE599", // yellow, oldstable version (=3.1)
      "#B6D7A8", // green, stable version (=3.2)
      "#D5A6BD", // mauve, dev version (=3.3)
    ]));
}

function getPhpJson()
{
  fetch('https://jamesrezo.github.io/stats-backup/php.json')
    .then(response => response.json())
    .then(php => populate("#php-data", php))
    .then(php => doPie("#php-pie", php, [
      "#303030", //grey, very, very, very old versions (<5)
      "#303030",
      //"#990000", no 5.0 data
      "#990000", //red, very old versions  (<5.6)
      "#990000",
      "#990000",
      "#990000",
      "#990000",
      "#FFE599", //yellow, unmaintained versions (>=5.6, <7.2)
      "#FFE599",
      "#FFE599",
      "#B6D7A8", //green, stable or  maintained versions (>=7.2)
      "#B6D7A8",
      "#B6D7A8",
      "#D5A6BD", // mauve, dev version (>=8.0)
    ]));
}

function populate(tableElement, data)
{
  var myTable = document.querySelector(tableElement);
  myTable.tBodies[0].removeChild(myTable.tBodies[0].firstElementChild);

  let sumSites = 0;
  for (var i = 0; i < data.length; i++) {
    var version = document.createElement('td');
    version.textContent = data[i].version;
    var sites = document.createElement('td');
    sites.textContent = data[i].sites;
    var raw = document.createElement('tr');
    raw.appendChild(version);
    raw.appendChild(sites);

    myTable.tBodies[0].appendChild(raw);
    sumSites = sumSites + data[i].sites;
  }

  myTable.tFoot.firstElementChild.cells[1].textContent = sumSites;

  return data;
}

function doPie(element, src, colors)
{
  // set the dimensions and margins of the graph
  var width  = 700
      height = 700
      margin = 40

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'my_dataviz'
  var svg = d3.select(element)
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

  var data = {};
  for (var i = 0; i < src.length; i++) {
    data[src[i].version] = src[i].sites;
  }

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(data)
    .range(colors)

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .sort(null)
    .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(data))

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(radius/2)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 0.7)
  
  return data;
}

getSpipJson();
getPhpJson();
