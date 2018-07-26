import { Meteor } from 'meteor/meteor'
import { FilesCollection } from 'meteor/ostrio:files'

const Images = new FilesCollection({
  debug: false,
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /png|jpe?g/i.test(file.extension)) {
      return true
    }
    return 'Please upload image, with size equal or less than 10MB'
  }
})

if (Meteor.isServer) {
  Images.denyClient()
}

export default Images
