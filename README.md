##30 DAYS OF REACT NATIVE's way
-- origin <https://github.com/fangwei716/30-days-of-react-native>
###Day1 Timer

* 布局 文字 fontWeight
* 状态一控制
* 组件分开写最后组合
* 小的标志图可用position
* 计时逻辑

###Day2 Weather
* 布局 scrolview vector-icon 
* swiper 一次map了各城市数据
* 内嵌scrollview

###Day3 Twitter
* 动画 变形及透明  动画constructor时设初值 组件style时设为属性，动作或者ComponentDidMount 时启动动画。动画有几种，我喜欢的牛读翻页效果是Flip <https://github.com/kevinstumpf/react-native-flip-view>
* 下拉刷新 scrollview-->refreshControl 
* tab tab为了兼容android用了react-native-tab-navigator，简洁可定制，如果要可以左右切换效果可以用react-native-scrollable-tab-view。因为这里需要下拉刷新，如果直接用scrollable的tab会下拉不了。而且初始化时load完所有页面数据过大，还是简洁的用第一个较可定制。
* 现在层的实现都是通过用position:'absolute'，后一层叠在前一层上，试了zIndex再看下效果。

###Day6 Spotify
* 介面实在动人 react-native-video + react-native-swiper 
* swiper 为了全屏可触用了position:'absolute',它本身可以设置height/width,页面的点在靠下方位置。
* spotify FontAwesome
