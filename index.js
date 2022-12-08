const baseUrl = "https://toiletswebapi20221202091437.azurewebsites.net/Users"

Vue.createApp({
    data() {
        return {
            toilet: null,
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
                    this.toilet = await response.data
                } catch (ex) {
                    this.error = ex.message
                }
                await sleep(5000);
            }
        },
    }
}).mount("#app")