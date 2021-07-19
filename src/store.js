import api from "./api"
api.defaults.headers.common["authorization"] = localStorage.getItem("token")
export default {
    previousFiles: JSON.parse(localStorage.getItem("previousFiles")) || [],
    token: localStorage.getItem("token"),
    addFileToStore(fileid) {
        this.previousFiles.push(fileid)
        localStorage.setItem("previousFiles", JSON.stringify(this.previousFiles))
    },
    removeFileFromStore(fileid) {
        this.previousFiles = this.previousFiles.filter((file) => {
            return file != fileid
        })
        localStorage.setItem("previousFiles", JSON.stringify(this.previousFiles))
    },
    setToken(token) {
        localStorage.setItem("token", token)
        this.token = token
        api.defaults.headers.common["authorization"] = token
    }
}