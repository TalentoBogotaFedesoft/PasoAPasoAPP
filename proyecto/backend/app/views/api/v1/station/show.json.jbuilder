json.code @station.code
json.latitude @station.latitude
json.longitude @station.longitude
json.address @station.address
json.routes @station.routes do |route|
    json.id route.id
    json.code route.code
    json.destination route.destination
    json.name route.name
end

