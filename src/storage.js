class storageManager {
    // This class handles all calls to the local storage API.

    constructor() {
        PubSub.subscribe('new_project_created', (tag, data) => {
            console.log(data)
            console.log(localStorage)
            localStorage.setItem('potato', data.name)
            console.log(localStorage)
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


    save(key, value) {

        if (storageAvailable('localStorage')) {
            // Yippee! We can use localStorage awesomeness
                
            // access any existing data 
            let data = localStorage.getItem(key)
        }

    }


    getProjectNames() {
        // Returns a list of projects names.
        let projects = JSON.parse(localStorage.getItem('projects'))
        return projects ? projects.map(project => project.name) : null
    }
}

function getProjectNames() {
    // Returns a list of projects names.
    const projects = JSON.parse(localStorage.getItem('projects'))
    return projects ? projects.map(project => project.name) : null
};


export {storageManager, getProjectNames}