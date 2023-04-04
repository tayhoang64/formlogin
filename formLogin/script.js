var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
// disableScroll()



const login = document.querySelector('#login');
 login.onclick = function(){
    window.location('/workSpace')
}
function Validator(data) {
    const getForm = document.querySelector(data.form);
    const getFormGroup = getForm.querySelectorAll('.form-group');
    
    if(getFormGroup){
        data.rules.forEach((rule) => {
            var inputElement = getForm.querySelector(rule.selector);
            if(inputElement){
                inputElement.onblur = function (){
                    validate(inputElement, rule)
                }
            }
        })
    }
}

function validate(inputElement, rule){
    var errorMsg = rule.test(inputElement.value);
    var getParent = inputElement.parentElement;
    var getErrorSpan = getParent.querySelector('.error');
    if(errorMsg!=undefined){
        getErrorSpan.innerText = errorMsg;
    } else getErrorSpan.innerText = '';
}

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập vào trường này';
        }
    }
}

Validator.isEmail = function(selector) {
    return  {
        selector: selector,
        test: function(value){
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)? undefined : 'Vui lòng nhập đúng định dạng email';
        }
    }
}

Validator.checkPassword = function(selector, length){
    return {
        selector: selector,
        test: function(value){
            return value.length >= length? undefined : `Mật khẩu cần tối thiểu ${length} ký tự`;
        }
    }
}

Validator.comfirmPasword = function(password, selector){
    return {
        selector: selector,
        test: function(value){
            var getPassword = document.querySelector(password).value;
            return value === getPassword? undefined : 'Mật khẩu phải trùng nhau';
        }
    }
}
const thongBao = document.querySelector("#alert")
thongBao.onclick = function(){
    alert("Bạn đã đăng kí thành công!")
}