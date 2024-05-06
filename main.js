(()=>{"use strict";function e(e){e.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("keydown",n),e.addEventListener("click",r)}function t(){var e=document.querySelector(".popup_is-opened");e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("click",r)}function n(e){document.querySelector(".popup_is-opened"),"Escape"===e.key&&t()}function r(e){e.target===e.currentTarget&&t(e.target)}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"da241d74-7116-42d8-8868-fb635edca537","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function a(e,t,n,r,a,u,i,l,s){var d=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),p=d.querySelector(".card__delete-button"),f=d.querySelector(".card__image"),_=d.querySelector(".card__title");f.src=e,f.alt=t,_.textContent=t,a===u?(p.style.display="inline-block",p.addEventListener("click",(function(){return n(d)})),p.addEventListener("click",(function(){return function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{headers:o.headers,method:"DELETE"}).then(c).catch((function(e){console.log(e)}))}(i)}))):p.style.display="none";var m=d.querySelector(".card__like-button");s&&m.classList.toggle("card__like-button_is-active");var y=d.querySelector(".like-count");return y.textContent=l?l.length:0,m.addEventListener("click",(function(e){return function(e,t,n){e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then(c)}(t).then((function(t){n.textContent=t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then(c)}(t).then((function(t){n.textContent=t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}(e,i,y)})),f.addEventListener("click",(function(){r(f.src,_.textContent)})),d}function u(e){e.remove()}var i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},l=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(i.inputErrorClass),n.classList.remove(i.errorClass),n.textContent=""};function s(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(i.inactiveButtonClass)):(t.disabled=!0,t.classList.add(i.inactiveButtonClass))}var d=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){n.value="",l(e,n,t.inputErrorClass)}))};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f,_,m,y,v=document.querySelector(".places__list"),h=document.querySelector(".popup_type_image"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".popup_type_edit"),g=document.querySelectorAll(".popup__close"),q=document.querySelector(".profile__add-button"),C=document.querySelector(".popup_type_new-card"),E=document.querySelector(".popup__form"),k=document.querySelector('[name="edit-profile"]'),L=k.querySelector(".popup__input_type_name"),x=k.querySelector(".popup__input_type_description"),A=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),T=document.querySelector('[name="new-place"]'),U=T.querySelector(".popup__input_type_card-name"),j=T.querySelector(".popup__input_type_url"),O=document.querySelector(".popup__image"),D=document.querySelector(".popup__caption"),P=document.querySelector(".profile__image-button"),B=document.querySelector(".popup_type_new-avatar"),I=document.querySelector('[name="new-avatar"]'),M=I.querySelector(".popup__input_type_url-avatar"),N=k.querySelector(".popup__button"),J=T.querySelector(".popup__button"),G=I.querySelector(".popup__button");function H(t,n){O.src=t,O.alt=n,D.textContent=n,e(h)}function V(e){e?(N.textContent="Сохранение...",J.textContent="Сохранение...",G.textContent="Сохранение..."):(N.textContent="Сохранить",J.textContent="Сохранить",G.textContent="Сохранить")}S.addEventListener("click",(function(){e(b),d(k,i),E.querySelector('input[name="name"]').value=A.textContent,E.querySelector('input[name="description"]').value=w.textContent})),q.addEventListener("click",(function(){e(C),d(T,i)})),P.addEventListener("click",(function(){e(B),d(I,i)})),g.forEach((function(e){return e.addEventListener("click",t)})),k.addEventListener("submit",(function(e){var n,r;(function(e){e.preventDefault();var n=L.value,r=x.value;A.textContent=n,w.textContent=r,t()})(e),V(!0),(n=L.value,r=x.value,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:n,about:r})}).then(c)).then((function(e){var t=e.name,n=e.about;A.textContent=t,w.textContent=n,console.log(e)})).catch((function(e){console.log(e)})).finally((function(){V(!1)}))})),T.addEventListener("submit",(function(e){var n,r;V(!0),(n=j.value,r=U.value,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({link:n,name:r})}).then(c)).then((function(e){var t=e.name,n=e.link;j.value=n,U.value=t,_=e.owner._id,v.prepend(a(e.link,e.name,u,H,f,_,m,y.lenght,void 0)),console.log(e)})).catch((function(e){console.log(e)})).finally((function(){V(!1)})),function(e){e.preventDefault(),T.reset(),t()}(e)})),I.addEventListener("submit",(function(e){var n;(function(e,n){e.preventDefault();M.src=undefined,t()})(e),V(!0),(n=M.value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:n})}).then(c)).then((function(e){var t=e.avatar;document.querySelector(".profile__image").style.backgroundImage="url(".concat(t,")"),console.log(e)})).catch((function(e){console.log(e)})).finally((function(){V(!1)}))})),Array.from(document.querySelectorAll(i.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(i.inputSelector)),n=e.querySelector(i.submitButtonSelector);s(t,n),t.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(i.inputErrorClass),r.textContent=n,r.classList.add(i.errorClass)}(e,t,t.validationMessage)})(e,r),s(t,n)}))}))}(e)})),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers,method:"GET"}).then(c),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers,method:"GET"}).then(c)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1],i=o.name,l=o.about,s=o.avatar;f=o._id,A.textContent=i,w.textContent=l,document.querySelector(".profile__image").style.backgroundImage="url(".concat(s,")"),c.forEach((function(e){_=e.owner._id,m=e._id,y=e.likes;var t=e.likes.some((function(e){return e._id===f}));v.append(a(e.link,e.name,u,H,f,_,m,y,t))}))})).catch((function(e){console.log(e)}))})();