import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createRecipe from "app/recipes/mutations/createRecipe"
import RecipeForm from "app/recipes/components/RecipeForm"

const NewRecipePage: BlitzPage = () => {
  const router = useRouter()
  const [createRecipeMutation] = useMutation(createRecipe)

  return (
    <div>
      <h1>Create New Recipe</h1>

      <RecipeForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const recipe = await createRecipeMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(recipe))
            router.push(`/recipes/${recipe.id}`)
          } catch (error) {
            alert("Error creating recipe " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/recipes">
          <a>Recipes</a>
        </Link>
      </p>
    </div>
  )
}

NewRecipePage.getLayout = (page) => <Layout title={"Create New Recipe"}>{page}</Layout>

export default NewRecipePage
