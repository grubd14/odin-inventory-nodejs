export function requireAdmin(request, response, next) {
  if (!request.isAuthenticated()) {
    return response.status(401).json({ message: "You must be logged in." });
  }
  if (request.user.role !== "admin") {
    return response.status(403).json({ message: "Admin access only." });
  }
  next();
}
