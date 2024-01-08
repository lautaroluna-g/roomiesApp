const { writeFileSync, mkdirSync } = require('fs')

require('dotenv').config()

const targetPath = './src/environments/environments.ts'

const envFileContent = `
export const environments = {
    api_map_key: "${process.env['API_MAP_KEY']}",
    baseURL: "http://localhost:3000"
};`

mkdirSync('./src/environments', { recursive: true })

writeFileSync(targetPath, envFileContent)