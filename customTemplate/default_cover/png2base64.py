from PIL import Image
import io
import base64

def png_to_base64(image_path):
    """
    将PNG图片转换为Base64编码字符串。
    
    :param image_path: PNG图片的路径
    :return: Base64编码的字符串
    """
    # 打开图片文件
    with Image.open(image_path) as img:
        # 创建一个BytesIO对象
        img_byte_arr = io.BytesIO()
        # 将图片保存到BytesIO中，格式为PNG
        img.save(img_byte_arr, format='PNG')
        # 获取BytesIO中的字节
        img_byte_arr = img_byte_arr.getvalue()
        # 将字节数据转换为Base64编码
        img_base64 = base64.b64encode(img_byte_arr)
        # 将Base64编码转换为字符串并返回
        return img_base64.decode('utf-8')

# 图片文件路径
image_path = 'default_cover.png'
# 转换图片
base64_string = "data:image/jpeg;base64," + png_to_base64(image_path)
# 打印或写出Base64编码
# print(base64_string)

# 如果需要将Base64字符串写入文件，可以这样做
with open('default_cover.png.base64', 'w') as file:
    file.write(base64_string)