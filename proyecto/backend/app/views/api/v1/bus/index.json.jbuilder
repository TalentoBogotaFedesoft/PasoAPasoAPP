json.buses @buses do |bus|
    json.id bus.id
    json.code bus.code
    if bus.route.nil?
        json.route ""
    else
        json.route  bus.route.code
    end
end