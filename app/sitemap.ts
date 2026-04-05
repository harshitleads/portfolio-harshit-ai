import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://harshit.ai',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://harshit.ai/work/pm-salary-ace',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://harshit.ai/work/explainable-ai',
      lastModified: new Date('2026-03-16'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://harshit.ai/work/eval-studio',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://harshit.ai/work/claude-code-bridge',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://harshit.ai/work/job-market-pulse',
      lastModified: new Date('2026-04-05'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
