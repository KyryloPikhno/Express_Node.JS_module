const authValidator = require('../validator/auth.validator');
const ActionToken = require('../dataBase/ActionToken')
const ApiError = require("../error/ApiError");
const oauthService = require("../service/oauth.service");
const OAuth = require('../dataBase/OAuth')
const {tokenTypeEnum} = require("../enum");
const {FORGOT_PASSWORD} = require("../config/token-action.enum");
const OldPassword = require('../dataBase/OldPasswords')
const {comparePasswords, compareOldPasswords} = require("../service/oauth.service");


module.exports = {
    isBodyValid: async (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAssessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization')

            if (!accessToken) {
                throw new ApiError('No accessToken', 401);
            }

            oauthService.checkToken(accessToken)

            const tokenInfo = await OAuth.findOne({accessToken})

            if (!tokenInfo) {
                throw new ApiError('token is not valid', 401);
            }

            req.tokenInfo = tokenInfo
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization')

            if (!refreshToken) {
                throw new ApiError('No refreshToken', 401);
            }

            oauthService.checkToken(refreshToken, tokenTypeEnum.refreshToken)

            const tokenInfo = await OAuth.findOne({refreshToken})

            if (!tokenInfo) {
                throw new ApiError('token is not valid', 401);
            }

            req.tokenInfo = tokenInfo
            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization')

            if (!actionToken) {
                throw new ApiError('No actionToken', 401);
            }

            oauthService.checkActionToken(actionToken, FORGOT_PASSWORD)

            const tokenInfo = await ActionToken
                .findOne({token: actionToken, tokenType: FORGOT_PASSWORD})
                .populate('_user_id')

            if (!tokenInfo) {
                throw new ApiError('token is not valid', 401);
            }

            req.user = tokemInfo._user_id

            next();
        } catch (e) {
            next(e);
        }
    },

    checkOldPasswords: async (req, res, next) => {
        try {
            const {user,body} = req.user

            const oldPasswords = await OldPassword.find({_user_id: user._id}).lean()

            if (!oldPasswords.lenght) {
                return next()
            }

            const results = await  Promise.all(
                oldPasswords.map(async(record)=>{
                    return await compareOldPasswords(record.password,body.password)
                })
            )


            // if(condition){
            //     throw  new ApiError('This is old password ', 409)
            // }

            next();
        } catch (e) {
            next(e);
        }
    },
};
