import { defaultDelay } from '../../framework/utils'
import {When, Then} from 'cucumber'
const { listening } = require(`../../framework${process.env.V3 ? '-v3' : ''}/listening`)

When(/^publisher (\S*) (accepts|rejects) (?:a|an) (event|record) match "([^"]*)" for pattern "([^"]*)"$/, (client, action, type, subscriptionName, pattern) => {
  listening.setupListenResponse(client, action === 'accepts', type, subscriptionName, pattern)
})

When(/^publisher (\S*) listens to (?:a|an) (event|record) with pattern "([^"]*)"$/, (client, type, pattern, done) => {
  listening.listens(client, type, pattern)
  setTimeout(done, defaultDelay)
})

When(/^publisher (\S*) unlistens to the (event|record) pattern "([^"]*)"$/, (client, type, pattern, done) => {
  listening.unlistens(client, type, pattern)
  setTimeout(done, defaultDelay)
})

Then(/^publisher (\S*) does not receive (?:a|an) (event|record) match "([^"]*)" for pattern "([^"]*)"$/, listening.assert.doesNotRecieveMatch)

Then(/^publisher (\S*) receives (\d+) (event|record) (?:match|matches) "([^"]*)" for pattern "([^"]*)"$/, listening.assert.recievesMatch)

Then(/^publisher (\S*) removed (\d+) (event|record) (?:match|matches) "([^"]*)" for pattern "([^"]*)"$/, listening.assert.receivedUnMatch)
