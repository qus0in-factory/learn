import { labels } from './labels.mjs'
import cover from './cover.json' with { type: 'json' }
import gitCover from './git-cover.json' with { type: 'json' }
import thumbnail from './card-thumbnail.json' with { type: 'json' }

export const courses = [
  {
    id: 'git',
    title: labels.courseTitle,
    summary: 'AI 시대에 최적화된 Git & GitHub',
    link: '/git/',
    image: { ...cover, ...gitCover, ...thumbnail, alt: labels.courseCoverAlt },
  },
]
