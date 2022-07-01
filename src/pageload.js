// overview page ()

function createPage() {
    document.title = 'ToDo!'
    const body = document.getElementsByTagName('body')[0]
    let anchor = document.createElement('div')
    body.appendChild(anchor)
    anchor.id = 'content'

    const nav = document.createElement('nav')    
    anchor.appendChild(nav)

    const workArea = document.createElement('div')
    anchor.appendChild(workArea)
    workArea.id = 'work-area'
    
    
    const menu = document.createElement('div')
    workArea.appendChild(menu)
    menu.id = 'menu'

    const projectList = document.createElement('div')
    menu.appendChild(projectList)
    projectList.id = 'project-list'
    projectList.textContent = 'List of Projects'

    const source = document.createElement('a')
    menu.appendChild(source)
    source.href = 'https://github.com/robbiecares/todo-list'
    source.target = '_blank'
    source.classList.add('source')

    content = document.createElement('i')
    source.appendChild(content)
    content.classList.add('fab', 'fa-github')

    content = document.createElement('div')
    workArea.appendChild(content)
    content.id = 'projects-area'


    // content = document.createElement('i')
    // nav.appendChild(content)
    // content.classList.add("fa-solid", "fa-bars")

    content = document.createElement('h1')
    nav.appendChild(content)
    content.textContent = "ToDo"

    // content = document.createElement('i')
    // nav.appendChild(content)
    // content.classList.add("fa-solid", "fa-gear")



    // const footer = document.createElement('footer')
    // anchor.appendChild(footer)
}   



// project view modal
    // view and edit a project's task in "full screen" 




 // task update modal
        // all task update actions should be editable directly in the overview page (e.g. priority, due date, status, delete);
        //  however, updating the task description may require more space than is currently available in the page overview.
        // Therefore, a dblclick on the task should open a single task update modal



createPage()

// export {createPage as default}