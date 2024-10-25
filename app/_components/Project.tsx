import ProjectStatus from './ProjectStatus'

const Project = ({ project }) => {
  const displayId = project.id.split('-').pop().slice(-3)

  return (
    <div className="px-4 h-[40px] border-b flex items-center hover:bg-slate-50 gap-4">
      <span className="text-sm text-slate-300 w-[80px]">
        {`PRJ-${displayId}`.toUpperCase()}
      </span>
      <ProjectStatus status={project.status} projectId={project.id} />
      <span>{project.name}</span>
    </div>
  )
}

export default Project
