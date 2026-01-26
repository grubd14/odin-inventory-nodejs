export function requireAdmin(request, response, next) {
  if (request.user.role == "admin") {
    next();
  } else {
    return response.status(403).send("Admin access only!!!");
  }
}
