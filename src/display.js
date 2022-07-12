import { Project } from './project';


// overview page ()

new class UI {
    // This class will manage all creation and maintenance of the user interface.


    constructor() {
        this.createPage()
        PubSub.subscribe('new_project_saved', (tag, data) => {
            this.updateDisplay(data)
        });
        PubSub.subscribe('page_loaded', (tag, data) => {
            this.updateDisplay(data)
        });
    }

    createPage() {
    // Creates the required DOM elements for the initial page load.

    let content = undefined;
    document.title = 'ToDo!'
    const body = document.getElementsByTagName('body')[0]
    let anchor = document.createElement('div')
    body.appendChild(anchor)
    anchor.id = 'content'

    const nav = document.createElement('nav')    
    anchor.appendChild(nav)

    // content = document.createElement('i')
    // nav.appendChild(content)
    // content.classList.add("fa-solid", "fa-bars")

    content = document.createElement('h1')
    nav.appendChild(content)
    content.textContent = "ToDo"

    this.workArea = document.createElement('div')
    anchor.appendChild(this.workArea)
    this.workArea.id = 'work-area'
    
    
    const sidebar = document.createElement('div')
    this.workArea.appendChild(sidebar)
    sidebar.id = 'sidebar'

    const addBtn = document.createElement('button')
    sidebar.appendChild(addBtn)
    addBtn.id = 'addBtn'
    addBtn.addEventListener('click', this.createProject
    // console.log(this.createProject)
    ) 

    content = document.createElement('i')
    addBtn.appendChild(content)
    content.classList.add("fa-solid", "fa-plus")
    
    content = document.createElement('span')
    addBtn.appendChild(content)
    content.textContent = 'New'
    content.classList.add('label')
    
    const modal = document.createElement('div')

    // function showAddOptions() {
    //     // Displays a menu that allows a user to choose between creating a new project or task.
        
    // }

    this.projectList = document.createElement('ul')
    sidebar.appendChild(this.projectList)
    this.projectList.id = 'project-list'

    const source = document.createElement('a')
    sidebar.appendChild(source)
    source.href = 'https://github.com/robbiecares/todo-list'
    source.target = '_blank'
    source.classList.add('source')


    content = document.createElement('i')
    source.appendChild(content)
    content.classList.add('fab', 'fa-github')

    this.projectArea = document.createElement('div')
    this.workArea.appendChild(this.projectArea)
    this.projectArea.id = 'project-area'


    // content = document.createElement('i')
    // nav.appendChild(content)
    // content.classList.add("fa-solid", "fa-gear")



    // const footer = document.createElement('footer')
    // anchor.appendChild(footer)
    }   


    updateDisplay(data) {
        // Calls all function necessary for updating the display when data is accessed.
        this.updateProjectList(data['Project'])
        this.projectArea.innerHTML = ''
        data['Project'].forEach(project => this.createCard(project));
    }


    updateProjectList(data) {
        // Builds a list of projects from local storage data.
        
        if (!data) {
            return;
        }

        this.projectList.innerHTML = ''

        for (let i = 0; i < data.length; i++) {
            let element = document.createElement('li')
            element.textContent = data[i].name
            this.projectList.appendChild(element)    
        };

        console.log('project list updated')
    }
    

    createProject() {
        new Project().save()
    }


    createCard(data) {
        const card = document.createElement('div')
        this.projectArea.appendChild(card)
        card.classList.add('card')

        
        // data container
        const cardData = document.createElement('div')
        cardData.classList.add('card-data')
        card.appendChild(cardData)

        // control container
        const cardControls = document.createElement('div')
        cardControls.classList.add('card-controls')
        card.appendChild(cardControls)
    
        // control content
        const removeBtn = document.createElement('i')
        removeBtn.classList.add('control', 'fa-solid', 'fa-x')
        // removeBtn.addEventListener('click', (e) => this.remove(e))
        cardControls.appendChild(removeBtn)
    
        const editBtn = document.createElement('i')
        editBtn.classList.add('control')
        editBtn.classList.add('fa-solid', 'fa-pen')
        // editBtn.addEventListener('click', () => this.openCard())
        cardControls.appendChild(editBtn)

        // data content
        let content = document.createElement('div')
        cardData.appendChild(content)
        content.classList.add('title')
        content.innerHTML = data.name
        this.titleElement = content

        console.log('card created')
    }
}

// project view modal
    // view and edit a project's task in "full screen" 




 // task update modal
        // all task update actions should be editable directly in the overview page (e.g. priority, due date, status, delete);
        //  however, updating the task description may require more space than is currently available in the page overview.
        // Therefore, a dblclick on the task should open a single task update modal







// export {createPage as default}
