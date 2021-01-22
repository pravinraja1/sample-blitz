import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateRecipeInput = Pick<Prisma.RecipeUpdateArgs, "where" | "data">

export default async function updateRecipe({ where, data }: UpdateRecipeInput, ctx: Ctx) {
  ctx.session.authorize()

  const recipe = await db.recipe.update({ where, data })

  return recipe
}
