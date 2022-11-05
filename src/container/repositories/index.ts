import { container } from "tsyringe";

import { IPokemonsRepository } from "@backend-typeorm/repositories/Pokemon/IPokemonsRepository";
import { PokemonsRepository } from "@backend-typeorm/repositories/Pokemon/PokemonsRepository";
import { IUsersPokemonsRepository } from "@backend-typeorm/repositories/UserPokemon/IUsersPokemonsRepository";
import { UsersPokemonsRepository } from "@backend-typeorm/repositories/UserPokemon/UsersPokemonsRepository";

import { IUsersRepository } from "@backend-typeorm/repositories/User/IUsersRepository";
import { UsersRepository } from "@backend-typeorm/repositories/User/UsersRepository";

container.registerSingleton<IPokemonsRepository>(
  "PokemonsRepository",
  PokemonsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersPokemonsRepository>(
  "UsersPokemonsRepository",
  UsersPokemonsRepository
);
