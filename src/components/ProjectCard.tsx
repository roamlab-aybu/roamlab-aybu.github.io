import Link from 'next/link'
import Image from 'next/image'
import { Project, Person } from '@/lib/markdown'

interface ProjectCardProps {
  project: Project
  people: { [key: string]: Person }
}

export default function ProjectCard({ project, people }: ProjectCardProps) {
  // Find team members from all categories
  const teamMembers = project.team.map((slug: string) => people[slug])

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Project Icon/Image */}
          {project.image && (
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {/* Project Info */}
          <div className="flex-grow">
            <Link href={`/research/${project.slug}`} className="text-xl font-semibold mb-2 hover:underline cursor-pointer">
              <h3>{project.title}</h3>
            </Link>
            <p className="text-gray-600 mb-4">{project.description}</p>

            {/* Team Members */}
            <div className="flex -space-x-2">
              {teamMembers.map((person, index) => (
                <a
                  key={person.slug}
                  href={person.websiteUrl || ''}
                  className="relative w-8 h-8 rounded-full border-2 border-white"
                  style={{ zIndex: teamMembers.length - index }}
                >
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover rounded-full"
                  />
                  <div className="absolute inset-0 rounded-full hover:bg-black/10 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 