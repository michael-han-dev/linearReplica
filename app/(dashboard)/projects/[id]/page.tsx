'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@urql/next'
import { IssuesQuery } from '@/gql/issuesQuery'
import Issue from '@/app/_components/Issue';


const ProjectDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { id } = params
  const [{ data, fetching, error }] = useQuery({
    query: IssuesQuery,
    variables: { projectId: id },
  })

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error loading issues</div>

  return (
    <div>
      <h1>Project Details</h1>
      {data.issues.map((issue) => (
        <Issue key={issue.id} issue={issue} />
      ))}
    </div>
  )
}

export default ProjectDetailPage
