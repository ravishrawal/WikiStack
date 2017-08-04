var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Placeholder'
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Placeholder'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'Placeholder'
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type:Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},{
getterMethods: {
  route() {
    return '/wiki/'+this.urlTitle;
  }
}
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Placeholder'
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
            isEmail: true
        }
      }
});

module.exports = {Page, User, db}
