def calcular(a, b, opcion)
    case opcion
    when 1
        a +b
    when 2
        a - b
    when 4
        a * b
    when 3
        if b == 0
            puts "No se puede divir sobre 0"
        else
            a/b
        end
    end
end


loop do 
    puts "Menú \n 1. Sumar \n 2. Restar \n 3. Dividir \n 4. Multiplicar \n Salir \n Ingrese opción:"
    opcion = gets.chomp.to_i 
    break if opcion == 5
    puts "Ingrese el primer número"
    a = gets.chomp.to_i
    puts "Ingrese el segundo número"
    b = gets.chomp.to_i
    puts "Resultado"
    puts calcular(a,b, opcion)
end


