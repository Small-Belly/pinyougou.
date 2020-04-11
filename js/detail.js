window.addEventListener('load', function() {
	var preview_img = document.querySelector('.preview_img');
	var mask = document.querySelector('.mask');
	var big = document.querySelector('.big');
	preview_img.addEventListener('mouseover', function() {
		mask.style.display = 'block';
		big.style.display = 'block';
	});
	preview_img.addEventListener('mouseout', function() {
		mask.style.display = 'block';
		big.style.display = 'none';
	});
	//2.鼠标移动的时候,让小盒子跟着鼠标走
	preview_img.addEventListener('mousemove', function(e) {
		//(1)先计算鼠标在盒子内的坐标
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		// console.log(x, y);
		//(2)减去盒子宽高的一半,让鼠标在中间
		var maskX = x - mask.offsetWidth / 2;
		var maskY = y - mask.offsetHeight / 2;
		//(3) mask可以移动的距离
		//(4)如果小于0,则设置为0;如果大于最大距离,则设为最大距离
		//(5)小图片盒子的距离 减去 mask遮盖层的宽高
		var maskXMax = preview_img.offsetWidth - mask.offsetWidth;
		var maskYMax = preview_img.offsetHeight - mask.offsetHeight;
		if (maskX <= 0) {
			maskX = 0;
		} else if (maskX >= maskXMax) {
			maskX = maskXMax;
		}
		if (maskY <= 0) {
			maskY = 0;
		} else if (maskY >= maskYMax) {
			maskY = maskYMax;
		}
		console.log(maskX, maskY);
		mask.style.left = maskX + 'px';
		mask.style.top = maskY + 'px';
		/* 
        大图片的移动距离 / 大图片的最大移动距离 = 小图片的移动距离  /小图片的最大移动距离
        大图片的移动距离 = 小图片的移动距离 * 大图片的最大移动距离 /小图片的最大移动距离
       */
		var bigImg = document.querySelector('.bigImg'); //800
		var bigXMax = bigImg.offsetWidth - big.offsetWidth;
		var bigYMax = bigImg.offsetHeight - big.offsetHeight;
		var bigX = (maskX * bigXMax) / maskXMax;
		var bigY = (maskY * bigYMax) / maskYMax;
		bigImg.style.left = -bigX + 'px';
		bigImg.style.top = -bigY + 'px';
	});
});
