// this module will contain a project class.
// The project class should contain:
    
    // name
    // a list of to-do instances

class Project {
    constructor(name) {
        this.name = name
    }

    save() {
        
        // check existing storage for 'projects'
        let data = JSON.parse(localStorage.getItem('projects'))

        
        if (!data) {
            // place the argument into a new array
            localStorage.setItem('projects', JSON.stringify([this.name]))
            return;
        }

        if (data.indexOf(this.name) === -1) {
            // push the argument into the existing array
            data.push(this.name)
        }
        localStorage.setItem('projects', JSON.stringify(data))

    }
}

export {Project}