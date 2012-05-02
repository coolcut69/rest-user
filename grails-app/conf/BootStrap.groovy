import uk.co.apsgroup.model.security.ApplicationUser

class BootStrap {

    def init = { servletContext ->
        new ApplicationUser(
                firstName: "Chris", 
                lastName: "Borghmans", 
                email: "chris.borghmans@relate4u.com", 
                userName: "chris.borghmans@relate4u.com", 
                uuid: "7ff65ac1-e75c-4803-9b42-fdcd931fe257").save(failOnError: true)
        new ApplicationUser(
                firstName: "Rikkert", lastName: "Koppes", 
                email: "rikkert.koppes@relate4u.com", 
                userName: "rikkert.koppes@relate4u.com",
                uuid: "b7cb8b9f-a386-4f69-9da1-a0eade2b3315").save(failOnError: true)
        new ApplicationUser(
                firstName: "Bart", lastName: "Berden", 
                email: "bart.berden@relate4u.com", 
                userName: "bart.berden@relate4u.com",
                uuid: "4c7064bc-3f3f-49dc-9c1f-2cb6c169476f").save(failOnError: true)

    }
    def destroy = {
    }
}
