// "use strict"
let id = (id) => document.getElementById("form-new-contact");
const form = id("form")
var otherCheckbox = document.querySelector('input[value="other"]');
var otherText = document.querySelector('#other-info-details');
var isOtherText = false;
let newContact;
const KEY = "new_contact";
let contactList = new Array();
const Contacts_container = document.querySelector('#contact-lists');

// (B1) FORM DATA OBJECT
var data = new FormData();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // (B2) APPEND FIELDS
    data.append("fName", document.getElementById("first-name").value);
    data.append("lName", document.getElementById("last-name").value);
    data.append("email", document.getElementById("email").value);
    data.append("tel", document.getElementById("tel").value);


// ======== Validating the Gender check box ====
    var check = true;
    $("input:radio").each(function(){
        var name = $(this).attr("name");
        if($("input:radio[name="+name+"]:checked").length == 0){
            check = false;
        }
    });
    validateGender(check);

    data.append("age", document.getElementById("age").value);   
    data.append("dob", document.getElementById("dob").value);   
    data.append("decr", document.getElementById("decr").value);  
    
    // ======== Getting New contact Hobbies =============
    // var hobbies = [];
    $.each($("input[name='user_interest']:checked"), function(){            
        // hobbies.push($(this).val());
        console.log(`Hobby vale: ${$(this).val()}`)
        data.append("hobbies", $(this).val());   
    });

    // Getting Other Details Texts
    if (isOtherText) {
        data.delete("otherDetails");
        data.append("otherDetails", document.getElementById("other-info-details").value); 
        isOtherText = false;
    }else{
        data.delete("otherDetails");
        // data.append("otherDetails", undefined); 
    }
  
    console.log(`Gender selected is: ${data.get("gender")}`)
    console.log(`Other Details selected is: ${data.getAll("otherDetails")}`)
    console.log(`Education selected is: ${data.get("edu")}`)
    console.log(`Hobby selected is: ${data.getAll("hobbies")}`)

    // ============ Create a new newContact object
    newContact = new NewContact(data.get("fName"),data.get("lName"),data.get("tel"),data.get("email"), data.get("gender"),data.get("decr"),data.getAll("hobbies"),data.get("edu"),data.get("age"),data.get("dob"),data.get("otherDetails"));

    addToLocalStorage(newContact);

    otherText.style.display = 'none';
    data.delete("hobbies");
    form.reset();
    displayNotes();
});

// ======== Adding New Contact into local Storage =======
function addToLocalStorage(nContact) {
    if (KEY in localStorage) {
        const contactList = JSON.parse(localStorage.getItem(KEY));
        contactList.push(nContact);
        localStorage.setItem(KEY, JSON.stringify(contactList));
        
    }else{
        contactList.push(nContact);
        localStorage.setItem(KEY, JSON.stringify(contactList));
    }
} 

// ======== Gender check Validation method ====
function validateGender(isChecked){
    let gender;
    if(isChecked){
        if(document.getElementById('gender_male').checked) {   
            gender = "male";
        }else{
            gender = "female";
        }
        data.append("gender", `${gender}`);
        return false;
    }else{
        alert('Please select a Gender.');
        return false;
    }
}

$(function() {
    displayNotes();
    // ==== Check if Other details check box was checked ========
    otherText.style.display = 'none';

    otherCheckbox.addEventListener('change', () => {
        if(otherCheckbox.checked) {
            isOtherText = true;
            otherText.style.display = 'block';
        } else {
            isOtherText = false;
            otherText.style.display = 'none';
        }
      });

    //   ========== Get Education ================
    document.getElementById('education').addEventListener('input', (ev)=>{
        let select = ev.target;
        data.append("edu", select.value); 
        console.log(select.value);
    })
})

// ===== Get All Contacts from LocalStorage ==
function getContacts() {
    let contacts;
    if (localStorage.getItem(KEY) === null) {
        contacts = [];
    } else {
        contacts = JSON.parse(localStorage.getItem(KEY));
    }
    return contacts;
}

//  ===== Display Contacts ====
function displayNotes() {
    const contactL = getContacts();
    if (contactL.length === 0) {
        const contact_div = document.createElement('div')
        contact_div.classList.add('a_contact');
        contact_div.innerHTML=`
            <h1>NO CONTACTS</h1>
        `
        Contacts_container.appendChild(contact_div);
    }else{

        console.log("DISPLAY CONTACTS")
        Contacts_container.innerHTML = "";
        contactL.forEach(contact => {
            // addNoteToList(note);
            const contact_div = document.createElement('div')
            contact_div.classList.add('a_contact');
            contact_div.innerHTML=`
                <span hidden>${contact.id}</span>
                <h2>${contact.fName}</h2>
                <p>${contact.email}</p>
                <div class="age-gender-container">
                    <p>Age: ${contact.age}18</p>
                    <p>Gender: ${contact.gender}</p>
                </div>
                <p>D.O.B: ${contact.dob}</p>
                <button class="contact__view btn">View Details</button>
                <button class="contact__delete btn">Delete</button>
            `
            Contacts_container.appendChild(contact_div);
        })
    }
}

