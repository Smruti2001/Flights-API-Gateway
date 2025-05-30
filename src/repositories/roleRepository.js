const CrudRepository = require("./crudRepository");
const { Role } = require('../models');

class RoleRepository extends CrudRepository {
    constructor() {
        super(Role);
    }

    async findRoleByName(name) {
        const role = await Role.findOne({ where: { name: name } });
        return role;
    }
}

module.exports = RoleRepository;