const baseUrl = "https://toiletswebapi20221202091437.azurewebsites.net/Users"

Vue.createApp({
    data() {
        return {
            toilet: null,
            distance: 0,
            error: null
        }
    },
    async created() {
        this.getNearestToilet(baseUrl)
    },
    methods: {
        async getNearestToilet(url) {
            while(true){
                try {
                    const response = await axios.get(url)
                    this.toilet = await response.data.myToilet
                    this.distance = await response.data.myDouble
                } catch (ex) {
                    this.error = ex.message
                }
                await sleep(5000);
            }
        },
    }
}).mount("#app")

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}