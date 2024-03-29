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
        def json = request.JSON
        ApplicationUser au = new ApplicationUser(
                firstName: json['firstName'], 
                lastName: json['lastName'], 
                email: json['email'], 
                userName: json['userName'],
                uuid: 'toBeChanged').save(failOnError: true)
        
        //create users that are posted from json    
               response.status = 201
               response.setHeader('Location', '/users/'+au.id)
               render au as JSON
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
        def json = request.JSON
        ApplicationUser au = ApplicationUser.get(json['id'])
        if (au == null) {
            render(status: 405)
        }
        // move to service
        au.email = json['email']  
        au.firstName = json['firstName'] 
        au.lastName = json['lastName'] 
        au.userName = json['userName']
        
        au.save(failOnError: true)
        render(status: 200)
    }

    // DELETE /users
    def removeAll = {
        def json = request.JSON
        ApplicationUser au = ApplicationUser.get(json['id'])
        au.delete()
        render(status: 200)
    }

    // DELETE /users/{id}
    def delete = {
        ApplicationUser au = ApplicationUser.get(params.id)
        au.delete()
        render(status: 200)
    }
}
