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

async function restructureFiles(dir, outputDir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Skip special directories
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) {
        continue
      }
      // Recursively process subdirectories
      await restructureFiles(fullPath, outputDir)
    } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
      // Skip the custom 404.html file - it needs to stay at the root
      if (entry.name === '404.html' && dir === outputDir) {
        console.log(`Skipping 404.html - needs to stay at root for GitHub Pages`)
        continue
      }
      
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
    await restructureFiles(outputDir, outputDir)
    
    // Ensure the custom 404.html is copied to handle GitHub Pages routing
    const source404 = path.join('public', '404.html')
    const dest404 = path.join(outputDir, '404.html')
    
    try {
      await fs.access(source404)
      await fs.copyFile(source404, dest404)
      console.log('✓ Copied custom 404.html for GitHub Pages routing')
    } catch (e) {
      console.log('Note: No custom 404.html found to copy')
    }
    
    console.log('✓ File restructuring complete')
  } catch (error) {
    console.error('Error restructuring files:', error)
    process.exit(1)
  }
}

main()
