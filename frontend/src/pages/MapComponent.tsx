import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import directions from "@mapbox/mapbox-sdk/services/directions";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW1hbmhleCIsImEiOiJjbTBxcWNoNWQwMG1tMmpzNDAzaDVwZTcwIn0.87pW3QNLY2nU4emxLJ-UOA";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(98.9531);
  const [lat, setLat] = useState(18.7964);
  const [zoom, setZoom] = useState(12);

  const directionsClient = directions({
    accessToken: mapboxgl.accessToken,
  });

  useEffect(() => {
    if (!map && mapContainer.current) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });

      setMap(mapInstance);

      mapInstance.on("move", () => {
        setLng(mapInstance.getCenter().lng.toFixed(4));
        setLat(mapInstance.getCenter().lat.toFixed(4));
        setZoom(mapInstance.getZoom().toFixed(2));
      });
    }
  }, [map]);

  // Function to get user's current location (latitude and longitude)
  const getUserLocation = () => {
    return new Promise<{ lng: number; lat: number }>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            resolve({ lng: longitude, lat: latitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const getDirections = (
    startCoords: [number, number],
    endCoords: [number, number]
  ) => {
    if (map?.isStyleLoaded()) {
      directionsClient
        .getDirections({
          waypoints: [
            { coordinates: startCoords }, // Starting point
            { coordinates: endCoords }, // Destination
          ],
          profile: "driving", // Set the travel mode (driving, walking, cycling)
          geometries: "geojson", // GeoJSON format to draw route on the map
        })
        .send()
        .then((response) => {
          const route = response.body.routes[0].geometry.coordinates;
          const geojson = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          };

          if (map?.getSource("route")) {
            (map.getSource("route") as mapboxgl.GeoJSONSource).setData(geojson);
          } else {
            map?.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: geojson,
              },
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#362fd9",
                "line-width": 5,
                "line-opacity": 0.75,
              },
            });
          }

          // Add colored markers for start and destination points
          new mapboxgl.Marker({ color: "green" })
            .setLngLat(startCoords)
            .setPopup(new mapboxgl.Popup().setHTML("<h4>Start Point</h4>"))
            .addTo(map);

          new mapboxgl.Marker({ color: "red" })
            .setLngLat(endCoords)
            .setPopup(new mapboxgl.Popup().setHTML("<h4>Destination</h4>"))
            .addTo(map);
        })
        .catch((error) => {
          console.error("Error fetching directions:", error);
        });
    } else {
      // Add a listener to ensure the map style is loaded before adding the route
      map?.on("style.load", () => {
        getDirections(startCoords, endCoords);
      });
    }
  };

  //  Get directions from the user's location to a charging station
  useEffect(() => {
    if (map) {
      map.on("load", async () => {
        try {
          const userLocation = await getUserLocation();
          getDirections(
            [userLocation.lng, userLocation.lat],
            [98.9531, 18.7964]
          );
        } catch (error) {
          console.error("Error getting user's location:", error);
        }
      });
    }
  }, [map]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100%", borderRadius: "8px" }}
    />
  );
};

export default MapComponent;
