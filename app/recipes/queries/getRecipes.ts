import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetRecipesInput = Pick<Prisma.FindManyRecipeArgs, "where" | "orderBy" | "skip" | "take">

export default async function getRecipes(
  { where, orderBy, skip = 0, take }: GetRecipesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const recipes = await db.recipe.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.recipe.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    recipes,
    nextPage,
    hasMore,
    count,
  }
}
