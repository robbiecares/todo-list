// this module will contain a project class.
// The project class should contain:
    
    // name
    // a list of to-do instances

class Project {
    // A class to hold all data related to a specific project.

    constructor(name) {
        this.name = name || prompt('Enter Name:')
        this.id = Date.now()
    }
}


Project.prototype.isValid = function() {
    // Validates that a project with the same name does not exist.
    
    let isValid = true

    if (!this.name) {
        isValid = false
    }

    // if (projectManager.projectNames && !projectManager.projectNames.includes(this.name)) {
    //         this.save()
    //     }

    return isValid
}


Project.prototype.save = function() {
    if (this.isValid()) {
        const topic = 'new_project_created'
        PubSub.publish(topic, 
            this
        );
        console.log(topic)
    }
}


// new class projectManager {
//     // This class should subscribe to any changes to a product object and push the notification to other relevant object managers.
//     // (e.g. upon receiving a notification of new project creation) this manager should:
//         // notify local storage
//         // update the project list DOM element (maybe this could be handled by a storage manager)
//         // create a new project element in the work-area of the display 
    
//     constructor() {
//         this.projects = null
//         this.projectNames = null
//     }

//     // save() {
//     //     // Validates that a project with the same name does not exist before adding the project object to local storage.
        
//     //     // check existing storage for 'projects'
//     //     let data = JSON.parse(localStorage.getItem('projects'))
        
//     //     if (!data) {
//     //         localStorage.setItem('projects', JSON.stringify([this]))
//     //         return;
//     //     }

//     //     // verifies the no project with the same name exists
//     //     if (data.filter(project => project.name === this.name).length === 0) {
//     //         data.push(this)
//     //         localStorage.setItem('projects', JSON.stringify(data))
//     //     }
        
//     //     this.updateProjectList()

//     // }
    
//     get projects() {
//         // Returns a list of the projects currently in local storage.

//         PubSub.subscribe('storage_updated', (data) => {
//             data? this.projects = data : {}
//         });
//     }

//     set projects(i) {
//         return 'this attribute cannot be set'
//     }

//     get projectNames() {
//         // Return a list of project names.
//         return this.projects.filter(project => project.name)
//     }

//     set projectNames(i) {
//         return 'this attribute cannot be set'
//     }
        
// }

export {Project}