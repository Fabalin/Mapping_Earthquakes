
// Create the base layer maps code 
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    // Link to more mapbox styles https://docs.mapbox.com/api/maps/styles/
    // Link to change styles https://docs.mapbox.com/api/maps/static-tiles/
    maxZoom: 18,
    accessToken: API_KEY
});

// Dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Create the earthquake layer.
let earthquakes = new L.layerGroup();

// Define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  // Center of the US
  center: [39.5, -98.5], 
  zoom: 3,
  // the first layer is in streets
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
// this allws users to change which layers are visible. 
L.control.layers(baseMaps, overlays).addTo(map);


// URL for earthquake data from the last 7 days
let quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Retrieve the earthquake GeoJSON data.
d3.json(quakeData).then(function(data) {

  // This function returns the style data for each of the earthquakes on the map. 
  // Pass the magnitude of the earthquake into two functions 
  // to calculate the radius and to set the fill color. 
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  };

  // This function determines the color of the circle based on the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  };

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  };

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {

    // Turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },

    // Set the style for each circleMaker using styleInfo function 
    style: styleInfo,

    // Create pop-up for each circleMaker to display the magnitude and location of quake
    // after marker creation and styling. 
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }

  }).addTo(earthquakes);

  // Adding earthquake layer to the map 
  earthquakes.addTo(map);

  // Create a legend control object on the bottom right of the page.
  let legend = L.control({ position: "bottomright" });

  // Then add all the details for the legend.
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };
  // Add the legend element to the map. 
  legend.addTo(map);


});