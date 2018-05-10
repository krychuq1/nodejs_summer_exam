

export function role(role) {
       return function(req,res,next){
           if(req.user.role === role){
               next();
           }else{
               res.status(403).send('Only for admin');
           }
       }
}