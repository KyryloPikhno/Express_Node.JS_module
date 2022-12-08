const authValidator = require('../validator/auth.validator');
const ApiError = require("../error/ApiError");
const oauthService = require("../service/oauth.service");
const OAuth = require('../dataBase/OAuth')
const {tokenTypeEnum} = require("../enum");

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
            const accessToken =  req.get('Authorization')

            if (!accessToken) {
                throw new ApiError('No accessToken',401);
            }

            oauthService.checkToken(accessToken)

            const tokenInfo = await OAuth.findOne({accessToken})

            if (!tokenInfo) {
                throw new ApiError('token is not valid',401);
            }

            req.tokenInfo = tokenInfo
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken =  req.get('Authorization')

            if (!refreshToken) {
                throw new ApiError('No refreshToken',401);
            }

            oauthService.checkToken(refreshToken, tokenTypeEnum.refreshToken)

            const tokenInfo = await OAuth.findOne({refreshToken})

            if (!tokenInfo) {
                throw new ApiError('token is not valid',401);
            }

            req.tokenInfo = tokenInfo
            next();
        } catch (e) {
            next(e);
        }
    },
}
