
// 画布
const cvs=document.querySelector('canvas');
// 画布上下文
const ctx=cvs.getContext('2d')

//初始化画布宽高
function init(){
	cvs.width=window.innerWidth * devicePixelRatio;
	cvs.height=window.innerHeight * devicePixelRatio;
}
init();

//根据DPR计算字体大小(devicePixelRatio 设备像素比)
//关于DPR网址：https://www.bilibili.com/video/BV1xw411h71Q?spm_id_from=333.788.player.switch&vd_source=2cd8048cc52e4e73da84f15ac2e5a6cc
const fontsize=20 * devicePixelRatio;
//设置字体和字体大小（和CSS设置字体一样）
ctx.font=`${fontsize}px "consolas"`;
//计算总列数（fontsize相当于每列的宽度）
const columnCount=Math.floor(cvs.width/fontsize);
// 计算总列数（fontsize相当于每列的宽度）
// 初始化每列字符的起始索引（随机值，避免同步开始）
const charindex = Array(columnCount).fill(0).map(() => Math.floor(Math.random() * 50));
const charIndex=new Array(columnCount).fill(0);

//绘制代码雨
function draw() {
	//加个渐隐效果(因为canvas的绘制是一层一层叠加的，然后这个0.1的遮罩会覆盖先画出来的字符，后画出来的会比先画出来的少一层遮罩，以此达到渐变的效果。
	ctx.fillStyle='rgba(0,0,0,0.1)';
	ctx.fillRect(0,0,cvs.width,cvs.height);
	ctx.fillStyle='#6be445';
	//设置文字的基线为顶部
	ctx.textBaseline='top';
	for(let i=0;i<columnCount;i++){
		//获取随机字符
		const text=getRandomChar();
		//计算文字的x,y坐标
		const x=i*fontsize;
		const y=charindex[i]*fontsize;
		//绘制文本
		ctx.fillText(text,x,y);
		//超出画布归零
		//这里得再加个判断使之错开归零的时间点（否则会很乱）（Math.random()>0.99）
		if(y>=cvs.height && Math.random()>0.99){
			charindex[i]=0;
		}else{
			charindex[i]++;
		}
	}
}
//开始绘制
draw();
setInterval(draw,50)
//每50ms绘制一次
// 获取随机字符
function getRandomChar(){
	const str='0123456789abcdefghijklmnopqrstuvwxyz';
	return str[Math.floor(Math.random()*str.length)];
}
