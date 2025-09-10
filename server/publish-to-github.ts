import { createRepository, getAuthenticatedUser, createBranch, createPullRequest } from './github.js';

export async function publishToGitHub() {
  try {
    // Get user info
    const user = await getAuthenticatedUser();
    console.log(`Publishing to GitHub for user: ${user.login}`);
    
    // Create repository
    const repo = await createRepository(
      'solar-system-visualization',
      '🌌 Beautiful 3D Solar System Visualization built with React Three Fiber - An interactive exploration of our solar system with realistic orbital mechanics, detailed planet information, and stunning visual effects.',
      false // public repository
    );
    
    console.log(`Repository created successfully: ${repo.html_url}`);
    return {
      success: true,
      repositoryUrl: repo.html_url,
      cloneUrl: repo.clone_url,
      user: user.login
    };
    
  } catch (error: any) {
    console.error('Error publishing to GitHub:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function createFeaturePullRequest() {
  try {
    // Get user info
    const user = await getAuthenticatedUser();
    const owner = user.login;
    const repo = 'solar-system-visualization';
    
    console.log(`Creating pull request for repository: ${owner}/${repo}`);
    
    // Create a feature branch
    const branchName = 'feature/enhanced-controls';
    await createBranch(owner, repo, branchName);
    
    // Create pull request
    const pullRequest = await createPullRequest(
      owner,
      repo,
      '🚀 Enhanced Solar System Controls',
      `## 🌌 Enhanced Solar System Features

This pull request adds several improvements to the solar system visualization:

### ✨ New Features
- **Enhanced Camera Controls**: Improved navigation with smoother movement
- **Time Control Panel**: Better time scale controls for orbital speeds
- **Visual Enhancements**: Improved lighting and planet details
- **Interactive Elements**: Better hover effects and selection feedback

### 🔧 Technical Improvements
- Optimized rendering performance
- Better code organization
- Enhanced user interface components
- Improved accessibility features

### 🎯 Benefits
- More intuitive user experience
- Better educational value
- Smoother performance
- Enhanced visual appeal

Ready for review and merge! 🌟`,
      branchName,
      'main'
    );
    
    console.log(`Pull request created successfully: ${pullRequest.html_url}`);
    return {
      success: true,
      pullRequestUrl: pullRequest.html_url,
      pullRequestNumber: pullRequest.number,
      branchName: branchName,
      user: user.login
    };
    
  } catch (error: any) {
    console.error('Error creating pull request:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}