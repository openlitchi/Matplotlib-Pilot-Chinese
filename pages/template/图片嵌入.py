import base64
from bs4 import BeautifulSoup
import os
import glob


def read_file_content(file_path):
    """Read the content of a file and return it as a string."""
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def read_image_as_base64(image_path):
    """Read an image file and convert it to base64 encoding."""
    with open(image_path, 'rb') as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def modify_html(srcHtml, objHtml):
    """Modify the HTML to add data-ipynb attribute to buttons and embed images as base64."""
    # Load the HTML file into BeautifulSoup
    with open(srcHtml, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')

    # Process all images in the HTML
    img_tags = soup.find_all('img')
    for img_tag in img_tags:
        img_path = img_tag['src']
        img_base64 = read_image_as_base64(img_path)
        img_tag['src'] = f'data:image/jpeg;base64,{img_base64}'

    # Find all buttons in the HTML
    buttons = soup.find_all('button')

    # Iterate over each button and set its data-ipynb attribute
    for button in buttons:
        button_id = button['id']
        file_path_pattern = os.path.join('.', f'notebook/*/{button_id}.ipynb')
        match_files_path = glob.glob(file_path_pattern)
        if len(match_files_path) != 1:
            print(f"找不到文件 {button_id}.ipynb， 异常终止")
            exit(-1)
        file_path = match_files_path[0]
              
        if os.path.exists(file_path):
            file_content = read_file_content(file_path)
            button['data-ipynb'] = file_content
            print(f"{button_id:30s} : Success! ")
        else:
            print(f"{button_id:30s} : Fail! ")

    # Write the modified HTML back to the file
    with open(objHtml, 'w', encoding='utf-8') as file:
        file.write(str(soup))

# Example usage
modify_html('template.html', '../template.html')

print('\n处理完成，已将图片链接转换为 base64 编码并嵌入到 HTML 中，输出到 ../template.html 文件中。')
