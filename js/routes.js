import * as el from './elements.js'

export class Router {

    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event

        event.preventDefault()

        window.history.pushState({}, '', event.target.href)
        console.log(event.target.href)

        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]

        fetch(route)
            .then(data => data.text())
            .then(html => {
                document.getElementById('content').innerHTML = html
            });

        this.updateTheme()
    }

    updateTheme() {
        Object.values(el.elementsNav).forEach(element => {
            element.classList.remove('active')
        })
        const activeElement = Object.values(el.elementsNav).find(element => element.href === window.location.href)
        if (activeElement) {
            activeElement.classList.add('active')
        }

        let path = window.location.pathname.replace('/', '')
        if(path == ''){
            path = 'home'
        }

        document.documentElement.classList.remove('home', 'universe', 'exploration')
        if (path) {
            document.documentElement.classList.add(path)
        }
    }
}

