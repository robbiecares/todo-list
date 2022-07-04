import * as storage from './storage';


// this module will contain a project class.
// The project class should contain:
    
    // name
    // a list of to-do instances

class Project {
    constructor(name) {
        this.name = name || prompt('Enter Name:')
        this.save()
    }

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

    updateProjectList() {
        const element = document.getElementById('project-list')
        element.textContent = storage.getProjects()
    }
    
}

export {Project}