import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateRecipeInput = Pick<Prisma.RecipeCreateArgs, "data">
export default async function createRecipe({ data }: CreateRecipeInput, ctx: Ctx) {
  ctx.session.authorize()

  const recipe = await db.recipe.create({ data })

  return recipe
}
