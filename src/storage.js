import PubSub from "pubsub-js";

new class storageManager {
    // This class handles all calls to the local storage API.

    projects;

    constructor() {
        this.projects = [];
        PubSub.subscribe('new_project_created', (tag, data) => {
            this.addProject(data)
        });
    }


    storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    
    }

    addProject(data) {
        // Saves a new project object to local storage.

        const topic = 'new_project_saved'
        this.projects = this.projects.concat([data])

        localStorage.setItem(data.constructor.name, JSON.stringify(this.projects));
        PubSub.publish(topic, {
            projects: this.projects
        });
        console.log(this.projects)
        console.log(topic)
    }
}


export {}