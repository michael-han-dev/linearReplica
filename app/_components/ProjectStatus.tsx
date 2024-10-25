'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import ProjectStatusRing from './ProjectStatusRing'
import { useMutation } from 'urql'
import { EditProjectMutation } from '@/gql/updateProjectMutation'

const ProjectStatus = ({ status, projectId }) => {
  const [editResult, editProject] = useMutation(EditProjectMutation)

  const onAction = async (newStatus: string) => {
    try {
      await editProject({ input: { id: projectId, status: newStatus } })
    } catch (error) {
      console.error('Error updating project status:', error)
    }
  }

  return (
    <Dropdown
      classNames={{
        content: 'p-0 border-small border-divider bg-background',
      }}
    >
      <DropdownTrigger>
        <button className="active:outline-none outline-none">
          <ProjectStatusRing status={status} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Statuses"
        className="p-3"
        selectionMode="single"
        selectedKeys={[status]}
        onAction={onAction}
        itemClasses={{
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
          ],
        }}
      >
        <DropdownItem
          key="BACKLOG"
          startContent={<ProjectStatusRing status={'BACKLOG'} />}
        >
          <span>Backlog</span>
        </DropdownItem>
        <DropdownItem
          key="INPROGRESS"
          startContent={<ProjectStatusRing status={'INPROGRESS'} />}
        >
          <span>In Progress</span>
        </DropdownItem>
        <DropdownItem key="DONE" startContent={<ProjectStatusRing status={'DONE'} />}>
          <span>Done</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ProjectStatus
