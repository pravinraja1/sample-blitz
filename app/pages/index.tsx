import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
const Index = () => (
  <div>
    <h1>Sample, Project!</h1>
    <Link href={`/questions`}>
     <button type="button">
          Click Me for sample Questions!
     </button>
 </Link>
  </div>
)
export default Index