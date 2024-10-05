const formEl = document.querySelector('form');
const emailFld = document.querySelector("input[name='email']");
const passwordFld = document.querySelector("input[name='password']");
const repasswordFld = document.querySelector("input[name='repassword']");
const fullnameFld = document.querySelector("input[name='fullname']");
const merchantFld = document.querySelector("input[name='merchant']");
const formFld = document.querySelectorAll(".form-field");
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

let isSubmit = true;

const canSubmit = (data) => {
    console.log(data);
}
//Validators
const checkReport = (el, condition) =>{
    if(condition){
        isSubmit =true;
        el.parentElement.classList.remove('form-field-error');
    }else{
        isSubmit=false;
        el.parentElement.classList.add('form-field-error');
    }
}
emailFld.addEventListener('keyup',function(evt){
    evt.preventDefault();
    checkReport(this, evt.target.reportValidity());
})
passwordFld.addEventListener('keyup',function(evt){
    evt.preventDefault();
    checkReport(this,passwordRegEx.test(evt.target.value));
})
repasswordFld.addEventListener('keyup', function(evt){
    evt.preventDefault();
    checkReport(this,passwordFld.value === evt.target.value)
})
fullnameFld.addEventListener('keyup',function(evt){
    evt.preventDefault();
    evt.target.value = evt.target.value.trimLeft();
    checkReport(this, evt.target.reportValidity());
})
//form data
formEl.addEventListener('submit',function(evt){
    evt.preventDefault();
    const formValues = [...evt.target.elements].filter(el => el.type !== 'submit' && el).map(el => {
        return {
            name: el.getAttribute('name'),  //el.name works
            type: el.type,
            value: el.type === 'checkbox' ? el.checked : el.value,
        };
    });
    const isFilled = formValues.filter(el => el.type !== 'checkbox').every(el=>el.value !== '');
    return isFilled && isSubmit && canSubmit(formValues);
});