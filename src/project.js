import * as storage from './storage';
import PubSub from 'pubsub-js'


// this module will contain a project class.
// The project class should contain:
    
    // name
    // a list of to-do instances

class Project {
    constructor(name) {
        this.name = name || prompt('Enter Name:')   
        // this.save()
        PubSub.publish('new_project_created', this);
    }

    save() {
        // Validates that a project with the same name does not exist before adding the project object to local storage.
        
        
        console.log('saved')
        
        // // check existing storage for 'projects'
        // let data = JSON.parse(localStorage.getItem('projects'))
        
        // if (!data) {
        //     localStorage.setItem('projects', JSON.stringify([this]))
        //     return;
        // }

        // // verifies the no project with the same name exists
        // if (data.filter(project => project.name === this.name).length === 0) {
        //     data.push(this)
        //     localStorage.setItem('projects', JSON.stringify(data))
        // }
        
        // this.updateProjectList()

    }

    updateProjectList() {
        const element = document.getElementById('project-list')
        element.textContent = storage.storageManager.getProjectNames()
    }
    
}


class projectManager {
    // This class should subscribe to any changes to a product object and push the notification to other relevant object managers.
    // (e.g. upon receiving a notification of new project creation) this manager should:
        // add the project to local storage
        // update the project list DOM element (maybe this could be handled by a storage manager)
        // create a new project element in the work-area of the display 
    
    mySubscriber = (message, data) => {
        console.log(`Here is the message ${message}`);
    };
    
    save() {
        // Validates that a project with the same name does not exist before adding the project object to local storage.
        
        // check existing storage for 'projects'
        let data = JSON.parse(localStorage.getItem('projects'))
        
        if (!data) {
            localStorage.setItem('projects', JSON.stringify([this]))
            return;
        }

        // verifies the no project with the same name exists
        if (data.filter(project => project.name === this.name).length === 0) {
            data.push(this)
            localStorage.setItem('projects', JSON.stringify(data))
        }
        
        this.updateProjectList()

    }
    
}


export {Project}