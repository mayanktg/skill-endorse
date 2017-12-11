export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const API_BASE_URL = 'https://skill-endorser-backend.herokuapp.com/api/v1/';

// export const setCookie = (name, value, days = 7, path = '/') => {
//   const expires = new Date(Date.now() + days * 864e5).toGMTString();
//   const cookieName = name + '=' + encodeURIComponent(value) +
//                     '; expires=' + expires + '; path=' + path +
//                     '; domain=' + window.location.hostname + ';';
//   console.log(cookieName);
//   document.cookie = cookieName;
// }

// export const deleteCookie = (name, path) => {
//   setCookie(name, '', -100, '/');
//   // location = '/';
// }

// export const readCookie = (name) => {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }
