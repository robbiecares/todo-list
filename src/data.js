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
        window.onload = this.sendAllData.bind(this)        
    }


    // store() {        
    //         return {
    //         set: (key, value) => localStorage[key] = JSON.stringify(value),
    //         get: function(key) {
    //             try {
    //                 return JSON.parse(localStorage[key])
    //             } 
    //             catch(e) {
    //                 if (e instanceof SyntaxError) {
    //                     return undefined
    //                 }
    //             }
    //         }
    //     }
    // };


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
        // Returns an object of all parsed values from local storage.

        if (!localStorage.length) {
            return;
        }
        
        const topic = 'page_loaded'
        let data = {}
        
        for (let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            data[key] = this.store.get(key);
        };

        PubSub.publish(topic, data);
        console.log(topic)
    }

}