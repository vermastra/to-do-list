
let temp1 = document.getElementById('content');
let temp2 = document.getElementById('heading');
temp1.addEventListener("click", function () {
    temp1.value = "";
})
temp2.addEventListener("click", function () {
    temp2.value = "";
})
show();
// lisening add to text*************************
document.getElementById('add').addEventListener("click", function () {
    let vale = document.getElementsByClassName('add');

    // let content = document.createTextNode(vale[0].select);    or
    // boxzx.appendChild(content);      or
    let contentitem = localStorage.getItem('content')
    let headingitem = localStorage.getItem('heading')
    if (headingitem == null) {

        content = [];
        heading=[];
       
    }
    else {
        content = JSON.parse(contentitem);
        heading = JSON.parse(headingitem);
    }
    if(vale[0].value==""){
        vale[0].value="Note";
    }
    if(vale[1].value!=""){
    heading.push(vale[0].value);
    content.push(vale[1].value);
    localStorage.setItem("content", JSON.stringify(content));
    localStorage.setItem("heading", JSON.stringify(heading));

    //mark as imp feature
    impcolor = JSON.parse(localStorage.getItem("bgcolor"));
    if (impcolor == null) {
        impcolor = [];
    }
    else {
        impcolor = JSON.parse(localStorage.getItem("bgcolor"));

    }
    impcolor.push("rgb(231, 241 ,255)");
    localStorage.setItem("bgcolor", JSON.stringify(impcolor));
    }
    show();
})

function show() {
    let contentitem = localStorage.getItem("content")
    let headingitem = localStorage.getItem("heading")
    if (headingitem == null) {
        content = [];
        heading = [];
        
    }
    else {
        content = JSON.parse(contentitem);
        heading = JSON.parse(headingitem);
    }

    impcolor = JSON.parse(localStorage.getItem("bgcolor"));
    if (impcolor == null) {
        impcolor = [];
    }
    else {
        impcolor = JSON.parse(localStorage.getItem("bgcolor"));
    }

    let html = "";
    content.forEach((element, index) => {              //or for each impcolor-the thing is same
        // html += `
        //               <div class="resultbody">
        //                      <h1>${heading[index]}</h1>
        //                  <div class="heading" id="color${index}">
                           

        //                     <textarea class="result" disabled>${element}</textarea>
        //                     </div>
        //                     <div class="buton">
        //                     <button class="imp" onclick="imp(${index})" id="${index}">Mark Imp</button>
        //                     <button class="delet" onclick="delet(${index})" id="${index}">Delete</button>
        //                     </div>
        //                     </div>`;
        html+=`<div class="accordion " id="accordionPanelsStayOpenExample">
        <div  class="accordion-item" style="border-radius:7px;">
          <h2 class="accordion-header" id="panelsStayOpen-heading${index} " >
            <div class="button-body bg-change" id="button-body${index}" >
                <button id="color${index}" onclick="bgcolchange(${index})" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${index}">
                    ${heading[index]}
                </button>
                <button style="margin-right: 3px;" class="imp" onclick="imp(${index})" id="${index}">Mark Imp</button>
                <button class="delet" onclick="delet(${index})" id="${index}">Delete</button>
            </div>
          </h2>
          <div style="position: relative;top:3px;"id="panelsStayOpen-collapse${index}" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-heading${index}">
            <textarea readonly style="width: 100%;outline:none; " class="accordion-body">
            ${element.trim()}
            </textarea>
          </div>
        </div>`
        
    });


    let card = document.getElementById('child');
    if (content.length != 0) {
        card.innerHTML = html;
    }
    else {
        card.innerHTML = `<h1>Nothing to Show</h1>`;
    }
    impcolor.forEach((element, index) => {
        let color = document.getElementById(`color${index}`);
        color.style.background = element;
    });


}

function delet(id) {
    let content = localStorage.getItem("content");
    let heading = localStorage.getItem("heading");
    let impcolor = localStorage.getItem("bgcolor");
    let to_del = JSON.parse(content);
    let to_del_heading = JSON.parse(heading);
    let to_del_color = JSON.parse(impcolor);
    to_del.splice(id, 1);
    to_del_heading.splice(id, 1);
    to_del_color.splice(id, 1);
    localStorage.setItem("content", JSON.stringify(to_del));
    localStorage.setItem("heading", JSON.stringify(to_del_heading));
    localStorage.setItem("bgcolor", JSON.stringify(to_del_color));
    show();
    console.log(id);
}

function imp(id) {
    let impcolor = JSON.parse(localStorage.getItem("bgcolor"));
    let color = document.getElementById(`color${id}`);
    if (impcolor[id] == "rgb(231, 241 ,255)") {
        impcolor[id] = "linear-gradient(90deg,#ff3333,rgb(231, 241 ,255),rgb(231, 241 ,255))";
        localStorage.setItem("bgcolor", JSON.stringify(impcolor));
    }
    else {
        impcolor[id] = "rgb(231, 241 ,255)";
        localStorage.setItem("bgcolor", JSON.stringify(impcolor));
    }
    show();
}
function bgcolchange(id){
    document.getElementById(`button-body${id}`).classList.toggle("bg-change");
}

