var fortune = require('fortune')
  , app = fortune({
    db: 'uxlog'
  })
  .resource('user', {
    zooniverse_id: String, // user ID as used in Ouroboros/Panoptes
    events: ['event'] // "has many" events
  })
  .resource('subject', {
    subject_id: String // subject ID as used in Ouroboros/Panoptes
  })
  .resource('event', {
    event_id: String, // unique ID for the event
    time: Date, // full date/timestamp of event in UTC, server time.
    subject: { ref: 'subject', inverse: 'subject_id' }, // the subject this corresponds to (for 'login', 'idle', 'logout' this will be null)
    owner: 'user', // the user that performed this event
    type: String, // one of: 'login','favourite','collect','share','meme','tweet','pin','classify','post','comment','idle','logout'
    related_id: String, // in the case of 'collect', 'meme', 'classify', 'post', 'comment' this is the ID of the collection, meme, classification, post, or comment
  })
  .listen(8090);