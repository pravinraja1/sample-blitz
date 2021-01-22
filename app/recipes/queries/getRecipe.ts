import { Ctx, NotFoundError } from "blitz"
import db, { FindManyRecipeArgs, Prisma } from "db"

type GetRecipeInput = Pick<Prisma.FindFirstRecipeArgs, "where">

export default async function getRecipes(args: FindManyRecipeArgs) {
  const recipes = await db.recipe.findMany(args)
  return recipes
}