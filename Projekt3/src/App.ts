export default class App {
  apiKey: string = "a3cff8fbc7a3b9c43f22c262d2cac494";
  storageElement: number = 0;

  constructor() {
    this.storageLoop();
    this.addCity();
  }
  addCity() {
    const clickAddButton = <HTMLInputElement>(
      document.getElementById("mainButton")
    );
    clickAddButton.addEventListener("click", (ev: Event) => this.getCityName());
  }

  getCityName() {
    const input = <HTMLInputElement>document.getElementById("mainInput");
    const city = input.value;
    this.getCityWeather(city);
  }

  async getCityInfo(city: string) {
    const weather = await this.getWeather(city);
    this.saveData(weather);
  }

  async getWeather(city: string): Promise<any> {
    const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}`;
    const weatherResponse = await fetch(openWeatherUrl);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    return weatherData;
  }

  async getCityWeather(city: string) {
    const weather = await this.getWeather(city);

    const name = weather.name;
    const temp = Math.round(weather.main.temp - 273.15).toString();
    const sky = weather.weather[0].main;
    const pressure = weather.main.pressure;
    const humidity = weather.main.humidity;

    const mainDiv = document.createElement("div");
    mainDiv.className = "mainDiv";
    mainDiv.setAttribute("id", "mainDivId" + this.storageElement);

    const span = document.createElement("span");
    span.textContent = name;
    span.className = "span";

    const tempP = document.createElement("p");
    tempP.textContent = "Temperatura: " + temp + " C";
    tempP.className = "tempP";

    const skyP = document.createElement("p");
    skyP.textContent = "Niebo: " + sky;
    skyP.className = "skyP";

    const pressureP = document.createElement("p");
    pressureP.textContent = "Ciśnienie: " + pressure + " hPa";
    pressureP.className = "pressureP";

    const humidityP = document.createElement("p");
    humidityP.textContent = "Wilgotność: " + humidity;
    humidityP.className = "humidityP";

    const push = document.getElementById("container");
    push.appendChild(mainDiv);
    mainDiv.appendChild(span);
    mainDiv.appendChild(tempP);
    mainDiv.appendChild(skyP);
    mainDiv.appendChild(pressureP);
    mainDiv.appendChild(humidityP);

    const input = <HTMLInputElement>document.getElementById("mainInput");
    input.value = "";
    this.saveData(weather);
  }
  storageLoop() {
    const table = localStorage.length;
    for (let i = 1; i < table; i++) {
      let nazwa;
      nazwa = localStorage.getItem("weatherData" + i);
      this.getCityWeatherFromStorage(nazwa);
    }
  }
  async getCityWeatherFromStorage(nazwa: any) {
    const weather = await this.getWeather(nazwa.name);

    const name = weather.name;
    const temp = Math.round(weather.main.temp - 273.15).toString();
    const sky = weather.weather[0].main;
    const pressure = weather.main.pressure;
    const humidity = weather.main.humidity;

    const mainDiv = document.createElement("div");
    mainDiv.className = "mainDiv";
    mainDiv.setAttribute("id", "mainDivId" + this.storageElement);

    const span = document.createElement("span");
    span.textContent = name;
    span.className = "span";

    const tempP = document.createElement("p");
    tempP.textContent = "Temperatura: " + temp + " C";
    tempP.className = "tempP";

    const skyP = document.createElement("p");
    skyP.textContent = "Niebo: " + sky;
    skyP.className = "skyP";

    const pressureP = document.createElement("p");
    pressureP.textContent = "Ciśnienie: " + pressure + " hPa";
    pressureP.className = "pressureP";

    const humidityP = document.createElement("p");
    humidityP.textContent = "Wilgotność: " + humidity;
    humidityP.className = "humidityP";

    const input = <HTMLInputElement>document.getElementById("mainInput");
    input.value = "";
    this.saveData(weather);
  }

  saveData(data: any) {
    this.storageElement++;
    localStorage.setItem(
      "weatherData" + this.storageElement,
      JSON.stringify(data)
    );
  }
  getData() {
    const data = localStorage.getItem("weatherData");
    if (data) {
      return JSON.parse(data);
    } else {
      return {};
    }
  }
}
