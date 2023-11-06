const countries = require('./countries.json')
const fs = require('fs')
const formatted = []

for (let i = 0; i < countries.length; i++) {
  const country = countries[i]
  country.states = country.states.map(({ name, type }) => ({ name, type }))
  country.translations = { es: country.translations.es, en: country.name }
  formatted.push(country)
}

fs.writeFileSync('./countries2.json', JSON.stringify(formatted, null, 2), 'utf8')
