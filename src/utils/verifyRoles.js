const verifyRoles = (...roles) => {
  const userRoles = sessionStorage.getItem("userRoles").split(",");
  const verifyRoles = [...roles, ...userRoles];
  const truthTable = verifyRoles.map((role) => {
    if (verifyRoles.indexOf(role) !== verifyRoles.lastIndexOf(role)) {
      return true;
    }
  });
  if (!truthTable.includes(true)) return false;
  else return true;
};
export default verifyRoles;
