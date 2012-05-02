class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(view:"/index")
		"500"(view:'/error')
        
        "/users"(controller: "users") {
            action = [GET: "list", POST: "create", PUT: "bulkUpdate", DELETE: "removeAll"]
        }
        
        "/users/$id"(resource: "users")
        // GET -> show
        // PUT -> update
        // POST -> save (used when you know ID of item you create - not our case;)
        // DELETE -> delete
	}
}
