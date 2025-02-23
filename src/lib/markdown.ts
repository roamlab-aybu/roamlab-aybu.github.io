import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface Project {
  slug: string
  title: string
  description: string
  image: string
  status: 'ongoing' | 'completed'
  team: string[]
}

export function getAllProjects(): Project[] {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')
  const statuses = ['ongoing', 'completed']
  const projects: Project[] = []

  for (const status of statuses) {
    const statusPath = path.join(projectsDirectory, status)
    if (!fs.existsSync(statusPath)) continue

    const files = fs.readdirSync(statusPath)

    for (const file of files) {
      if (!file.endsWith('.md')) continue

      const fullPath = path.join(statusPath, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      projects.push({
        slug: file.replace(/\.md$/, ''),
        title: data.title,
        description: data.description,
        image: data.image,
        status: status as 'ongoing' | 'completed',
        team: data.team || []
      })
    }
  }

  return projects
}

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .process(markdown)
  return result.toString()
}

export interface Person {
  slug: string
  name: string
  bio: string
  image: string
  email: string
  role: 'faculty' | 'graduate' | 'undergraduate' | 'alumni'
  graduationBio?: string
  websiteUrl?: string
}

export interface NewsItem {
  date: string
  title: string
  content: string
}

export interface People {
  faculty: Person[]
  graduate: Person[]
  undergraduate: Person[]
  alumni: Person[]
}

export function getAllPeople(): { [key: string]: Person } {
  const peoplePath = path.join(process.cwd(), 'content/people.md')
  const fileContents = fs.readFileSync(peoplePath, 'utf8')
  const { data } = matter(fileContents)

  // Convert the nested array structure to flat object structure
  const people: { [key: string]: Person } = {}

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      const person = value[0]
      people[key] = {
        slug: key,
        name: person.name,
        bio: person.bio,
        image: person.image,
        email: person.email,
        role: person.role,
        websiteUrl: person.websiteUrl,
        graduationBio: person?.graduationBio
      }
    }
  })

  return people
}

export function getAllPeopleWithCategories(): People {
  const peoplePath = path.join(process.cwd(), 'content/people.md')
  const fileContents = fs.readFileSync(peoplePath, 'utf8')
  const { data } = matter(fileContents)
  const people: People = {
    faculty: [],
    graduate: [],
    undergraduate: [],
    alumni: []
  }

  // Convert data object to array of entries and iterate
  Object.entries(data).forEach(([, personArray]) => {
    // Skip the non-array properties from frontmatter
    if (Array.isArray(personArray)) {
      personArray.forEach((person: Person) => {
        if (person.role && person.role in people) {
          people[person.role as keyof People].push(person)
        }
      })
    }
  })

  return people
}

export function getNews(): NewsItem[] {
  const newsPath = path.join(process.cwd(), 'content/news.md')
  const fileContents = fs.readFileSync(newsPath, 'utf8')
  const { data } = matter(fileContents)

  // returm last five news items
  return data.news.slice(-5) || []
}