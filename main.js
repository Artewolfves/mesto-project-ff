(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("click",n),document.addEventListener("keydown",o)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("click",n),document.removeEventListener("keydown",o)}function n(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&t(document.querySelector(".popup_is-opened"))}function o(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"da241d74-7116-42d8-8868-fb635edca537","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function a(e,t,n,o,a,u,i,l){var s=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),d=s.querySelector(".card__delete-button"),p=s.querySelector(".card__image"),f=s.querySelector(".card__title");p.src=e,p.alt=t,f.textContent=t;var _=l.some((function(e){return e._id===a}));a===u?(s.classList.add("icon-delete"),d.addEventListener("click",(function(){(function(e){return fetch("".concat(r.baseUrl,"/cards/").concat(e),{headers:r.headers,method:"DELETE"}).then(c).catch((function(e){console.log(e)}))})(i).then((function(){n(s)})).catch((function(e){console.log(e)}))}))):d.style.display="none";var m=s.querySelector(".card__like-button");_&&m.classList.toggle("card__like-button_is-active");var y=s.querySelector(".like-count");return y.textContent=l?l.length:0,m.addEventListener("click",(function(e){return function(e,t,n){e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then(c)}(t).then((function(t){n.textContent=t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then(c)}(t).then((function(t){n.textContent=t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}(e,i,y)})),p.addEventListener("click",(function(){o(p.src,f.textContent)})),s}function u(e){e.remove()}var i=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""};function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}var s=function(e,t){e.reset();var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.value="",i(e,n,t)})),l(n,o,t)};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var p,f=document.querySelector(".places__list"),_=document.querySelector(".popup_type_image"),m=document.querySelector(".profile__edit-button"),y=document.querySelector(".popup_type_edit"),v=document.querySelector(".profile__add-button"),h=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup__form"),b=document.querySelector('[name="edit-profile"]'),g=b.querySelector(".popup__input_type_name"),q=b.querySelector(".popup__input_type_description"),L=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),k=document.querySelector('[name="new-place"]'),C=k.querySelector(".popup__input_type_card-name"),x=k.querySelector(".popup__input_type_url"),A=document.querySelector(".popup__image"),w=document.querySelector(".popup__caption"),U=document.querySelector(".profile__image-button"),T=document.querySelector(".popup_type_new-avatar"),j=document.querySelector('[name="new-avatar"]'),O=j.querySelector(".popup__input_type_url-avatar"),B=document.querySelector(".profile__image"),P=document.querySelectorAll(".popup"),D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function I(t,n){A.src=t,A.alt=n,w.textContent=n,e(_)}function M(e){var t=e.target.querySelector(".popup__button_text-loading"),n=e.target.querySelector(".popup__button_text");t.classList.toggle("popup_button_text-is-visible"),n.classList.toggle("popup_button_text-is-visible")}P.forEach((function(e){return e.classList.add("popup_is-animated")})),m.addEventListener("click",(function(){e(y),s(b,D),S.querySelector('input[name="name"]').value=L.textContent,S.querySelector('input[name="description"]').value=E.textContent})),v.addEventListener("click",(function(){C.value="",x.value="",e(h),s(k,D)})),U.addEventListener("click",(function(){O.value="",e(T),s(j,D)})),b.addEventListener("submit",(function(e){var n,o;e.preventDefault(),M(e),(n=g.value,o=q.value,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n,about:o})}).then(c)).then((function(e){var n=e.name,o=e.about;L.textContent=n,E.textContent=o,console.log(e),t(y)})).catch((function(e){console.log(e)})).finally((function(){M(e)}))})),k.addEventListener("submit",(function(e){var n,o;e.preventDefault(),M(e),(n=x.value,o=C.value,fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({link:n,name:o})}).then(c)).then((function(e){f.prepend(a(e.link,e.name,u,I,p,e.owner._id,e._id,e.likes)),console.log(e),k.reset(),t(h)})).catch((function(e){console.log(e)})).finally((function(){M(e)}))})),j.addEventListener("submit",(function(e){var n;e.preventDefault(),M(e),(n=O.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:n})}).then(c)).then((function(e){var n=e.avatar;B.style.backgroundImage="url(".concat(n,")"),console.log(e),t(T)})).catch((function(e){console.log(e)})).finally((function(){M(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);l(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.classList.add(o.errorClass),r.textContent=n}(e,t,t.validationMessage,n)}(e,r,t),l(n,o,t)}))}))}(t,e)}))}(D),Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{headers:r.headers,method:"GET"}).then(c),fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers,method:"GET"}).then(c)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1],i=r.name,l=r.about,s=r.avatar;p=r._id,L.textContent=i,E.textContent=l,B.style.backgroundImage="url(".concat(s,")"),c.forEach((function(e){f.append(a(e.link,e.name,u,I,p,e.owner._id,e._id,e.likes))}))})).catch((function(e){console.log(e)}))})();