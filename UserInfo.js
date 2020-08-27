class UserInfo {
    constructor(userInfoName, userInfoJob, name, job) {
        this.userInfoName = userInfoName;
        this.userInfoJob = userInfoJob;
        this.name = name;
        this.job = job;
    };

    setUserInfo(name, job) {
        this.name = name;
        this.job = job;
    }

    updateUserInfo() {
        this.userInfoName.textContent = this.name;
        this.userInfoJob.textContent = this.job;
     }

}