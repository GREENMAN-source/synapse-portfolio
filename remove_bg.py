from PIL import Image

def remove_white_background(input_path, output_path, threshold=220):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        # Check if pixel is close to white
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_white_background('C:/Users/dhanvanth/.gemini/antigravity/brain/e1f0e55e-d947-4f96-aa87-51b17882bb7b/media__1778948218654.jpg', 'd:/projects/dhanvanth-portfolio/public/assets/3d_avatar_transparent.png', 245)
print('Background removed successfully!')
