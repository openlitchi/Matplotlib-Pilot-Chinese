# Change Log

**目前还是预览版**

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Added
- 布局调整
- 引入mplstyle
- 常见概念中添加箭头概念
- 引入path,patch,collection等概念
- 引入更多数据格式加载

## [0.0.31] 

### Changed
- 修改`display name`为`Matplotlib Pilot (Chinese)`

## [0.0.31] 

### Changed
- README图片引用

### Removed
- 移除`plt-snippet.ipynb2html`命令，不再需要该命令

## [0.0.30] 

### Changed
- 用户可以更加方便的自定义模板
- 常见概念中添加了绘图样式
- 优化代码组织结构


## [0.0.29]

### Added
- `常见概念`网页中引入`hatch`概念，帮助用户快速查看**阴影样式**

## [0.0.28]

### Added
- 添加使用自定义侧边栏部分的README

## [0.0.27]

### Added
- 新增`plt-snippet.ipynb2html`命令，该命令可以将一个notebook文件转化为侧边栏html文件
- 新增`plt-snippet.refreshSideviewHtml`命令，该命令可以从默认notebook文件刷新侧边栏
- 新增`plt-snippet.modifySideview`命令，调出默认侧面板视图对应的notebook文件，
    用户直接修改此文件并保存后，调用`plt-snippet.refreshSideviewHtml`命令，
    重新加载插件时即可使用修改后的侧边栏视图

## [0.0.26]

### Removed
- 删除字体配置相关代码

## [0.0.25]

### Changed
- 侧边栏生成方式改变为根据notebook文件生成，而不需要手动编辑

### Fixed
- 修正图例代码片段

## [0.0.24]

### Fixed
- 修正颜色选择器选择颜色后，颜色字符串不随之变化的问题，并且将颜色字符串自动推送到剪贴板


## [0.0.23]

### Added
- 增加自定义模板功能，插件可以自己制作“自定义模板”而不需要依赖外部工具，并完善README模板生成部分

### Changed
- 重构绘图模板部分代码
- 修正了自定义模板的参数拼写：`Cunstom Template HTML` -> `Custom Template HTML`


## [0.0.22]

### Added
- 添加keywords

### Changed
- 修改logo和icon


## [0.0.21]

### Added
- 为代码片段增加注释，可以配置变量`plt-snippet.commentWhenClick`和`plt-snippet.commentWhenDoubleClick`设置单击、双击时使用带注释的或者不带注释的代码片段


0.0.20: 增加绘图类型，迁移更新日志

0.0.19: 调整按钮和颜色选择布局，鼠标悬停在按钮上时会显示提示信息

0.0.18: 增加模板和按钮

0.0.17: 调整CSS，增加3D、多图方面的模板，调整按钮功能，添加插件教程按钮

0.0.16: 增加模板

0.0.15: 修复打开本地网页时重复打开多个网页的bug

0.0.14: 增加自定义模板功能

0.0.13: 增加模板

0.0.12: 完善网页视图制作流程，避免手动粘贴工作，增加案例，修改 css 使按钮符合 VS Code 主题

0.0.11: 增加了模板生成的原型，修复了未打开编辑器时网页不能正常打开的bug

0.0.10: 增加`颜色、标识符、线型`本地网页内容

0.0.9: 修改了视图，常用网页的打开方式，为增加新功能提供基础，下一步将重点增强功能，视图美化的工作将置后。