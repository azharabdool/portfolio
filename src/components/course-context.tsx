import { ArrowUpRight } from 'lucide-react';
import { findCourseContext } from '@/data/course-context';

export function CourseContext({ label, year }: { label: string; year: string }) {
  const course = findCourseContext(label, year);
  if (!course) return null;
  return <section className='course-context' aria-label='Course context'><div><p className='eyebrow'>UCT / COURSE CONTEXT / {course.year}</p><h2>{course.code} · {course.name}</h2><p>{course.summary}</p></div><a href={`${course.url}#page=${course.page}`} target='_blank' rel='noopener noreferrer'>{course.faculty} handbook · {course.year}<ArrowUpRight size={15}/></a></section>;
}
