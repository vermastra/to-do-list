
let temp = document.getElementById('content');
temp.addEventListener("click", function () {
    temp.value = "";
})
show();
// lisening add to text*************************
document.getElementById('add').addEventListener("click", function () {
    let vale = document.getElementsByClassName('add');

    // let content = document.createTextNode(vale[0].select);    or
    // boxzx.appendChild(content);      or
    let contentitem = localStorage.getItem('content')
    if (contentitem == null) {

        content = [];
    }
    else {
        content = JSON.parse(contentitem);
    }
    content.push(vale[0].value);
    localStorage.setItem("content", JSON.stringify(content));

    //mark as imp feature
    impcolor = JSON.parse(localStorage.getItem("bgcolor"));
    if (impcolor == null) {
        impcolor = [];
    }
    else {
        impcolor = JSON.parse(localStorage.getItem("bgcolor"));

    }
    impcolor.push("white");
    localStorage.setItem("bgcolor", JSON.stringify(impcolor));
    show();
})

function show() {
    let contentitem = localStorage.getItem("content")
    if (contentitem == null) {
        content = [];
    }
    else {
        content = JSON.parse(contentitem);
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
        html += `
                      <div class="resultbody">
                             <h1>Note</h1>
                         <div class="heading" id="color${index}">
                           

                            <textarea class="result" disabled>${element}</textarea>
                            </div>
                            <div class="buton">
                            <button class="imp" onclick="imp(${index})" id="${index}">Mark Imp</button>
                            <button class="delet" onclick="delet(${index})" id="${index}">Delete</button>
                            </div>
                            </div>`;

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
        color.style.backgroundColor = element;
    });


}

function delet(id) {
    let content = localStorage.getItem("content");
    let impcolor = localStorage.getItem("bgcolor");
    let to_del = JSON.parse(content);
    let to_del_color = JSON.parse(impcolor);
    to_del.splice(id, 1);
    to_del_color.splice(id, 1);
    localStorage.setItem("content", JSON.stringify(to_del));
    localStorage.setItem("bgcolor", JSON.stringify(to_del_color));
    show();
    console.log(id);
}

function imp(id) {
    let impcolor = JSON.parse(localStorage.getItem("bgcolor"));
    let color = document.getElementById(`color${id}`);
    if (impcolor[id] == "white") {
        impcolor[id] = "red";
        localStorage.setItem("bgcolor", JSON.stringify(impcolor));
    }
    else {
        impcolor[id] = "white";
        localStorage.setItem("bgcolor", JSON.stringify(impcolor));
    }
    show();
}

