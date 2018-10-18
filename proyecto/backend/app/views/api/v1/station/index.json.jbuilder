json.stations @stations do |station|
    json.id station.id
    json.code station.code
    json.address station.address
end