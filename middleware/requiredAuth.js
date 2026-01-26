export function requireAuth(request, response, next) {
  if (request.isAuthenticated()) {
    next()
  } else {
    response.redirect("/login")
  }
}