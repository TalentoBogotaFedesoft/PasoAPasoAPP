puts "lalalalala"
#Variables
numero = 45345
palabra = "historia"
condicion = true

puts numero
puts palabra
puts condicion

#Operaciones matematicas
puts 4 + 6
puts 72/4
puts 95*2
puts 102%4
puts 2**10 
puts 3/2.0
=begin
a = 5
a = a.to_f 
puts a/3
=end 

#Template String
b = "perro #{palabra}" 
puts b

puts "carro"*5

nombre = "Ana María"
puts nombre 
puts nombre.reverse!
puts nombre.capitalize
=begin Leer entrada por consola
entrada = gets.chomp
puts entrada

print "sdfjklsd"
print " wwerwer"
=end

if 5 < 4
    puts "5 < 4"
elsif 5 < 8
    puts "5 < 8"
else 
    puts "4 < 5"
end

unless 5<4 
    puts "hola"
end

=begin Switch Case
opcion = gets.chomp.to_i

case opcion
when 1
    puts "opción 1"
when 2
    puts "opción 2"
else
    puts "kha"
end
=end

arreglo = [1, 2, 3, 4, 5]

arreglo.each do | a | 
    puts a 
end
count = 0

while count < 10
    puts count
    count += 1
end

10.times{puts "pato"} 

for num in 1 ... 10
    puts num
end

def mi_funcion
   puts 5 + 5 * 2 
end

def mi_f2 (a)
    a *2  #el return es implicito en la última linea
end


mi_funcion
puts mi_f2 10
