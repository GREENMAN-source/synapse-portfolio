from rembg import remove
from PIL import Image
input_path = 'C:/Users/dhanvanth/.gemini/antigravity/brain/e1f0e55e-d947-4f96-aa87-51b17882bb7b/media__1778952141432.jpg'
output_path = 'd:/projects/dhanvanth-portfolio/public/assets/cyber_avatar_transparent.png'
input_image = Image.open(input_path)
output_image = remove(input_image)
output_image.save(output_path)
print('Done!')
