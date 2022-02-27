# This file gets all the js files and combines them into one for easy importing :)

def main
	files = Dir.glob "./*.js"
	main_file = File.open "../jscii.js", "w+"
	files.each { |file_path|
		if !file_path.include? "main.js"
			write_file file_path, main_file
		end
	}
	write_file "./main.js", main_file
end

def write_file(file_path, main_file)
	file = File.read file_path
	main_file.write "// #{file_path[2..file_path.length]}"
	main_file.write "\n#{file}\n\n"
end

main