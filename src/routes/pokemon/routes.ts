import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

import CapturePokemonController from "./capture";
import ListPokemonsController from "./list";

export const PokemonRoutes = Router();

PokemonRoutes.post("/pokemon/capture", ensureAuthenticated, (request, response) =>
  CapturePokemonController.handle(request, response)
);

PokemonRoutes.post("/pokemon/list", (request, response) =>
  ListPokemonsController.handle(request, response)
);
