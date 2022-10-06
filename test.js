const { stringify } = require('querystring');

const stripe = require('stripe')('sk_test_51KktoIEL7XDhq084MaCpYJ8zvPxthK3nJ36ufaiXTvL87Zujie0TdHz2YoxCWAJ2Yik1GkLItFPhJJb6vzUnbZxz001OU9TuSQ');

// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
async function createCharge () {
    const charge = await stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        source: 'tok_visa',
        description: 'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
    });
}

async function createUser(name, netid, email) { //create a stripeUSER
    const user = await stripe.customers.create({
        description: name,
        metadata: {netid: netid},
        email: email,
        currency: "USD",
    });
}

async function retreiveUser(name, netid, email) {
    const user = await stripe.customers.search({
        query: 'metadata[\'netid\']:\'\""+ netid +"\"\'',
    });
    if (user.data) {
        console.log(user.data)
        return user.data
    } else {
        console.log("user not found ... creating user")
        createUser(netid)
    }
}

retreiveUser('testcustomer3', 'tester300', 'test300@yale.edu')