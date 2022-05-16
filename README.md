# Mapping_Earthquakes
Using Javascript and D3 to map Earthquake data using API calls. 

## Overview 
To visualize earthquake occurence around the world, JS code was written to pull GeoJSON data of Earthquakes during the past 7 days, from USGS using D3. The data was plotted in a webpage using Mapbox GLJS generated tile layers as the basemap layer with Leaflet providing superimposed overlays of the processed earthquake data. The webpage includes 4 tile layers (streetview, satellite streets, daytime navigation, and outdoors) to highlight different geological and location features. The data presented in the overlay layer includes: 

- Circle markers of all earthquakes including:
  - magnitude and location popups
  - size and color variation based on magnitude. 
  - separate viewing of major earthquake data: magnitude > 4.5. 
- Plate tectonic data drawn using line strings. 

Additionally, the Repo includes two folders (Tutorials and Earthquakes_past7days) providing code templates to learn different features of Leaflet, Mapbox GLJS and GeoJSON. 

***Note: The Final Challenge Items are not contained in a different sub-folder. These items include: [index.html](https://github.com/Fabalin/Mapping_Earthquakes/blob/main/index.html) and static folder containg the [challenge_logic.js](https://github.com/Fabalin/Mapping_Earthquakes/blob/main/static/js/challenge_logic.js) and [style.css files](https://github.com/Fabalin/Mapping_Earthquakes/blob/main/static/css/style.css).***

## Software
- JavaScript - ES6
- HTML5
- CSS - 2.1
- Mapbox GLJS - 2.8.2
- Leaflet - 1.8.0
- D3 - 7.4.4

### Data Sources
- Earthquake GeoJSON Data derived from [U.S Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- Plate Tectonic data derived from github user [fraxen](https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json)

## Results Showcase
