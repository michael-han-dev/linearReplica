'use client'
import { ProjectsQuery } from '@/gql/projectsQuery'
import PageHeader from '@/app/_components/PageHeader'
import { useMutation, useQuery } from 'urql'
import { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { CreateProjectMutation } from '@/gql/createProjectMutation'
import Project from '@/app/_components/Project'

const ProjectsPage = () => {
  const [{ data, fetching, error }, replay] = useQuery({
    query: ProjectsQuery,
  })

  const [createProjectResult, createProject] = useMutation(CreateProjectMutation)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  useEffect(() => {
    console.log('Query result:', { data, fetching, error })
  }, [data, fetching, error])

  const onCreate = async (close) => {
    console.log('Creating project:', { name: projectName, content: projectDescription })
    const result = await createProject({
      input: { name: projectName,
        content: projectDescription,
        status: 'backlog',
      },
    })

    console.log('Create project result:', result)

    if (result.data?.createProject) {
      await replay({ requestPolicy: 'network-only' })
      close()
      setProjectName('')
      setProjectDescription('')
    } else if (result.error) {
      console.error('Error creating project:', result.error)
    }
  }

  return (
    <div>
      <PageHeader title="All Projects">
        <Tooltip content="New Project">
          <button
            className="text-white bg-black p-1 rounded-md"
            onClick={onOpen}
          >
            <PlusIcon size={14} />
          </button>
        </Tooltip>
      </PageHeader>
      {fetching && <Spinner />}
      {error && (
        <div>
          Error: {error.message}
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      {data && data.projects ? (
        data.projects.map((project) => (
          <div key={project.id}>
            <Project project={project} />
          </div>
        ))
      ) : (
        <div>No projects found</div>
      )}

      <Modal
        size="2xl"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-sm text-black/70">New Project</span>
              </ModalHeader>
              <ModalBody>
                <div>
                  <input
                    autoFocus
                    type="text"
                    className="w-full border-none outline-none focus:outline-none focus:border-none py-2 text-xl text-black/70"
                    placeholder="Project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="bg-white">
                  <Textarea
                    size="lg"
                    variant="bordered"
                    placeholder="Project description"
                    className="bg-white"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    classNames={{
                      inputWrapper: 'bg-white border-none shadow-none p-0',
                      base: 'bg-white p-0',
                      input: 'bg-white p-0',
                      innerWrapper: 'bg-white p-0',
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="border-t">
                <Button variant="ghost" onPress={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  className="bg-black text-white"
                  onPress={() => onCreate(onClose)}
                >
                  Create Project
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProjectsPage
