import seeder from '@cleverbeagle/seeder'
import { Meteor } from 'meteor/meteor'
import Documents from '../../api/Documents/documents'

const documentsSeed = userId => ({
  collection: Documents,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 5,
  model (dataIndex) {
    return {
      owner: userId,
      title: `Document #${dataIndex + 1}`,
      subtitle: `This is the subtitle of document`,
      body: `<p>Hello Document #${dataIndex + 1}</p>`,
      image: [{
        name: '',
        type: '',
        extension: '',
        path: '',
        imageId: ''
      }]
    }
  }
})

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      firstName: 'Johny',
      lastName: 'Be Good',
      phone: '1-739-346-4124'
    },
    roles: ['admin'],
    data (userId) {
      return documentsSeed(userId)
    }
  }],
  modelCount: 5,
  model (index, faker) {
    const userCount = index + 1
    return {
      email: `user+${userCount}@test.com`,
      password: 'password',
      profile: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber()
      },
      roles: ['user'],
      data (userId) {
        return documentsSeed(userId)
      }
    }
  }
})
