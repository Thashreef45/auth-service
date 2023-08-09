import authMiddleware from "./base";

const apexAuth = authMiddleware("apex");
const nodalAuth = authMiddleware("nodal");
const cpAuth = authMiddleware("channelPartner");

export { apexAuth, nodalAuth, cpAuth };
