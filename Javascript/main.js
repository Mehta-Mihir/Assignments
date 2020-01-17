var i=0;
var original=document.getElementById("duplicateRow");
var or_table=document.getElementById("p_table");
var c_table=document.getElementById("p_cart_table");
var img_src;
function addProduct()
{
  var pn=document.getElementById("pname").value;
  var pi=document.getElementById("pimg").value;
  var pd=document.getElementById("pdesc").value;
  var pq=document.getElementById("pqty").value;
  var pp=document.getElementById("pprice").value;
  var row=document.createElement("tr");
  row.id = "product" + ++i;
  var col1 = document.createElement('td');
  var col2 = document.createElement('td');
  var col3 = document.createElement('td');
  var col4 = document.createElement('td');
  var col5 = document.createElement('td');
  var col6 = document.createElement('td');
  var col7 = document.createElement('td');
  var col8 = document.createElement('td');
  col8.setAttribute("hidden",true);
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  row.appendChild(col4);
  row.appendChild(col5);
  row.appendChild(col6);
  row.appendChild(col7);
  row.appendChild(col8);
  var image=document.createElement("img")
  image.src=img_src;
  image.width=50;
  image.height=50;
  col1.append(image);
  col2.innerHTML=pn;
  col3.innerHTML=pd;
  col4.innerHTML=pp;
  col5.innerHTML=pq;
  col8.innerHTML=row.id
  or_table.appendChild(row);
  var btn1=document.createElement("button");
  //btn1.addEventListener("click",addToCart(row.id));
  btn1.onclick = function() { addToCart(row.id) };
  var text1=document.createTextNode("Add To Cart");
  var btn2=document.createElement("button");
  btn2.onclick = function() { deleteP(row.id) };
  //btn2.addEventListener("click",deleteP(row.id));
  var text2=document.createTextNode("Delete");
  btn1.appendChild(text1);
  col6.appendChild(btn1);
  btn2.appendChild(text2);
  col7.appendChild(btn2);
}

function addToCart(data1)
{
    var row=document.getElementById(data1);
    var table = document.getElementById("p_table");
    var flag=0;
    for (var j = 1 ; j < c_table.rows.length; j++) {
 
      var row = "";
  
      for (var k = 0; k < c_table.rows[j].cells.length; k++) {
  
          row = c_table.rows[j].cells[5].innerHTML;
          if(row==data1)
          {
            flag=1;
            c_table.rows[j].cells[2].innerHTML=parseInt(c_table.rows[j].cells[2].innerHTML)+1;
            c_table.rows[j].cells[3].innerHTML=parseInt(c_table.rows[j].cells[1].innerHTML) * parseInt(c_table.rows[j].cells[2].innerHTML);
            var rowIndex = document.getElementById(data1).rowIndex;
            table.rows[rowIndex].cells[4].innerHTML=parseInt(table.rows[rowIndex].cells[4].innerHTML)-1;
            break;
          }
          //console.log(row);
      }
    }
    if(flag==0)
    {
      var rowIndex = document.getElementById(data1).rowIndex;
    //console.log(table.rows[rowIndex].cells[1].innerHTML+" "+table.rows[rowIndex].cells[3].innerHTML+" "+table.rows[rowIndex].cells[4].innerHTML+" "+table.rows[rowIndex].cells[7].innerHTML);
    var row=document.createElement("tr");
    var col1 = document.createElement('td');
    var col2 = document.createElement('td');
    var col3 = document.createElement('td');
    var col4 = document.createElement('td');
    var col5 = document.createElement('td');
    var col6 = document.createElement('td');
    col6.setAttribute("hidden",true);
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);
    col1.innerHTML=table.rows[rowIndex].cells[1].innerHTML;
    col2.innerHTML=table.rows[rowIndex].cells[3].innerHTML;
    table.rows[rowIndex].cells[4].innerHTML=parseInt(table.rows[rowIndex].cells[4].innerHTML)-1;
    col3.innerHTML=1;
    col4.innerHTML=parseInt(col2.innerHTML) * parseInt(col3.innerHTML);
    col6.innerHTML=table.rows[rowIndex].cells[7].innerHTML;
    row.id="c"+col6.innerHTML;
    console.log(row.id);
    c_table.appendChild(row);
    var btn1=document.createElement("button");
    console.log(col6.innerHTML);
    //btn1.addEventListener("click",addToCart(row.id));
    btn1.onclick = function() { deleteFromCart(row.id) }
    var text1=document.createTextNode("Delete");
    btn1.appendChild(text1);
    col5.appendChild(btn1);
    }
    //console.log(table.rows[rowIndex].cells[4].innerHTML);
    if(parseInt(table.rows[rowIndex].cells[4].innerHTML)<parseInt(1))
    {
      nodeList=table.rows[rowIndex].cells[5].childNodes;
      //console.log(nodeList[0].disabled=true);
      nodeList[0].disabled=true
    }
}

function deleteP(idd)
{
    var c_table=document.getElementById("p_table");
    var rowIndex = document.getElementById(idd).rowIndex;
    //console.log(rowIndex);
    //console.log("success delete button: "+idd);
    c_table.deleteRow(rowIndex);
}

function deleteFromCart(idd)
{
    var c_table=document.getElementById("p_cart_table");
    var rowIndex = document.getElementById(idd).rowIndex;
    //console.log(rowIndex);
    //console.log("success delete button: "+idd);
    c_table.deleteRow(rowIndex);
}

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          img_src=e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
      //console.log(img_src);
  }
}