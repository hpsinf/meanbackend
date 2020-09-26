const BillingCycle = require('./billingCycle')
const _ = require('lodash')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true })

BillingCycle.after('post', sendErrorOrNext).after('put', sendErrorOrNext)

function sendErrorOrNext (req, res, next) {
    const bundle = res.locals.bundle

    if (bundle.errors) {
        var errors = parseErrors(bundle.errors)
        res.status(500).json({errors})        
    }
    else{
        next()
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = []
    _.forIn(nodeRestfulErrors, error => {
        errors.push(error.message)
    })
    return errors
}

BillingCycle.route('count', function (req, res, next) {
    BillingCycle.countDocuments(function (error, value) {
        if (error) {
            res.status(500).json({erros: [error]})
            //res.status(500).json(error)
        } else {
            res.json({value})
        }
    })
})

module.exports = BillingCycle