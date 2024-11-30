import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

const MapView = ({ taxiData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!taxiData.length || !mapRef.current) return;

    const map = mapRef.current;
    let routeControl;

    if (routeControl) {
      routeControl.remove();
    }

    const tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
    tileLayer.addTo(map);

    const routeControls = taxiData.map((item) => {
      const start = [item.pickup_latitude, item.pickup_longitude];
      const end = [item.dropoff_latitude, item.dropoff_longitude];

      return L.Routing.control({
        waypoints: [L.latLng(start), L.latLng(end)],
        routeWhileDragging: true,
        show: false,
        createMarker: (i, waypoint) => {
            const customIcon = L.icon({
                iconUrl:
                i === 0 ? "/assets/images/mark.png" : "/assets/images/finish-flag.png",
                iconSize: [29, 29],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            });

            const markerInfo = `
                <div>
                    <h4>${i === 0 ? "Start Point" : "End Point"}</h4>
                    <p><strong>Vendor:</strong> ${item.vendor_id}</p>
                    <p><strong>Payment Type:</strong> ${item.payment_type}</p>
                    <p><strong>Trip Distance:</strong> ${item.trip_distance}</p>
                    <p><strong>Total Amount:</strong> ${item.total_amount}</p>
                    <p><strong>Pickup Longitude / Latitude:</strong> ${
                    item.pickup_longitude
                    } / ${item.pickup_latitude}</p>
                    <p><strong>Dropoff Longitude / Latitude:</strong> ${
                    item.dropoff_longitude
                    } / ${item.dropoff_latitude}</p>
                </div>
            `;

            return L.marker(waypoint.latLng, { icon: customIcon })
                .bindPopup(markerInfo)
                .on("mouseover", function () {
                  this.openPopup();
                })
                .on("mouseout", function () {
                  this.closePopup();
                });
        },
        lineOptions: {
          styles: [{ color: "yellow", weight: 4, opacity: 0.8 }],
        },
      }).addTo(map);
    });

    if (taxiData.length > 0) {
      map.setView(
        [taxiData[0].pickup_latitude, taxiData[0].pickup_longitude],
        10
      );
    }

    // Cleanup function
    return () => {
      routeControls.forEach((control) => control.remove());
    };
  }, [taxiData]);

  return (
    <MapContainer
      zoom={10}
      className="h-1/2 lg:h-full w-full"
      ref={mapRef}
      attributionControl={false}
    >
      <TileLayer
        attribution={""}
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapView;
