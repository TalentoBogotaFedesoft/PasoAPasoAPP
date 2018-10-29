json.stops @routeStops do |stop|
    json.id stop.id
    json.stop_id stop.stop_id
    json.station_id stop.station.id
    json.latitude stop.station.latitude
    json.longitude stop.station.longitude
end