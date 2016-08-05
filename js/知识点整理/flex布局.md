采用flex布局的元素称为flex容器(container)，它的所有子元素自动继承为容器成员，
称为flex项目(item),
一、容器的属性
    1、**flex-direction**
        flex-direction属性决定主轴的排列方向，取值有`row, row-reverse, column,
        column-reverse`.
    2、**flex-wrap**
        flex-wrap属性定义项目默认都排在一条轴线上，如果轴线排不下，flex-wrap
        定义是否换行，取值有:`nowrap, wrap, wrap-reverse`
    3、**flex-flow**
        flex-flow是flex-direction和flex-wrap的缩写，默认值为`row, nowrap`
    4、**justify-content**
        定义项目在主轴的对齐方式(水平方向)，属性值有：`flex-start, flex-end,
        center, space-between, space-around`
    5、**align-items**
        定义项目在交叉轴上如何对齐(垂直方向),属性有：`flex-start, flex-end, 
        center, baseline, stretch`.
    6、**align-content**
        align-content定义多根轴线的对齐方式，如果只有一根轴线，该属性不起作用
        属性：`flex-start, flex-end, center, space-between, space-around`,项目
        换行了就会产生多根轴线。
二、项目的属性
    1、**order**
        定义项目排列顺序，数值越小越靠前，默认为0，整数
    2、**flex-grow**
        定义项目的放大比例，默认为0，不同项目可设置不同放大比例，项目相对于0
        放大？
    3、**flex-shrink**
        项目缩小比例，默认为1，即如果空间不足，该项目将缩小。属性0，不缩放
    4、**flex-basis**
    5、**flex**  是前几项的简写
    6、**align-self**

flex布局是为了解决响应式布局对不同设备适配的问题，在flex之前我们一般使用
@media-query查询浏览器窗口大小将浏览器窗口设置为不同区间的宽度，定义不同的样式
使用flex布局后，position和float定位就不起作用了。flex完全可以替代之前的布局，
而不需要去查找窗口大小，自动的流式排列不同元素的位置，值得指出的是flex只是用于
元素的布局，元素的其他样式还是要用到之前的css属性定义，除了IE7/8以下不支持外，
现代主流浏览器都支持flex属性
