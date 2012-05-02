package uk.co.apsgroup.model.security

import grails.converters.JSON

class UsersController {

    // GET /users
    def list = {
        response.setHeader("Cache-Control", "no-store")
        render ApplicationUser.list(params) as JSON
    }

    // GET /users/{id}
    def show = {
        ApplicationUser au = ApplicationUser.get(params.id)
        render au as JSON
        
//        def builder = new JsonBuilder.build {
//            au.properties.each {propName, propValue ->
        
//                Properties excluded from the JSON
//                def excludes = ['uuid', 'id']
//
//                if (!excludes.contains(propName)) {
//
//                    setProperty(propName, propValue)
//                }
//            }
//        }
//        render(text: builder.toString(), contentType: 'application/json')
    }

    // POST /users
    def create = {
        //create users that are posted from json    
               response.status = 201
        //       response.setHeader('Location', '/book/'+b.id)
        //       render au as JSON
    }

    // POST /users/{id}
    def save = {
        render(status: 405)
    }

    // PUT /users
    def bulkUpdate = {
    }

    // PUT /users/{id}
    def update = {
        ApplicationUser au = ApplicationUser.get(params.id)
        def json = request.JSON

        if (au == null) {
            render(status: 405)
        }
    }

    // DELETE /users
    def removeAll = {
    }

    // DELETE /users/{id}
    def delete = {
    }
}
