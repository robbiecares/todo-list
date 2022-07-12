import PubSub from "pubsub-js";

new class storageManager {
    // This class handles all calls to the local storage API.


    constructor() {
        this.store = {
            set: (key, value) => localStorage[key] = JSON.stringify(value),
            get: function(key) {
                try {
                    return JSON.parse(localStorage[key])
                } 
                catch(e) {
                    if (e instanceof SyntaxError) {
                        return undefined
                    }
                }
            }
        };
        PubSub.subscribe('new_project_created', (tag, data) => {
            this.addProject(data)
        });
        window.onload = this.sendAllData
        
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
        let projects = this.store.get(data.constructor.name) || []
        
        projects = projects.concat([data])
        this.store.set(data.constructor.name, projects);
        PubSub.publish(topic, {
            'Project': this.store.get('Project')
        });
        console.log(topic)
    }


    sendAllData() {
        // send all available storage data to display after initial page load.

        const topic = 'page_loaded'        
        PubSub.publish(topic, localStorage);
        console.log(topic)
    }

}