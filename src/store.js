export default {
    previousFiles: [
    ],
    addFileToStore(fileid) {
        this.previousFiles.push(fileid)
        localStorage.setItem("previousFiles", JSON.stringify(this.previousFiles))
        return this.previousFiles;
    },
    loadStore() {
        this.previousFiles = JSON.parse(localStorage.getItem("previousFiles"))
    },
    removeFileFromStore(fileid) {
        this.previousFiles = this.previousFiles.filter((file) => {
            return file != fileid
        })
        localStorage.setItem("previousFiles", JSON.stringify(this.previousFiles))
        return this.previousFiles

    }
}