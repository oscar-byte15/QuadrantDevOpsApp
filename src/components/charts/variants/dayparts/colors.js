
const colors = [
  { name: 'blue', data: ['#8AC8E5'] },
  { name: 'yellow', data: ['#FFB703'] },
  { name: 'green', data: ['#53DD6C'] },
  { name: 'gray', data: ['#403D58'] },
  { name: 'pink', data: ['#F497DA'] },
  { name: 'multicolor', data: ['#8AC8E5', '#FFB703', '#53DD6C', '#403D58', '#F497DA'] }
]

export const getColor = color => {
  return colors.find(e => e.name == color).data
}
