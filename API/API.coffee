API = require("fortune")
app = API(db: "user-event-log").resource("user",

  zooniverse_id: String
  # user ID as used in Ouroboros/Panoptes

  events: ["event"]
  # "has many" events

).resource("animal",

  animal: String
  # the animal, e.g. "tiger"

).resource("wordUsage",

  word: String
  # the word, e.g. "mating"

  subject:
    ref: "subject"
    inverse: "zooniverse_id"
  # the subject that word was used in connection with

  user: "user"
  # the user who used the word in connection with this subject

  frequency: Number
  # the number of times the user has used that word in connection with this subject

).resource("subject",

  zooniverse_id: String
  # subject ID as used in Ouroboros/Panoptes

  state: String
  # 'known' or 'unknown'

  animals: ["animal"]
  # animals that are known to appear in this subject (for 'known' only, will be empty otherwise)

  wordUsages: ["wordUsage"]
  # wordUsages for this subject

).resource("event",

  time: Date
  # full date/timestamp of event in UTC, server time.

  subject_id: String
  # the zooniverse ID of the subject for which the event occurred

  user_id: String
  # the zooniverse ID of the user performing the action

  type: String
  # one of: 'login','favourite','collect','share','meme','tweet','pin','classify','post','comment','idle','logout','talk','view'

  related_id: String
  # in the case of 'collect', 'meme', 'classify', 'post', 'comment' this is the ID of the collection, meme, classification, post, or comment

).listen(80)
exports.API = API
