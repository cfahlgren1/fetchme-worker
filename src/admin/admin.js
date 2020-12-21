const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const AdminBroExpress = require('@admin-bro/express');
const User = require('../models/User');
const Team = require('../models/Team');
const FetchRequest = require('../models/FetchRequest');

AdminBro.registerAdapter(AdminBroMongoose);

// add admin options
const adminBroOptions = {
    resources: [User, Team, FetchRequest],
  }
const adminBro = new AdminBro(adminBroOptions);
const router = AdminBroExpress.buildRouter(adminBro);

module.exports = { router, adminBro };