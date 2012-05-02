package uk.co.apsgroup.model.security

class ApplicationUser {

    String userName
    String firstName
    String lastName
    String email
    String uuid

    Date dateCreated
    Date lastUpdated

    static constraints = {
//        uuid unique: true;
    }

    def beforeInsert() {
        dateCreated = new Date()
        uuid = UUID.randomUUID().toString()
    }

    def beforeUpdate() {
        lastUpdated = new Date()
    }

    static mapping = {
        version false
    }
}
