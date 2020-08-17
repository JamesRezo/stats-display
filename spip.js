function getSpipJson()
{
  fetch('https://jamesrezo.github.io/stats-backup/spip.json')
    .then(response => response.json())
    .then(spip => populate("#spip-data", spip))
    .then(spip => doPie("#spip-pie", spip));
}

function getPhpJson()
{
  fetch('https://jamesrezo.github.io/stats-backup/php.json')
    .then(response => response.json())
    .then(php => populate("#php-data", php))
    .then(php => doPie("#php-pie", php));
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

function doPie(svg, data)
{
  var myPie = document.querySelector(svg);
  var pie = d3.pie(data);

  console.log(data);

  return data;
}

getSpipJson();
getPhpJson();
