import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getRecipe from "app/recipes/queries/getRecipe"
import deleteRecipe from "app/recipes/mutations/deleteRecipe"

export const Recipe = () => {
  const router = useRouter()
  const recipeId = useParam("recipeId", "number")
  const [recipe] = useQuery(getRecipe, { where: { id: recipeId } })
  const [deleteRecipeMutation] = useMutation(deleteRecipe)

  return (
    <div>
      <h1>Recipe {recipe.id}</h1>
      <pre>{JSON.stringify(recipe, null, 2)}</pre>

      <Link href={`/recipes/${recipe.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteRecipeMutation({ where: { id: recipe.id } })
            router.push("/recipes")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowRecipePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/recipes">
          <a>Recipes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Recipe />
      </Suspense>
    </div>
  )
}

ShowRecipePage.getLayout = (page) => <Layout title={"Recipe"}>{page}</Layout>

export default ShowRecipePage
