import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import './style.css';
import * as pageload from './pageload'
import * as project from './project';


localStorage.clear()
localStorage.setItem('projects', JSON.stringify([new project.Project('beer'), new project.Project('cake')])) 

// new project.Project('moose')

console.log('end')
