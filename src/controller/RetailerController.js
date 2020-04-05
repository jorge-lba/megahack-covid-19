const Retailer = require( '../models/Retailer' )
const Token = require('../auth/toke.auth')
const JWT = require( 'jsonwebtoken' )

module.exports = {
    async index ( request, response ) {
        try {
            const token = request.header('Authorization')
            const retailer = await Retailer.find()
            const data = JWT.verify(token, process.env.JWT_KEY)
            response.json( retailer )   
        } catch (error) {
            response.json( { message: 'Erro de autenticação' } )
        }
    },


    async create ( request, response ) {

        try {
            const { email } = request.body
            const product = request.body
            const userDb = await Retailer.create( product )
            

            const userObject = userDb.toJSON()
            
            const JWTData = {
                iss: 'api',
                sub: userObject,
                // exp: Math.floor( Date.now() / 1000 ) + ((60*60)*3)
            }
            
            const token = await Token.generate( JWTData ) 

        response.json( {token} )
        } catch (error) {
            error.errmsg
                ? response.json( { error: error.errmsg } )
                : response.json( { error: 'Erro ao efetuar o cadastro' } )
        } 
    
    },

    
}