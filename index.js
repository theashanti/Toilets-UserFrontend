const baseUrl = "https://toiletswebapi20221202091437.azurewebsites.net/Users"

Vue.createApp({
    data() {
        return {
            toilet: null,
            distance: 0,
            direction: 0,
            directionMessage: null,
            error: null
        }
    },
    async created() {
        this.getNearestToilet(baseUrl)
        this.DirectionInPlainSpeak(this.direction)

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
                    this.error = ex.message
                }
                await sleep(5000);
            }
        },
        async DirectionInPlainSpeak(direction) {
            while (true) {
                if (direction >= -22.5 && direction < 22.5) {
                    this.directionMessage = 'Toilet is Eastward'
                }
                else if (direction >= 22.5 && direction < 67.5) {
                    this.directionMessage = 'Toilet is NorthEast'
                }
                else if (direction >= 67.5 && direction < 112.5) {
                    this.directionMessage = 'Toilet is North'
                }
                else if (direction >= 112.5 && direction < 157.5) {
                    this.directionMessage = 'Toilet is NorthWest'
                }
                else if (direction >= 157.5 && direction < 180) {
                    this.directionMessage = 'Toilet is West'
                }
                else if (direction >= -180 && direction < -157.5) {
                    this.directionMessage = 'Toilet is West'
                }
                else if (direction >= -157.5 && direction < -112.5) {
                    this.directionMessage = 'Toilet is SouthWest'
                }
                else if (direction >= -112.5 && direction < -67.5) {
                    this.directionMessage = 'Toilet is South'
                }
                else if (direction >= -67.5 && direction < -22.5) {
                    this.directionMessage = 'Toilet is SouthEast'
                }
            await sleep(5000);
            }

        },
    }
}).mount("#app")

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}