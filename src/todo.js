// this module will be the base class for creating a new to-do instance

// can a task exist without a project?
    // tasks must go to a "default project"

class ToDo {
    // A class for creating new todos.

    constructor(name, date) {
        this.name = name;
        this.completed = false
        this.dueDate;
        this.priority;
        this.project;
        this.id = Date.now();
    }

}


