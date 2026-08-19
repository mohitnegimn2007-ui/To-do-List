let addBtn=document.querySelector(".addBtn");
let list=document.querySelector(".list");
let inp=document.querySelector("input");

let API=`https://6a81a92a400f94b23c6f90c1.mockapi.io/tasks/todo`;
addBtn.addEventListener('click',postData);
async function fetchData(){
    let response=await fetch(API);
    let obj= await response.json();
    console.log(obj);
    if(obj){
        list.innerHTML='';
    }
     obj.forEach(element => {
         let div=document.createElement("div");
         div.className="task";
         div.innerHTML=`
             <div id="taskText">${element.task}</div>
             <input id="taskinp" type="text" placeholder="Enter new task" style="color:black">
            <div>
            <button id="delbtn" >Delete</button>
            <button id="editbtn">Edit</button>
            <button id="savebtn">Save</button>
            </div>`;
         let delbtn=div.querySelector("#delbtn");
         delbtn.addEventListener('click',function(){
            deleteData(element.id);
         })
         list.append(div);
         let editbtn=div.querySelector("#editbtn");
         let savebtn=div.querySelector("#savebtn");
         let taskinp=div.querySelector("#taskinp");
         let taskText=div.querySelector("#taskText");
         savebtn.style.display="none";
         taskinp.style.display="none";
         editbtn.addEventListener('click',function(){
            taskText.style.display="none";
            taskinp.style.display="initial";
            editbtn.style.display="none";
            savebtn.style.display="initial";
         });
         savebtn.addEventListener('click',function(){
            editData(element.id,taskinp.value);
         });
     });
}


async function postData(){
     let objData={
        task:inp.value
     }

    let response= await fetch(API,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(objData)
    });
    // let obj= await response.json();
    // let div=document.createElement("div");
    // div.className="task";
    // div.innerHTML=`
    //     ${obj.task}
    //     <button>Edit</button>
    //     <button>Delete</button>
    // `
    // list.append(div);
    if(response.status===201){
        fetchData();
    }
    inp.value='';
}

async function deleteData(id){
    let response= await fetch(`${API}/${id}`,{
        method:'DELETE'
    });
    if(response.status===200){
        fetchData();
    }

}

fetchData();

async function editData(id,value){
    let response= await fetch(`${API}/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
        },
         body: JSON.stringify({
         task:value
          })
    })
    console.log(response);
    if(response.status===200){
        fetchData();
    }
}




