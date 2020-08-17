var requestURL = 'https://jamesrezo.github.io/stats-backup/spip.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var spipTable = document.querySelector("#spip-data");
  var spip = request.response;
  for (var i = 0; i < spip.length; i++) {
    var version = document.createElement('td');
    version.textContent = spip[i].version;
    var sites = document.createElement('td');
    sites.textContent = spip[i].sites;
    var raw = document.createElement('tr');
    raw.appendChild(version);
    raw.appendChild(sites);

    spipTable.tBodies[0].appendChild(raw);
  }
}
