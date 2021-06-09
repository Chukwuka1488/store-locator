mapboxgl.accessToken =
  "pk.eyJ1IjoiY2h1a3d1a2ExNCIsImEiOiJja3BneG1wcWUwN2p3MnVwbXhnengxZDgxIn0.6ijOlwMA-gH2XceZobHt-w";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [3.39861, 6.55541],
});

// to fetch locations from api
async function getAmazons() {
  const res = await fetch("/api/v1/amazons"); // the api route initially created
  const data = await res.json();
  // to convert it to a location method
  const amazons = data.data.map((amazon) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          amazon.location.coordinates[0],
          amazon.location.coordinates[1],
        ],
      },
      properties: {
        amazonId: amazon.amazonId,
        icon: "shop",
      },
    };
  });

  loadMap(amazons);
}

//load map with locations
function loadMap(amazons) {
  map.on("load", function () {
    // Load an image from an external URL.
    // map.loadImage(
    //   "https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png",
    //   function (error, image) {
    //     if (error) throw error;

    //     // Add the image to the map style.
    //     map.addImage("cat", image);

    // Add a data source containing one point feature.
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: amazons,
        // features: [
        //   {
        //     type: "Feature",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [3.39861, 6.55541],
        //     },
        //     properties: {
        //       amazonId: "0001",
        //       icon: "shop",
        //     },
        //   },
        // ],
      },
    });

    // Add a layer to use the image to represent the data.
    map.addLayer({
      id: "points",
      type: "symbol",
      source: "point", // reference the data source
      layout: {
        "icon-image": "{icon}-15", // reference the image
        "icon-size": 1.5,
        "text-field": "{amazonId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}

getAmazons();
