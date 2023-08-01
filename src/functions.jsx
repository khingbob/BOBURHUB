export const id = (idtxt) => document.getElementById(idtxt);
export const cssId = (idtxt, style) =>
  parseInt(window.getComputedStyle(id(idtxt)).getPropertyValue(style));
export const clas = (classtxt) => document.getElementsByClassName(classtxt);
