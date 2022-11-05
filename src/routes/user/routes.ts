import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

import CreateUserController from "./create";
import ListUserPokemonsController from "./listPokemons";

export const UserRoutes = Router();

UserRoutes.post("/user/create", (request, response) =>
  CreateUserController.handle(request, response)
);

UserRoutes.post("/user/pokemons", ensureAuthenticated, (request, response) =>
  ListUserPokemonsController.handle(request, response)
);
