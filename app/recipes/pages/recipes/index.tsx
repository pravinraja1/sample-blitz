import { Suspense, Fragment, useState, useEffect } from "react"
import { Head, Link, useQuery } from "blitz"
import { Flex, Button, Box, Spinner } from "@chakra-ui/core"
import getRecipes from "app/recipes/queries/getRecipe"
import updateRecipe from "app/recipes/mutations/updateRecipe"
import RecipeItem from "app/components/Form"


const [recipesState, setRecipeState] = useState([])
  const [recipes] = useQuery(getRecipes)
  useEffect(() => {
    if (recipes.length > 0) {
      setRecipeState(recipes)
    }
  }, [recipes])

export const RecipesList = () => {
  return (
    <Fragment>
      {recipesState.map((recipe) => (
        <RecipeItem
          id={recipe.id}
          title={recipe.name}
          imageUrl={recipe.imageUrl}
          description={recipe.description}
          likes={recipe.likes}
          onLike={async (id, likes) => {
            //on recipe like logic comes here
          }}
        />
      ))}
    </Fragment>
  )
}
const RecipesPage = () => {
  return (
    <Flex flexDirection="column" bg="background" w="100vw" h="100vh">
      <Box marginLeft="auto" marginRight="30px">
        <p>
          <Link href="/recipes/new">
            <Button variantColor="blue" variant="outline" cursor="pointer">
              Create Recipe
            </Button>
          </Link>
        </p>
      </Box>
      <Flex p={8} flexWrap="wrap">
        <Suspense fallback={<Spinner size="xl" margin="auto" />}>
          <RecipesList />
        </Suspense>
      </Flex>
    </Flex>
  )
}
export default RecipesPage