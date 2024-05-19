async function getResponse() {
  const res = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=779549d694d64233ba082021241905&q=pakistan&aqi=yes"
  );
  return await res.json();
}

getResponse().then((data) => {
  console.log(data);
});
