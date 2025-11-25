// middleware to check if user is logged in and then redirects if session is not found
function requireLogin(req, res, next) {

  // if user is not logged in
  if (!req.session.user) {
    // redirect to login page
    return res.redirect("/login");
  }

  // allow request to continue
  next();
}

// export middleware
// makes requireLogin available to other files
module.exports = { requireLogin };
