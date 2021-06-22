// ui variables
const form = document.getElementById('project-form')
const projectList = document.querySelector('ul.collection')
const clearButton = document.querySelector('.clear-projects')
const filter = document.querySelector('#filter')
const projectInput = document.querySelector('#project')

loadEventListeners()

function loadEventListeners(){
    // Dom load event
    document.addEventListener('DOMContentLoaded', getProjects)

    // Add project Event
    form.addEventListener('submit', addProject)
    
    // Remove Project Event 
    projectList.addEventListener('click', removeProject)

    // Clear Preojects Event
    clearButton.addEventListener('click', clearProjects)

    //filter Project Event 
    filter.addEventListener('keyup', filterProject)
}

function getProjects(e) {
    let projects

    if(localStorage.getItem('projects') === null){
        projects = []
    } else{
        projects = JSON.parse(localStorage.getItem('projects'))
    }

    projects.forEach(function(projectName){
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(projectName))
        
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove" ></i>' 
        li.appendChild(link)
        
        projectList.appendChild(li)
    })
}


function filterProject(e){
    const filterText = e.target.value.toLowerCase()
    
    document.querySelectorAll('.collection-item').forEach
    (function(project){
        const itemText = project.firstChild.textContent

        if (itemText.toLowerCase().indexOf(filterText) != -1){
            project.style.display = 'block';
        } else {
            project.style.display = 'none';

        }
    })
}

function clearProjects(e){
    // projectList.innerHTML = ''

    while(projectList.firstChild){
        projectList.remove(projectList.firstChild)
    }

    clearProjectFromLocalStorage()
}

function clearProjectFromLocalStorage(){
    localStorage.clear()
}


function removeProject(e){
    
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure ?!')){
            e.target.parentElement.parentElement.remove()
        }
        // console.log('project removed')
    }

    removeProjectFromLocalStorage(e.target.parentElement.parentElement)

}

function removeProjectFromLocalStorage(ProjectItem){
    let projects
    
    if(localStorage.getItem('projects') === null){
        projects = []
    } else{
        projects = JSON.parse(localStorage.getItem('projects'))
    }

    projects.forEach(function(projectName, index){
        if(ProjectItem.textContent === projectName){
            projects.splice(index, 1)
        }
    })

    localStorage.setItem('projects', JSON.stringify(projects))
}
      

function addProject (e){
    e.preventDefault()
    if(projectInput.value === '' ){
        alert('Type a Project name')
    } else {

        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(projectInput.value))
        
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove" ></i>' 
        li.appendChild(link)
        
        projectList.appendChild(li)

        storeProjectInLocalStorage(projectInput.value)
        projectInput.value = ''

    }
    
}


function storeProjectInLocalStorage(projectName){
    let projects 
    if(localStorage.getItem('projects') === null){
        projects = []
    } else{
        projects = JSON.parse(localStorage.getItem('projects'))
    }

    projects.push(projectName)
    localStorage.setItem('projects', JSON.stringify(projects))
}








