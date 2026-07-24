/********** ELEMENTS **********/
const elements = {
	body: document.querySelector("body"),
	// navbar: document.querySelector(".navbar"),
	clockElement: document.getElementById("clock"),
	clockWrapper: document.querySelector(".clock"),
	batteryButton: document.querySelector(".battery"),
	batteryText: document.querySelector(".battery__text"),
	batteryPopup: document.querySelector(".battery__popup"),
	batteryPopupText: document.querySelector(".battery__popup header span"),
	batteryProgress: document.querySelector(".battery__progress"),
	batteryIsChargingLogo: document.querySelector(".is-charging"),
	powerSource: document.querySelector(".power-source"),
};

// Date and time
const dateElement = document.getElementById("date");
const currentDate = new Date();
dateElement.innerHTML = currentDate.toDateString();

function digi() {
	const date = new Date();
	let hour = date.getHours();
	let minute = checkTime(date.getMinutes());

	function checkTime(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	if (hour > 12) {
		hour = hour - 12;
		if (hour === 12) {
			hour = checkTime(hour);
			elements.clockElement.innerHTML = hour + ":" + minute + " AM";
		} else {
			hour = checkTime(hour);
			elements.clockElement.innerHTML = hour + ":" + minute + " PM";
		}
	} else {
		elements.clockElement.innerHTML = hour + ":" + minute + " AM";
	}
}

function shutdown() {
    const desktop = document.getElementById("desktop");

    desktop.style.transition = "opacity 0.5s";
    desktop.style.opacity = "0";

    setTimeout(() => {
        desktop.style.display = "none";

        const screen = document.getElementById("shutdownScreen");
        const gif = document.getElementById("lockGif");

        gif.src = "./background/lock.gif?" + Date.now();
        screen.style.display = "flex";
    }, 500);
}

/********** Start Battery **********/
const calculateBattery = () => {
	let number = Math.floor(Math.random() * 100); // If there is any error, it will be the random default battery level
	let batteryIsCharging = false; // Charging status

	navigator.getBattery().then(function (battery) {
		number = battery.level * 100;

		batteryIsCharging = battery.charging;
		battery.addEventListener("chargingchange", function () {
			batteryIsCharging = battery.charging;
		});
	}).finally(() => {
		elements.batteryText.textContent = `${number}%`;
		elements.batteryProgress.style.width = `${number}%`;
		elements.batteryPopupText.textContent = `${number}%`;

		if (number <= 20) {
			elements.batteryProgress.classList.add("battery__low");
		} else if ((number > 90 && batteryIsCharging) || batteryIsCharging) {
			elements.batteryProgress.classList.add("battery__high");
			elements.batteryIsChargingLogo.classList.add("is-charging-visibel");
			elements.powerSource.textContent = "Power Adapter";
		}
	});
};

elements.batteryButton.addEventListener("click", () => {
	elements.batteryPopup.classList.toggle("opened");
	elements.batteryButton.classList.toggle("selected");
});
/********** End Battery **********/

// Call the functions
calculateBattery();
digi();
