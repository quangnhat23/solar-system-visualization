import { uploadFiles, getAuthenticatedUser } from './github.js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function getAllFiles(dirPath: string, basePath: string = '', excludePatterns: string[] = []): Array<{path: string, content: string}> {
  const files: Array<{path: string, content: string}> = [];
  
  try {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = join(dirPath, item);
      const relativePath = basePath ? join(basePath, item) : item;
      
      // Skip excluded patterns
      if (excludePatterns.some(pattern => relativePath.includes(pattern))) {
        continue;
      }
      
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively get files from subdirectories
        files.push(...getAllFiles(fullPath, relativePath, excludePatterns));
      } else if (stat.isFile()) {
        try {
          // Read file content
          const content = readFileSync(fullPath, 'utf8');
          files.push({
            path: relativePath.replace(/\\/g, '/'), // Ensure forward slashes for GitHub
            content
          });
        } catch (error) {
          console.warn(`Could not read file: ${fullPath}`);
        }
      }
    }
  } catch (error) {
    console.warn(`Could not read directory: ${dirPath}`);
  }
  
  return files;
}

export async function uploadAllProjectFiles() {
  try {
    const user = await getAuthenticatedUser();
    const owner = user.login;
    const repo = 'solar-system-visualization';
    
    console.log(`Uploading all project files to: ${owner}/${repo}`);
    
    // Define exclusion patterns
    const excludePatterns = [
      'node_modules',
      '.git',
      'dist',
      '.vite',
      '.replit',
      'migrations',
      '.env',
      'package-lock.json',
      '.DS_Store',
      'tmp'
    ];
    
    // Get all project files
    const allFiles: Array<{path: string, content: string}> = [];
    
    // Add client files
    allFiles.push(...getAllFiles('client', 'client', excludePatterns));
    
    // Add server files  
    allFiles.push(...getAllFiles('server', 'server', excludePatterns));
    
    // Add shared files
    allFiles.push(...getAllFiles('shared', 'shared', excludePatterns));
    
    // Add root configuration files
    const rootFiles = [
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      'tailwind.config.ts',
      'postcss.config.js',
      'drizzle.config.ts'
    ];
    
    for (const file of rootFiles) {
      try {
        const content = readFileSync(file, 'utf8');
        allFiles.push({ path: file, content });
      } catch (error) {
        console.warn(`Could not read root file: ${file}`);
      }
    }
    
    console.log(`Found ${allFiles.length} files to upload`);
    
    // Upload files in batches to avoid rate limiting
    const batchSize = 10;
    const results = [];
    
    for (let i = 0; i < allFiles.length; i += batchSize) {
      const batch = allFiles.slice(i, i + batchSize);
      console.log(`Uploading batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allFiles.length/batchSize)}`);
      
      const batchResults = await uploadFiles(owner, repo, batch);
      results.push(...batchResults);
      
      // Add small delay between batches
      if (i + batchSize < allFiles.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`Upload complete: ${successful} successful, ${failed} failed`);
    
    return {
      success: true,
      totalFiles: allFiles.length,
      successful,
      failed,
      results,
      repositoryUrl: `https://github.com/${owner}/${repo}`,
      user: owner
    };
    
  } catch (error: any) {
    console.error('Error uploading project files:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}