// === Delete Contact ===
Contacts_container.addEventListener('click', (e) => {
    if (e.target.classList.contains('contact__view')) {
        console.log("VIEW button clicked")
        const currentContact = e.target.closest('.a_contact');
        currentContact.remove();
        const id = currentContact.querySelector('span').textContent;
        let form_section = document.querySelector('.hide')
        form_section.setAttribute('id','new-contact-form');
        setFormViewDetails(Number(id));
        displayNotes() 
    }
    if (e.target.classList.contains('contact__delete')) {
        const currentContact = e.target.closest('.a_contact');
        currentContact.remove();
        const id = currentContact.querySelector('span').textContent;
        removeContact(Number(id));
        console.log("dELETE button clicked")
        alert('CONTACT deleted', 'remove-message');
        displayNotes() 
    }
});
function removeContact(id) {
    const contactL = getContacts();
    contactL.forEach((conatct, index) => {
        if (conatct.id === id) {
            contactL.splice(index, 1)
        }
        localStorage.setItem(KEY, JSON.stringify(contactL));
    })
}

function setFormViewDetails(id) {
    const contactL = getContacts();
    let vContact;
    contactL.forEach((conatct, index) => {
        if (conatct.id === id) {
            vContact =  conatct;
        }
        // localStorage.setItem(KEY, JSON.stringify(contactL));
    })

    document.getElementById("first-name").value = `${vContact.fName}`;
    document.getElementById("first-name").disabled = true;
    document.getElementById("last-name").value = `${vContact.lName}`;
    document.getElementById("last-name").disabled = true;
    document.getElementById("email").value = `${vContact.email}`;
    document.getElementById("email").disabled = true;
    document.getElementById("tel").value = `${vContact.tel}`;
    document.getElementById("tel").disabled = true;
    if (vContact.gender.toUpperCase() === "FEMALE") {
        document.getElementById("gender_female").checked  = true;
        document.getElementById("gender_male").disabled  = true;
    }else{
        document.getElementById("gender_male").checked  = true;
        document.getElementById("gender_female").disabled  = true;
    }
    document.getElementById("age").value = `${vContact.age}`;   
    document.getElementById("age").disabled  = true;
    document.getElementById("dob").value = `${vContact.dob}`;   
    document.getElementById("dob").disabled  = true;
    document.getElementById("decr").value = `${vContact.decr}`; 
    document.getElementById("decr").disabled  = true; 
    var hobbies = ["Sports","Exercise","Books","Driving","Others"];
        for (const cHobby of vContact.hobbies) {
            for(hobby of hobbies){
                console.log(`checking hoobies ${hobby} and ${cHobby}`)
                if (cHobby === hobby) {
                    console.log(`checking success ${hobby}`)
                    // document.getElementById(`${hobby}`).checked  = checked;
                    document.getElementById(`${hobby.toLowerCase()}`).checked  = true;
                }else{
                    document.getElementById(`${hobby.toLowerCase()}`).disabled  = true;
                }
                // $(`${hobby.toLowerCase()}`).attr('readonly',true);
            }
        }

        console.log(`Edu : ${vContact.edu}`)
        document.getElementById("selected-opt").innerHTML = `${vContact.edu}`;
        document.getElementById(`education`).disabled  = true;
        
        if (vContact.otherDetails) {
            otherText.style.display = 'block';
            otherText.value = `${vContact.otherDetails}`;
            otherText.textContent = `${vContact.otherDetails}`;
            otherText.disabled = true
        }else{
            otherCheckbox.disabled = true
        }

        document.getElementById(`btn-submit`).disabled  = true;
}


// ====== New Contact
class NewContact{
    constructor(fName="Don", lName="Joe", tel, email, gender, decr ="none", hobbies=[], edu, age, dob, otherDetails="none"){
        this.id = Math.random();
        this.fName = fName;
        this.lName = lName;
        this.tel = tel;
        this.email = email;
        this.gender = gender;
        this.decr = decr;
        this.hobbies = hobbies;
        this.edu = edu;
        this.age = age;
        this.dob = dob;
        this.otherDetails = otherDetails;
    }
}
