var td;
var width;
var heigh;
var total;
var flag;
var die;
var step = 0;
function DrawTable(){	
	width = document.getElementById("width");
	heigh = document.getElementById("heigh");
	total = document.getElementById("total");
	flag = document.getElementById("flag");
	flag.value=total.value;
	step=(width.value*heigh.value)-total.value;
	die = false;
	var cont=0;
	document.open();
	
	document.write('<form>')
			document.write('請輸入表格的寬跟高<br/>');
			document.write('寬:<input type = "text" id="width" name="width" value="'+width.value+'"><br/>');
			document.write('高:<input type = "text" id="heigh" name="heigh" value="'+heigh.value+'"><br/>');
			document.write('炸彈數:<input type = "text" id="total" name="total" value="'+total.value+'"><br/>');
			document.write('<button type="button" onclick="DrawTable()" >確定</button><br/>');			
			document.write('剩餘標籤：<input type="text" id="flag" name="flag" value="'+flag.value+' "readonly="readonly"><br/>');
	document.write('</form>')
	
		document.write('<link rel="stylesheet" type="text/css" href="/css/mystyle.css">');
		document.write('<table border="1">');
	for(var i=0;i<heigh.value;i++){
		document.write('<tr>');
		for(var j=0;j<width.value;j++){
			document.write('<td id="td'+i+"-"+j+'" onclick="leftclick('+i+','+j+')" oncontextmenu="RightMouse('+i+','+j+');return false;">');
			document.write('</td>');
		}
		document.write('</tr>');
	}
	document.write('</table>');		
	document.close();
	setTable();
}
function setTable(){
	//var width = document.getElementById("width");
	//var heigh = document.getElementById("heigh");
	//var bCont = (width.value/2+heigh.value/2);
		td=new Array(width.value);
	for(var i=0;i<heigh.value;i++){
		td[i]=new Array(heigh.value);
		for(var j=0;j<width.value;j++){
			td[i][j]={id:0,bomb:0,total:0,marker:0};
			td[i][j].id=document.getElementById("td"+i+"-"+j);
			td[i][j].id.innerHTML='<IMG SRC="images/space.jpg">';
		}
	}
	setBomb(total.value);
}

//滑鼠左鍵事件處理程序
function leftclick( x, y){
	if(td[x][y].marker==1|| die==true  )
		return;	
	step--;
	if(td[x][y].bomb==1 ){
		td[x][y].bomb=2;		
		for(var i=0;i<heigh.value;i++){
			for(var j=0;j<width.value;j++){	
				td[i][j].marker=4;	
				if(td[i][j].bomb==1){
					td[i][j].id.innerHTML='<IMG SRC="images/bomb.jpg">';
				}else if(td[i][j].bomb==2){
					td[i][j].id.innerHTML='<IMG SRC="images/bomb1.jpg">';
				}else{									
				//	td[i][j].id.innerHTML='<IMG SRC="images/space'+td[i][j].total+'.jpg">';
				}
			}
		}
		die=true;
	}else {
		td[x][y].id.innerHTML='<IMG SRC="images/space'+td[x][y].total+'.jpg">';		
		td[x][y].marker=4;
		if(td[x][y].total==0){//完全無炸彈
			if(x-1 >=0 && td[x-1][y].marker == 0){//上方
				leftclick( x-1, y);}
			if(y-1 >=0 && td[x][y-1].marker == 0)//左方
				leftclick( x, y-1);
			if(x+1 < width.value && td[x+1][y].marker == 0)//下方
				leftclick( x+1, y);
			if(y+1 < heigh.value && td[x][y+1].marker == 0)//右方			
				leftclick( x, y+1);
			
			if(y-1 >=0 & x-1 >=0 && td[x-1][y-1].marker == 0)//左方上方
				leftclick( x-1, y-1);
			if(y+1 < heigh.value & x-1 >=0 && td[x-1][y+1].marker == 0)//右方上方
				leftclick( x-1, y+1);
			if(y-1 >=0 & x+1 < width.value && td[x+1][y-1].marker == 0)//左方下方
				leftclick( x+1, y-1);
			if(y+1 < heigh.value & x+1 < width.value && td[x+1][y+1].marker == 0)//右方下方
				leftclick( x+1, y+1);
			
		}
	}
	if(step==0 && flag.value==0 && die==false){
		die=true;
		alert("You Win!!!");
	}
}

//滑鼠右鍵事件處理程序
function RightMouse(i,j){
	flag = document.getElementById("flag");
	if(td[i][j].marker==4 || die==true  )
		return;	
	td[i][j].marker = (td[i][j].marker+1) % 3;
	if(td[i][j].marker == 0){
		td[i][j].id.innerHTML = '<img src="images/space.jpg">';
	}else if(td[i][j].marker == 1){
		flag.value--;
		flag.innerHTML=flag.value;		
		td[i][j].id.innerHTML = '<IMG SRC="images/flag.jpg">';
	}else if(td[i][j].marker==2){
		flag.value++;
		flag.innerHTML=flag.value;
		td[i][j].id.innerHTML = '<img src="images/unnow.jpg">';
	//	td[i][j].marker=0;
	}
	if(step==0 && flag.value==0){
		die=true;
		alert("You Win!!!");
	}
}

function setBomb(total){
	for(var i=0;i<total;i++){
		var m=Math.floor(Math.random()*width.value);
		var n=Math.floor(Math.random()*heigh.value);
		if(td[m][n].bomb==0){
			td[m][n].bomb=1;
			//累計上下左右相鄰炸彈資訊量
			if(n-1 >=0)
				td[m][n-1].total++;//上方
			if(m-1 >=0)
				td[m-1][n].total++;//左方
			if(m+1 < heigh.value)
				td[m+1][n].total++;//右方			
			if(n+1 < width.value)
				td[m][n+1].total++;//下方
			if(m-1 >=0 & n-1 >=0)
				td[m-1][n-1].total++;//左方上方
			if(m+1 < heigh.value & n-1 >=0)
				td[m+1][n-1].total++;//右方上方
			if(m-1 >=0 & n+1 < width.value)
				td[m-1][n+1].total++;//左方下方
			if(m+1 < heigh.value & n+1 < width.value)
				td[m+1][n+1].total++;//右方下方
		}else{
			i--;
			continue;
		}
	}
	for(var i=0;i<heigh.value;i++){
		for(var j=0;j<width.value;j++){	
			
		}
	}
}