const middleware = {}

middleware['nouser'] = require('..\\middleware\\nouser.js')
middleware['nouser'] = middleware['nouser'].default || middleware['nouser']

middleware['user'] = require('..\\middleware\\user.js')
middleware['user'] = middleware['user'].default || middleware['user']

export default middleware
