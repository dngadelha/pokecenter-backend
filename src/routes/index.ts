import { Router } from "express";
import { PokemonRoutes } from "./pokemon/routes";
import { UserRoutes } from "./user/routes";

export const ApiRoutes = Router();

ApiRoutes.use("/api", UserRoutes);
ApiRoutes.use("/api", PokemonRoutes);
