async function getSpipJson()
{
  let data = await fetch('https://jamesrezo.github.io/stats-backup/spip.json')
    .then(response => response.json())
    .then(spip => populate("#spip-data", spip));
}

async function getPhpJson()
{
  let data = await fetch('https://jamesrezo.github.io/stats-backup/php.json')
    .then(response => response.json())
    .then(php => populate("#php-data", php));
}

function populate(tableElement, data)
{
  var myTable = document.querySelector(tableElement);
  for (var i = 0; i < data.length; i++) {
    var version = document.createElement('td');
    version.textContent = data[i].version;
    var sites = document.createElement('td');
    sites.textContent = data[i].sites;
    var raw = document.createElement('tr');
    raw.appendChild(version);
    raw.appendChild(sites);

    myTable.tBodies[0].appendChild(raw);
  }
}

getSpipJson();
getPhpJson();
