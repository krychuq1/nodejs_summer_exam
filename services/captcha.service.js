import request from 'request';

const secretKey = "6LeAUkYUAAAAAPlygY7k5OjnXziUyFqOQolcLt0l";
const urlToVerify = "https://www.google.com/recaptcha/api/siteverify?secret=";

export function validateCaptcha(req, res, next) {
    //check if req contains captcha
    if(req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null) {
        return res.status(400).json({"responseError" : "Please provide captcha first"});
    }else{
        //url to check captcha
        let verificationUrl = urlToVerify + secretKey  + "&response=" + req.body.captcha + "&remoteip=" +
            req.connection.remoteAddress;
        //req to verifyCaptcha
        request(verificationUrl, (err, res, body)=> {
            if(body.success !== undefined && !body.success) {
                return res.status(400).json({"responseError" : "Failed captcha verification"});
            }else{
                next();
            }
        });
    }
}
