const map = L.map('map').setView([42.1, 43.5], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const kmlLayer = omnivore.kml('places.kml')
  .on('ready', function () {
    map.fitBounds(kmlLayer.getBounds());

    kmlLayer.eachLayer(function (layer) {
      if (layer.feature && layer.feature.properties) {
        const name = layer.feature.properties.name || "ობიექტი";
        const description = layer.feature.properties.description || "";

        layer.bindPopup(`
          <strong>${name}</strong><br>
          <p>${description}</p>
        `);
      }
    });
  })
  .addTo(map);
