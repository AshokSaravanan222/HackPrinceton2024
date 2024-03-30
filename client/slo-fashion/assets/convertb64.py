import base64

# The name of the input file (the image you want to encode)
input_file_name = 'image.jpg'
# The name of the output file for the base64 encoded data
output_file_name = 'image_base64.txt'

# Open the image file in binary read mode, encode its contents, and save the output
with open(input_file_name, 'rb') as image_file:
    # Read the image's content
    image_data = image_file.read()
    # Encode the content to base64
    encoded_image = base64.b64encode(image_data)
    
    # Write the base64 encoded content to a new text file
    with open(output_file_name, 'wb') as output_file:
        output_file.write(encoded_image)

print(f"Base64 encoded image saved as {output_file_name}")
