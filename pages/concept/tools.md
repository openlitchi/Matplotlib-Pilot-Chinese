## [标识符-matplotlib.markers](https://matplotlib.org/stable/api/markers_api.html)

可以在绘图函数内通过`marker="marker name"`设置标识符，
标识符大小通过`markersize1=<16>`设置。

下面是一些常用的`marker name`


|marker|symbol|description|
|-|-|-|
|"."|![point](image/marker/m00.webp)|point|
|","|![pixel](image/marker/m01.webp)|pixel|
|"o"|![circle](image/marker/m02.webp)|circle|
|"v"|![triangle_down](image/marker/m03.webp)|triangle_down|
|"^"|![triangle_up](image/marker/m04.webp)|triangle_up|
|"<"|![triangle_left](image/marker/m05.webp)|triangle_left|
|">"|![triangle_right](image/marker/m06.webp)|triangle_right|
|"1"|![tri_down](image/marker/m07.webp)|tri_down|
|"2"|![tri_up](image/marker/m08.webp)|tri_up|
|"3"|![tri_left](image/marker/m09.webp)|tri_left|
|"4"|![tri_right](image/marker/m10.webp)|tri_right|
|"8"|![octagon](image/marker/m11.webp)|octagon|
|"s"|![square](image/marker/m12.webp)|square|
|"p"|![pentagon](image/marker/m13.webp)|pentagon|
|"P"|![plus(filled)](image/marker/m23.webp)|plus(filled)|
|"*"|![star](image/marker/m14.webp)|star|
|"h"|![hexagon1](image/marker/m15.webp)|hexagon1|
|"H"|![hexagon2](image/marker/m16.webp)|hexagon2|
|"+"|![plus](image/marker/m17.webp)|plus|
|"x"|![x](image/marker/m18.webp)|x|
|"X"|![x(filled)](image/marker/m24.webp)|x(filled)|
|"D"|![diamond](image/marker/m19.webp)|diamond|
|"d"|![thin_diamond](image/marker/m20.webp)|thin_diamond|
|"\|"|![vline](image/marker/m21.webp)|vline|
|"_"|![hline](image/marker/m22.webp)|hline|


## [颜色-matplotlib.colors](https://matplotlib.org/stable/gallery/color/named_colors.html)

颜色的控制参数为`color="color name"`，`color name`有很多形式，包括
1. 单字母：
![单字颜色](image/color/named_colors_2.png)
2. 单词：
![单词颜色](image/color/named_colors_1.png)
3. 六位十六进制颜色值

+ <font color="#ff0094">#ff0094</font>
+ <font color="#ff0000">#ff0000</font>
+ <font color="#000000">#000000</font>

## [颜色映射-colormap](https://matplotlib.org/stable/gallery/color/colormap_reference.html)

颜色映射的控制参数为`cmap="colormap name"`，常用的`colormap name`为

+ `jet`: `ANSYS Fluent`默认选项
+ `coolwarm`: `Paraview`默认选项
+ `hot`: `Comsol`默认选项
+ `Greys` or `gray`: 灰度
+ `binary`: 黑白二值
+ 所以`colormapname`均支持`colormapname_r`来反转


![](image/cmap/cmap_1.png)
![](image/cmap/cmap_2.png)
![](image/cmap/cmap_3.png)
![](image/cmap/cmap_4.png)
![](image/cmap/cmap_5.png)
![](image/cmap/cmap_6.png)
![](image/cmap/cmap_7.png)
![](image/cmap/cmap_8.png)


## [线形-linestyles](https://matplotlib.org/stable/gallery/lines_bars_and_markers/linestyles.html)

线型参数可以通过`linestyle="linestyle name"`设置，
线宽控制为`linewidth=<2>` or `lw=<2>`
常用的`linestyle name`为：

+ `solid` 实线
+ `dotted` 点线
+ `dashed` 虚线
+ `dashdot` 点画线

线形还可以通过一个元组`(a, (b,c,...))`控制，其中

+ `a`: 线条的重复方式，通常为0
+ `b`: 线段长度
+ `c`: 空白长度
+ `d`: 下一段线长度(可选)
+ `e`: 下一段空白长度(可选)

下面是一些效果，
![linestyle](image/ls/linestyle.png)


## [剖面线-matplotlib.hatch](https://matplotlib.org/stable/gallery/shapes_and_collections/hatch_style_reference.html)

可以在一些绘图函数中通过`hatch`参数指定`patch`对象的填充值，
这一点在一些[条形图](https://matplotlib.org/stable/gallery/shapes_and_collections/hatch_demo.html)中常用于区分不同组数据。

以下是`hatch`参数的一些可选值
1. 单个字符决定样式
![单个字符](image/hatch/hatch_1.webp)
2. 重复字符可以增加密度
![重复字符](image/hatch/hatch_2.webp)
3. 组合字符可以组合样式
![组合字符](image/hatch/hatch_3.webp)


## [绘图样式-matplotlib.style](https://matplotlib.org/stable/gallery/style_sheets/style_sheets_reference.html)

可以使用`plt.style.use('bmh')`设置相应的风格，
其中风格字符串名可以使用`print(plt.style.available)`打印，
安装一些库（例如`pip install SciencePlots`）后可以使用更多风格。

以下时一些内置风格。


![bmh](image/style/bmh.png)
![fivethirtyeight](image/style/fivethirtyeight.png)
![seaborn-v0_8-bright](image/style/seaborn-v0_8-bright.png)
![seaborn-v0_8-dark-palette](image/style/seaborn-v0_8-dark-palette.png)
![seaborn-v0_8-paper](image/style/seaborn-v0_8-paper.png)
![seaborn-v0_8-ticks](image/style/seaborn-v0_8-ticks.png)
![tableau-colorblind10](image/style/tableau-colorblind10.png)
![dark_background](image/style/dark_background.png)
![ggplot](image/style/ggplot.png)
![seaborn-v0_8-colorblind](image/style/seaborn-v0_8-colorblind.png)
![seaborn-v0_8-deep](image/style/seaborn-v0_8-deep.png)
![seaborn-v0_8-muted](image/style/seaborn-v0_8-muted.png)
![seaborn-v0_8-pastel](image/style/seaborn-v0_8-pastel.png)
![seaborn-v0_8-poster](image/style/seaborn-v0_8-poster.png)
![seaborn-v0_8-talk](image/style/seaborn-v0_8-talk.png)
![default](image/style/default.png)
![grayscale](image/style/grayscale.png)
![seaborn-v0_8-dark](image/style/seaborn-v0_8-dark.png)
![seaborn-v0_8-darkgrid](image/style/seaborn-v0_8-darkgrid.png)
![seaborn-v0_8-notebook](image/style/seaborn-v0_8-notebook.png)
![seaborn-v0_8-white](image/style/seaborn-v0_8-white.png)
![seaborn-v0_8-whitegrid](image/style/seaborn-v0_8-whitegrid.png)
![fast](image/style/fast.png)
![seaborn-v0_8](image/style/seaborn-v0_8.png)
![Solarize_Light2](image/style/Solarize_Light2.png)
