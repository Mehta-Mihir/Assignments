var i=0;
var original=document.getElementById("duplicateRow");
var or_table=document.getElementById("p_table");
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
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  row.appendChild(col4);
  row.appendChild(col5);
  row.appendChild(col6);
  row.appendChild(col7);
  col2.innerHTML=pn;
  col3.innerHTML=pd;
  col4.innerHTML=pp;
  col5.innerHTML=pq;
  or_table.appendChild(row);
  var btn1=document.createElement("button");
  //btn1.addEventListener("click",addToCart(row.id));
  btn1.onclick = function() { addToCart(row.id) }
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
    //console.log("success add to cart button: "+data1);
    var row=document.getElementById(data1);
    //console.log(row);
    var table = document.getElementById("p_table");
    var rowIndex = document.getElementById(data1).rowIndex;
    //console.log(rowIndex);
    console.log(table.rows[rowIndex].cells[1].innerHTML+" "+table.rows[rowIndex].cells[3].innerHTML+" "+table.rows[rowIndex].cells[4].innerHTML);
    
}

function deleteP(idd)
{
    console.log("success delete button: "+idd);
}