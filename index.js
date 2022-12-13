const baseUrl = "https://toiletswebapi20221202091437.azurewebsites.net/Users"
const locationUrl = "https://toiletswebapi20221202091437.azurewebsites.net/Locations"

Vue.createApp({
    data() {
        return {
            toilet: null,
            distance: 0,
            direction: 0,
            directionMessage: null,
            nearToiletError: null,
            locationError: null,
            callWeatherError: null,
            location: null,
            weatherData: null,
            temp: 0,
            tempFeels: 0
        }
    },
    async created() {
        this.getNearestToilet(baseUrl)
        this.DirectionInPlainSpeak(this.direction)
        this.GetLocation(locationUrl)
        this.CallWeatherAPI()
    },
    methods: {
        async getNearestToilet(url) {
            while (true) {
                try {
                    const response = await axios.get(url)
                    this.toilet = await response.data.myToilet
                    this.distance = await response.data.myDouble
                    this.direction = await response.data.direction
                } catch (ex) {
                    this.nearToiletError = ex.message
                }
                await sleep(5000);
            }
        },
        async GetLocation(url){
            while (true) {
                try {
                    const response = await axios.get(url)
                    this.location = await response.data
                } catch (ex) {
                    this.locationError = ex.message
                }
                await sleep(5000);
            }
        },
        async DirectionInPlainSpeak(direction) {
            while (true) {
                if (direction >= -22.5 && direction < 22.5) {
                    this.directionMessage = 'Eastward'
                }
                else if (direction >= 22.5 && direction < 67.5) {
                    this.directionMessage = 'NorthEast'
                }
                else if (direction >= 67.5 && direction < 112.5) {
                    this.directionMessage = 'North'
                }
                else if (direction >= 112.5 && direction < 157.5) {
                    this.directionMessage = 'NorthWest'
                }
                else if (direction >= 157.5 && direction < 180) {
                    this.directionMessage = 'West'
                }
                else if (direction >= -180 && direction < -157.5) {
                    this.directionMessage = 'West'
                }
                else if (direction >= -157.5 && direction < -112.5) {
                    this.directionMessage = 'SouthWest'
                }
                else if (direction >= -112.5 && direction < -67.5) {
                    this.directionMessage = 'South'
                }
                else if (direction >= -67.5 && direction < -22.5) {
                    this.directionMessage = 'SouthEast'
                }
            await sleep(5000);
            }
        },
        async CallWeatherAPI(){
            while (true) {
                try {
                    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+this.location.latitude+"&lon="+this.location.longitude+"&appid=127d39d8264cec2f8f757dcefb723d0f")
                    this.weatherData = await response.data
                    this.temp = (this.weatherData.main.temp - 272.15).toFixed(1)
                    this.tempFeels = (this.weatherData.main.feels_like - 272.15).toFixed(1)
                } catch (ex) {
                    this.callWeatherError = ex.message
                }
                await sleep(5000);
            }
        },         
    }
}).mount("#app")

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}