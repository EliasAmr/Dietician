

async function loadIntroTable(url,table){
/* URL is for products.json and table tag */
const tableBody=document.querySelector('tbody')
const tableHead=document.querySelector('thead')

const response = await fetch(url);
const data = await response.json();
//console.log(data);

tableHead.innerHTML= "<tr></tr>"
tableBody.innerHTML="";

 const headers= data[0];
 const headersKeys=Object.keys(headers);
 

 for (const headersKey of headersKeys) {

    const headerElement = document.createElement("th");
    headerElement.setAttribute('scope','col');

    headerElement.textContent = headersKey;
    tableHead.querySelector('tr').appendChild(headerElement);
    
 }


 for (const object of data) {
    const rowElement=document.createElement("tr");
    const values=Object.values(object);
    for (const objectValue of values) {
        const cellElement=document.createElement("td");
        cellElement.textContent=objectValue;
        rowElement.appendChild(cellElement);
        
    }

    tableBody.appendChild(rowElement);

    

    
 }



}

loadIntroTable("products.json",document.querySelector('table'));

const myForm = document.getElementById("myForm");
const inpFile=document.getElementById("inpFile");
    

    myForm.addEventListener("submit", e => {
      e.preventDefault();
      
      const endpoint="storeFile.php";
      const formData = new FormData();

      formData.append("inpFile",inpFile.files[0]);
      console.log(formData);

      fetch(endpoint,{
         method: "post",
         body: formData,
        


      });




    });

async function CLog (url){

const response = await fetch(url);

const data = await response.json()  ;


}

CLog('fetch-test.php');

const EditText=document.getElementById('EditText');

const select=document.getElementById('select');

select.addEventListener('change', e=> {
callvalue(select.value);

});

EditText.addEventListener('input',e => {
const Text=EditText.textContent;
window.localStorage.setItem('input',Text);

fetch ('InsertText.php', {
 
 body: JSON.stringify({query: select.value,val: Text}),
method: "post",
headers: {
   "Conent-Type": "application/json"
}
});

});

async function callvalue(value) {
const show_value =await fetch ('get_select.php'); 
const user_pull=await show_value.json();
switch (value) {
case 'email':
EditText.textContent=user_pull.email;
break;
case 'First_Name':
EditText.textContent=user_pull.First_Name;
break;
case 'Family_Name':
EditText.textContent=user_pull.Family_Name;
break;
}
}

const table=document.querySelector('table');
table.addEventListener('click', e=> {
   

const current = e.target.textContent;
const cell_index=e.target.cell_index;
const head=table.tHead.children.item(0).children.item(cell_index).textContent;

e.target.setAttribute('contenteditable','true');

e.target.addEventListener('input', e => {
console.log(e.target.textContent);
window.localStorage.setItem('col',head);
window.localStorage.setItem('value',current);
window.localStorage.setItem('new_value',e.target.textContent);



});



});


table.addEventListener('focusout', e => {

   console.log(e.target.textContent);

});


async function LoadAvailableTimeSlots (url) {
const SlotsMenu=document.getElementById('Available Slots');

const Fetch_Available_Slots=await fetch(url);
const Available_Slots= await Fetch_Available_Slots.json();
for (const object of Available_Slots) {
const option=document.createElement('option');
option.textContent=object.Start_Time+" to "+object.End_Time;
SlotsMenu.appendChild(option);
   
}



}

LoadAvailableTimeSlots('Reservation_External.php');


document.addEventListener('DOMContentLoaded', function() {
   const calendarEl = document.getElementById('calendar')
   const calendar = new FullCalendar.Calendar(calendarEl, {
      displayEventTime: 'true',
      displayEventEnd: 'true',
      eventClick: function(info){
      console.log(info);
      window.localStorage.setItem("username",info.event._def.title);
      const Start = info.event._instance.range.start
      const End = info.event._instance.range.end
      const type=info.event._def.extendedProps.type
      console.log(type)
         const Start_String=toHTMLTimeStringFormat(Start)
         
         const End_String=toHTMLTimeStringFormat(End)

         function toHTMLTimeStringFormat (date) {
            const hh = (date.getHours()+ Start.getTimezoneOffset()/60).toString().padStart(2,"0")
            const mm = date.getMinutes().toString().padStart(2,"0")
            const ss = date.getSeconds().toString().padStart(2,"0")
            const HTMLTimeString=`${hh}:${mm}:${ss}`
            return HTMLTimeString
         }

   

      window.localStorage.setItem("Date",Start.getFullYear()+"-"+(Start.getMonth()+1).toString().padStart(2,"0")+"-"+Start.getDate().toString().padStart(2,0));
      
      window.localStorage.setItem("Start_Time",Start_String);
      console.log(window.localStorage.getItem("Start_Time"))
      window.localStorage.setItem("End_Time",End_String);
      console.log(window.localStorage.getItem('End_Time'))
      document.getElementById('change').innerHTML="<div></div>"
      document.getElementById('change').focus();
      function Create(key,id,type){
         const a = document.createElement('input');
         
         a.setAttribute('id',id)
         a.setAttribute('type',type)
         a.value=key
         a.textContent=key
         document.getElementById('change').appendChild(a)
         document.getElementById('change').appendChild(document.createElement('br'))
         document.getElementById(id).addEventListener("click", e=> {
            e.target.setAttribute('contenteditable','true')
            window.localStorage.setItem('col',e.target.id);
            e.target.addEventListener('input', e => {
               console.log(e);
               window.localStorage.setItem('newValue',e.target.value);
               
              
          })
         
         })
         
         document.getElementById(id).addEventListener("focusout", e=>{
            fetch ('Update_Reservation.php', {
               body: JSON.stringify({"col": e.target.id,"Old_Value":window.localStorage.getItem(e.target.id),"New_Value":window.localStorage.getItem('newValue'),"username":window.localStorage.getItem('username') }),
               method: "post",
               headers: {
                  "Conent-Type": "application/json"
               }
               
               
               })
             
         })
         
      }
      Create(window.localStorage.getItem("Date"),"Date","date")
      Create(window.localStorage.getItem("Start_Time"),"Start_Time","time")
      Create(window.localStorage.getItem("End_Time"),"End_Time","time")
      Create(type,"type","text")
   
     
      
      
   
      },
     events: 'myfeed.php'
     
   })
   document.getElementById('change').addEventListener('focusout',e=>{
      console.log(e)
      if (document.getElementById('change').contains(e.relatedTarget)) {
      } else{ 
      document.getElementById('change').innerHTML="<div></div>"
      calendar.render()
      }
   })
   

    calendar.render()
   
    

 })

 const ReservationF = document.getElementById("Schedule")
 
 ReservationF.addEventListener("submit" , e => {
   e.preventDefault()
   const ReservationFormData = new FormData(ReservationF)
   ReservationFormData.append("type","First Time")
   fetch('ReservationF.php',
   {
      body : ReservationFormData,
      method : "post"
   }
   )

 })


 

 

