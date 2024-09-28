"""将Pandoc生成的文件嵌入到指定模板中
"""

def insert_content_into_body(file_a, file_b, output_file):
    # 读取文件A的内容
    with open(file_a, 'r', encoding='utf-8') as fa:
        content_to_insert = fa.read()

    # 读取文件B的内容
    with open(file_b, 'r', encoding='utf-8') as fb:
        content_of_b = fb.read()

    # 查找<body>和</body>的位置
    body_start = content_of_b.find('<body>')
    body_end = content_of_b.find('</body>')

    if body_start == -1 or body_end == -1:
        raise ValueError("未能在文件B中找到<body>或</body>标签")

    # 在<body>和</body>之间插入内容
    new_content = (
        content_of_b[:body_start + len('<body>') + 1] +  # 包括<body>和一个换行符
        content_to_insert +  # 文件A的内容
        content_of_b[body_end:]  # 从</body>开始直到结束
    )

    # 将新的内容写入文件C
    with open(output_file, 'w', encoding='utf-8') as fc:
        fc.write(new_content)
    print(f"{output_file} 写出完毕")

# 使用函数
file_a = './content.html'  # 替换成你的文件A路径
file_b = './concept.header.html'  # 替换成你的文件B路径
output_file = '../concept.html'  # 替换成你的输出文件C路径

insert_content_into_body(file_a, file_b, output_file)