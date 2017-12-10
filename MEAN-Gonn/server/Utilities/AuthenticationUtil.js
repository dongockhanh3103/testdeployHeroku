var jwt = require('jsonwebtoken');


exports.ensureToken=(req, res, next)=> 
{
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }
  exports.verifyToken=(req,res)=>{
    jwt.verify(req.token, 'hiimezio', function(err, data) {
        if (err) {
          return false;
        } else {
            return true;
        }
      });
  }

   exports.requireRole =(role) =>
   {
    return function (req, res, next) {
        if (req.session.user && req.session.user.role === role) {
            next();
        } else {
            res.send(403);
        }
    }

    exports.secretKey=(req,res)=>{
        return "hiimezio"
    }
}