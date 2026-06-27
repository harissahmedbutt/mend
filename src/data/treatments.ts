/** Treatment categories Mend finances. Shared by the /apply flow and the API. */

export type Treatment = {
  id: string
  label: string
  blurb: string
}

export const TREATMENTS: readonly Treatment[] = [
  { id: 'medical', label: 'Medical', blurb: 'Procedures, surgery and specialist care' },
  { id: 'dental', label: 'Dental', blurb: 'Implants, orthodontics and cosmetic dentistry' },
  { id: 'fertility', label: 'Fertility', blurb: 'IVF, ICSI and fertility treatment' },
  { id: 'cosmetic', label: 'Cosmetic', blurb: 'Aesthetic and elective procedures' },
] as const

export const TREATMENT_IDS = TREATMENTS.map((t) => t.id) as readonly string[]
