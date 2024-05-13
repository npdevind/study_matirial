function getDate() {
  let today = new Date();

  //today
  let day = today.getDate();
  if (day.toString().length == 1) day = "0" + day;

  //today month
  let month = today.getMonth() + 1;
  if (month.toString().length == 1) month = "0" + month;

  let year = today.getFullYear();

  let hours = today.getHours();

  let mit = today.getMinutes();
  if (mit.toString().length == 1) mit = "0" + mit;

  let mitSec = today.getSeconds();
  if (mitSec.toString().length == 1) mitSec = "0" + mitSec;

  hours = hours % 12;

  let AMPM = "";
  if (hours > 12) AMPM = "AM";
  else AMPM = "PM";

  if (hours.toString().length == 1) hours = "0" + hours;

  return (
    day +
    "-" +
    month +
    "-" +
    year +
    " " +
    hours +
    ":" +
    mit +
    ":" +
    mitSec +
    " " +
    AMPM
  );
}

function startClock() {
  setInterval(function () {
    document.getElementById("demo").innerHTML = getDate();
  }, 1000);
}
