// let id = (id) => document.getElementById("form-new-contact");
// const form =  document.getElementById("form-new-contact");

document.querySelector('#cancel-icon').addEventListener('click', (e)=>{
    let form_section = document.querySelector('#new-contact-form')
    form_section.classList.add('hide')
    form_section.removeAttribute('id');
    console.log("close form")
});

document.querySelector('#btn-new-contact').addEventListener('click', (e)=>{
    let form_section = document.querySelector('.hide')
    form_section.setAttribute('id','new-contact-form');
    document.getElementById("first-name").disabled = false;
    document.getElementById("last-name").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("tel").disabled = false;
    document.getElementById("gender_male").disabled  = false;
    document.getElementById("gender_female").disabled  = false;
    document.getElementById(`${hobby.toLowerCase()}`).disabled  = false;
    document.getElementById(`education`).disabled  = false;
    document.getElementById(`btn-submit`).disabled  = false;
    document.getElementById("age").disabled  = false;
    document.getElementById("dob").disabled  = false;
    document.getElementById("decr").disabled  = false; 
    form.reset();
    console.log("new form")
});