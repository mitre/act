#!/usr/bin/env node

/**
 * Post-build script to restructure generated files for GitHub Pages
 * Converts /path.html to /path/index.html to handle trailing slashes
 */

import { promises as fs } from 'fs'
import path from 'path'

// Check which output directory exists (Nuxt may use different dirs)
async function findOutputDir() {
  const possibleDirs = ['.output/public', 'dist', '.nuxt/dist']
  
  for (const dir of possibleDirs) {
    try {
      await fs.access(dir)
      console.log(`Found output directory: ${dir}`)
      return dir
    } catch {
      // Directory doesn't exist, try next
    }
  }
  
  throw new Error('No output directory found. Tried: ' + possibleDirs.join(', '))
}

async function restructureFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Skip special directories
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) {
        continue
      }
      // Recursively process subdirectories
      await restructureFiles(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
      // Convert file.html to file/index.html
      const baseName = entry.name.slice(0, -5) // Remove .html
      const newDir = path.join(dir, baseName)
      const newPath = path.join(newDir, 'index.html')

      // Skip if directory already exists (e.g., already processed)
      try {
        await fs.access(newDir)
        console.log(`Skipping ${fullPath} - directory already exists`)
        continue
      } catch {
        // Directory doesn't exist, proceed
      }

      console.log(`Converting ${fullPath} -> ${newPath}`)

      // Create directory and move file
      await fs.mkdir(newDir, { recursive: true })
      await fs.rename(fullPath, newPath)
    }
  }
}

async function main() {
  console.log('Restructuring files for GitHub Pages...')
  
  try {
    const outputDir = await findOutputDir()
    await restructureFiles(outputDir)
    console.log('✓ File restructuring complete')
  } catch (error) {
    console.error('Error restructuring files:', error)
    process.exit(1)
  }
}

main()
