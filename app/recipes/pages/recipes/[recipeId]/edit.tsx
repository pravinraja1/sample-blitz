import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getRecipe from "app/recipes/queries/getRecipe"
import updateRecipe from "app/recipes/mutations/updateRecipe"
import RecipeForm from "app/recipes/components/RecipeForm"

export const EditRecipe = () => {
  const router = useRouter()
  const recipeId = useParam("recipeId", "number")
  const [recipe, { setQueryData }] = useQuery(getRecipe, { where: { id: recipeId } })
  const [updateRecipeMutation] = useMutation(updateRecipe)

  return (
    <div>
      <h1>Edit Recipe {recipe.id}</h1>
      <pre>{JSON.stringify(recipe)}</pre>

      <RecipeForm
        initialValues={recipe}
        onSubmit={async () => {
          try {
            const updated = await updateRecipeMutation({
              where: { id: recipe.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/recipes/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing recipe " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditRecipePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRecipe />
      </Suspense>

      <p>
        <Link href="/recipes">
          <a>Recipes</a>
        </Link>
      </p>
    </div>
  )
}

EditRecipePage.getLayout = (page) => <Layout title={"Edit Recipe"}>{page}</Layout>

export default EditRecipePage
