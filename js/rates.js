mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 5, // starting zoom
projection: {
    name: 'albers'
},
center: [-100, 40], // starting center
});

const colorstop = [
    [0, 'rgb(237,248,251)'],
    [30, 'rgb(178,226,226)'],
    [70, 'rgb(102,194,164)'],
    [100, 'rgb(44,162,95)'],
    [130, 'rgb(0,109,44)']
];

map.on('load', () => {
    map.addSource('rate', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.json'
    });

    map.addLayer({
        'id': 'rate-layer',
        'type': 'fill',
        'source': 'rate',
        'minzoom': 0,
        'paint': {
            'fill-color': {
                'property': 'rates',
                'stops': colorstop
            },
            'fill-opacity': 0.5
        }
    });

    map.on('click', 'rate-layer', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.lngLat)
            .setHTML(`<strong>County:</strong> ${event.features[0].properties.county}<br><strong>Rates:</strong> ${event.features[0].properties.rates}%`)
            .addTo(map);
    });
    
});

const legend = document.getElementById('legend');
legend.innerHTML = "<b>covid rate<br>(people/sq.mi.)</b><br><br>";

var labels = ['<strong>Cases</strong>'], vbreak;
for (var i = 0; i < colorstop.length; i++) {
    grade = colorstop[i][0];
    // you need to manually adjust the radius of each dot on the legend 
    // in order to make sure the legend can be properly referred to the dot on the map.
    color = colorstop[i][0];
    labels.push(
    '<p class="break"><i class="dot" style="background:' + colorstop[i][1] + '; width: ' + 20+
    'px; height: ' +
    20+ 'px; "></i> <span class="dot-label" style="top: ' + 'px;">' + grade +
    '</span></p>');
    
    }
const source1 =
'<p style="text-align: left;  font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">The New York Times</a></p>';
// combine all the html codes.;



legend.innerHTML = labels.join('') + source1;





