const mongoose = require('mongoose');
const User = require('../models/user');
var ejs = require('ejs');
var jwt = require('jsonwebtoken');
var secret = 'hiimezio';
const AuthUtils = require('../Utilities/AuthenticationUtil');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
    auth: {
        api_user: 'dongockhanh3103',
        api_key: 'hiimkhanh1605'
    }
}

var client = nodemailer.createTransport(sgTransport(options));

exports.resgisterUser = (req, res) => {
    if (!req.body.email) {
        res.send({ success: false, message: "You must provide an email" });
    } else {
        if (!req.body.firstname) {
            res.send({ success: false, message: "You must provide first name" });
        }
        else {
            if (!req.body.lastname) {
                res.send({ success: false, message: "You must provide last name" });
            }
            else {
                if (!req.body.password) {
                    res.send({ success: false, message: "You must provide an password" });
                }
                else {
                    var tempToken = jwt.sign({ username: req.body.firstname, email: req.body.email }, secret, { expiresIn: '24h' });
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        password: req.body.password,
                        temporarytoken: tempToken,
                        birthday: req.body.birthday
                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.send({ success: false, message: 'Tên người dùng hoặc e-mail đã tồn tại' })
                            }
                            else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message });
                                    }
                                    else {
                                        if (err.errors.firstname) {
                                            res.json({ success: false, message: err.errors.firstname.message });
                                        }
                                        else {
                                            if (err.errors.lastname) {
                                                res.json({ success: false, message: err.errors.lastname.message });
                                            }
                                            else {
                                                if (err.errors.password) {
                                                    res.json({ success: false, message: err.errors.password.message });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            ///send email activable

                            var email = {
                                from: 'Localhost, dongockhanh3103@gmail.com',
                                to: user.email,
                                subject: 'Hello',
                                text: 'Hello ' + user.firstname + ', thank you for registering at localhost.com. Please click on the following link to complete your activation: http://localhost:3000/activate/' + user.temporarytoken,
                                html: 'Hello<strong> ' + user.firstname + ' ' + user.lastname + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/active/' + user.temporarytoken + '">' + 'http://localhost:3000/active/</a>'

                            };

                            client.sendMail(email, function (err, info) {
                                if (err) {
                                    console.log(error);
                                }
                                else {
                                    console.log('Message sent: ' + info.response);
                                }
                            });


                            res.json({ success: true, message: "Đăng kí thành công! Vui lòng tới kiểm tra e-mail để kích hoạt tài khoản", data: user });
                        }

                    });
                }
            }
        }
    }
}

exports.getLoginUser = (req, res) => {
    ejs.renderFile('./views/login.ejs', {}, (err, html) => {
        res.send(html);
    })
}



exports.postLoginUser = (req, res) => {
    if (!req.body.email) {
        res.json({ success: false, message: "Bạn phải cung cấp e-mail" });
    }
    else {
        if (!req.body.password) {
            res.json({ success: false, message: "Bạn phải cung cấp mật khẩu" });
        }
        else {

            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    res.status(500).send({ message: err.message });
                }
                if (user) {

                    const validUser = user.comparePassword(req.body.password);

                    if (validUser) {
                        if (!user.active) {
                            res.json({ success: false, message: "Bạn phải kích hoạt tài khoản! Vui lòng kiểm tra e-mail ..." })
                        }
                        //login with token
                        else {
                            var token = jwt.sign({ userID: user._id }, secret, { expiresIn: '24h' });
                            req.session.user = user;
                            res.json({ success: true, message: "Đăng nhập thành công...", token: token, firstname:user.firstname, lastname:user.lastname,avatar:user.avatar })
                            //  res.redirect('/index');
                        }
                    } else {
                        res.json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng..." })
                    }
                }
                else {
                    res.json({ success: false, message: "Người dùng không tồn tại" })
                }
            });
        }
    }
}
exports.updatePasswordUser = (req, res) => {
    if (req.session.user) {
        if (!req.body.oldpassword) {
            res.json({ success: false, message: "you must provide old password" });
        }
        else {
            if (!req.body.newpassword) {
                res.json({ success: false, message: "You must provide new password'" })

            } else {
                if (!req.body.confirmpassword) {
                    res.json({ success: false, message: "You must confirm password" });
                }
                else {
                    if (!(req.body.newpassword === req.body.confirmpassword)) {
                        res.json({ success: false, message: "Confirm password is wrong" });
                    }
                    else {

                        User.findOne({ email: req.session.user }, (err, user) => {
                            if (err) { res.status(500).send({ message: err.message }); }
                            if (user) {
                                console.log(req.body.oldpassword);
                                const validUser = user.comparePassword(req.body.oldpassword);
                                console.log(validUser);
                                if (validUser) {
                                    user.update({}, { 'password': req.body.confirmpassword }, (err, done) => {
                                        if (err) {
                                            res.send({ success: false, message: "Đã xảy ra lỗi" });
                                        }
                                        res.send({ success: true, message: "Cập nhật thành công" });
                                    });
                                }
                                else {
                                    res.json({ success: false, message: "Old password is wrong..." })
                                }
                            }
                        });
                    }
                }
            }
        }
    }
    else {
        res.redirect('/index');
    }
}





exports.updateInfoUser = (req, res) => {
    User.findOneAndUpdate({ 'email': req.body.email },
        { $set: { firstname: req.body.firstname, lastname: req.body.lastname, gender: req.body.gender } },
        { new: true },
        (err, user) => {
            if (err) res.send(err);
            res.json(user);
        });
}


