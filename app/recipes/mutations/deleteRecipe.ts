import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteRecipeInput = Pick<Prisma.RecipeDeleteArgs, "where">

export default async function deleteRecipe({ where }: DeleteRecipeInput, ctx: Ctx) {
  ctx.session.authorize()

  const recipe = await db.recipe.delete({ where })

  return recipe
}
