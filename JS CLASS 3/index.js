async function getWeatherData(location = "kolkata") {
    try {
        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=779549d694d64233ba082021241905&q=${location}&aqi=yes`);
        if (await res.ok) {
            return await res.json();
        } else {
            toast("Please select proper location");
        }
    } catch (error) {
        toast(error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchLocationForm").onsubmit = async function (event) {
        event.preventDefault();
        let loc = document.getElementById("myLocation").value;
        if (loc === "") {
            toast("Please enter location");
            return;
        } else {
            const data = await getWeatherData(loc);
            if (data) {
                document.getElementById("myLocation").value = "";
                setHtmlData(data);
            }
        }
    };
    getWeatherData().then((data) => {
        setHtmlData(data);
    });
});

function setHtmlData(data) {
    document.getElementById("wText").innerHTML = data.current.condition.text;
    document.getElementById("location").innerHTML = data.location.name;
    document.getElementById("wIcon").innerHTML = `<img src="${data.current.condition.icon}" alt="" srcset="">`;
    document.getElementById("wTemp").innerHTML = data.current.temp_c + "°C";
}

function toast(msg) {
    Toastify({
        text: msg,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
    }).showToast();
}
