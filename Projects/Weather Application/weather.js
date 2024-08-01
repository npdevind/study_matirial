async function getWeatherData(location = "kolkata") {
    try {
        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=81485bc4f5784fbe90274014242505&q=${location}&aqi=yes`);
        if (res.ok) {
            return await res.json();
        } else {
            showToast("Please select the correct location");
        }
    } catch (error) {
        showToast("An error occurred while fetching the data");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchLocationForm").onsubmit = async function (event) {
        event.preventDefault();
        let loc = document.getElementById("myLocation").value;
        if (loc === "") {
            showToast("Please enter location");
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
    document.getElementById("wHumidity").innerHTML = "Humidity: " + data.current.humidity + "%";
    document.getElementById("wWindmph").innerHTML = "Wind: " + data.current.wind_mph + " mph";
    document.getElementById("wCloud").innerHTML = "Cloudness: " + data.current.cloud + "%";
}



function showToast(message) {
    Toastify({
        text: message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}
    }).showToast();
}