//function Active User
exports.activeUser = (req, res) => {
    User.findOne({ temporarytoken: req.params.token }, function (err, user) {//find user token from database
        if (err) throw err;
        var token = req.params.token;
        jwt.verify(token, secret, function (err, decoded) {
            if (err) res.json({ success: false, message: 'Đã hết thời gian kích hoạt tài khoản' });
            else if (!user) {
                res.json({ success: false, message: 'Đã hết thời gian kích hoạt tài khoản' });
            }
            else {

                User.findOneAndUpdate({ 'email': user.email },
                    { $set: { temporarytoken: false, active: true } },
                    { new: true },
                    (err, user) => {
                        if (err) res.send(err);
                        var email = {
                            from: 'Localhost Staff, staff@localhost.com',
                            to: user.email,
                            subject: 'Localhost Account Activated',
                            text: 'Hello ' + user.name + ', Your account has been successfully activated!',
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account has been successfully activated!'
                        };

                        // Send e-mail object to user
                        client.sendMail(email, function (err, info) {
                            if (err) console.log(err); // If unable to send e-mail, log error info to console/terminal
                        });
                        // res.json({ success: true, message: 'Account activated!' }); // Return success message to controller
                        res.json({ success: true, message: "Tài khoản đã kích hoạt thành công." })
                    });


            }
        });
    });
}
//when click button, it's directed, and check email for e-mail 
exports.resetPassword = (req, res) => {
    User.findOne({ email: req.body.email }).select('email resettoken active firstname lastname').exec(function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Không tìm thấy e-mail ...' })
        }
        else if (!user.active) {
            res.json({ success: false, message: 'Tài khoản chưa được kích hoạt' });
        }
        else {
            user.resettoken = jwt.sign({ username: req.body.firstname, email: req.body.email }, secret, { expiresIn: '24h' });
            user.save(function (err) {
                if (err) {
                    res.json({ success: false, message: errors })
                }
                else {
                    console.log(user)


                    var email = {
                        from: 'Localhost Staff, staff@localhost.com',
                        to: user.email,
                        subject: 'Localhost Account Activated',
                        text: 'Hello Mr/Mrs: ' + user.firstname + ', Your recently requrest a password',
                        html: 'Hello<strong> ' + user.firstname + ' ' + user.lastname + '</strong>,<br><br>You recently request a password resetlink . Please click on the link below to reset your password<br><br><a href="http://localhost:3000/resetpassword/' + user.resettoken + '">' + 'http://localhost:3000/resetpassword/</a>'
                    };

                    client.sendMail(email, function (err, info) {
                        if (err) {
                            console.log(error);
                        }
                        else {
                            console.log('Message sent: ' + info.response);
                        }
                    });

                    res.json({ success: true, message: 'Vui lòng kiểm tra hộp thư để lấy lại mật khẩu' })
                }
            });
        }
    });
}
//this function have 2 fields : new password and confirm password

exports.resetPasswordGet = (req, res) => {
    User.findOne({ resettoken: req.params.token }).select().exec(function (err, user) {
        if (err) throw err;
        var token = req.params.token;
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.json({ success: false, message: "Password link has expired" });
            } else {
                res.json({ success: true, user: user });
            }
        });
    });
}

exports.getUser = (req, res) => {
    var token = req.params.token;
    console.log(token);

    if (!token) {
        res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, secret, (err, decoded) => {
            // Check if error is expired or invalid
            if (err) {
                res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
            } else {
                console.log(decoded);
                res.json({ success: true, message: decoded });

            }
        });
    }
}

exports.checkCurrentUser = (req, res) => {
    const token = req.params.token;
    if (!token) {
        res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, secret, (err, decoded) => {
            // Check if error is expired or invalid
            if (err) {
                res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
            } else {
                if (!decoded.userID) {
                    res.json({ success: false, message: 'Token invalid: ' + err });
                }
                else {
                    console.log(decoded);
                    User.findOne({ _id: decoded.userID }).select('role').exec(function (err, user) {
                        if (err) {
                            res.json({ success: false, message: "User not found" });
                        }
                        else
                         {
                             if(!user.role){
                                  res.json({ success: false, message: "User not be administrator.." });
                             }
                            else if (user.role != "admin") {
                                res.json({ success: false, message: "User not be administrator.." })
                            }
                            else {
                                res.json({ success: true, message: "Ok vo" })
                            }
                        }
                    });
                    //  res.json({ success:true,message:decoded});
                }
            }
        });
    }
}


exports.savePassword = (req, res) => {
    User.findOne({ resettoken: req.body.resetoken }).select('firstname email name password resettoken').exec(function (err, user) {
        if (err) throw err; // Throw error if cannot connect
        if (req.body.password == null || req.body.password == '') {
            res.json({ success: false, message: 'Password not provided' });
        } else {
            user.password = req.body.password; // Save user's new password to the user object
            user.resettoken = false; // Clear user's resettoken 
            // Save user's new data
            user.save(function (err) {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    // Create e-mail object to send to user
                    var email = {
                        from: 'Localhost Staff, staff@localhost.com',
                        to: user.email,
                        subject: 'Localhost Reset Password',
                        text: 'Hello ' + user.name + ', This e-mail is to notify you that your password was recently reset at localhost.com',
                        html: 'Hello<strong> ' + user.name + '</strong>,<br><br>This e-mail is to notify you that your password was recently reset at localhost.com'
                    };
                    // Function to send e-mail to the user
                    client.sendMail(email, function (err, info) {
                        if (err) console.log(err); // If error with sending e-mail, log to console/terminal
                    });
                    res.json({ success: true, message: 'Mật khẩu đã được thay đổi.' }); // Return success message
                }
            });
        }
    });
}
