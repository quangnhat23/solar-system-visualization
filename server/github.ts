import { Octokit } from '@octokit/rest'

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

export async function createRepository(name: string, description: string, isPrivate: boolean = false) {
  const octokit = await getUncachableGitHubClient();
  
  try {
    const response = await octokit.rest.repos.createForAuthenticatedUser({
      name,
      description,
      private: isPrivate,
      auto_init: false
    });
    
    return response.data;
  } catch (error: any) {
    if (error.status === 422) {
      throw new Error(`Repository '${name}' already exists`);
    }
    throw error;
  }
}

export async function getAuthenticatedUser() {
  const octokit = await getUncachableGitHubClient();
  const response = await octokit.rest.users.getAuthenticated();
  return response.data;
}

export async function createPullRequest(owner: string, repo: string, title: string, body: string, head: string, base: string = 'main') {
  const octokit = await getUncachableGitHubClient();
  
  try {
    const response = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      body,
      head,
      base
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to create pull request: ${error.message}`);
  }
}

export async function createBranch(owner: string, repo: string, branchName: string, fromBranch: string = 'main') {
  const octokit = await getUncachableGitHubClient();
  
  try {
    // Get the SHA of the source branch
    const refResponse = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${fromBranch}`
    });
    
    // Create new branch
    const response = await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: refResponse.data.object.sha
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to create branch: ${error.message}`);
  }
}

export async function uploadFile(owner: string, repo: string, path: string, content: string, message: string, branch: string = 'main') {
  const octokit = await getUncachableGitHubClient();
  
  try {
    // Convert content to base64
    const encodedContent = Buffer.from(content).toString('base64');
    
    const response = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: encodedContent,
      branch
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to upload file ${path}: ${error.message}`);
  }
}

export async function uploadFiles(owner: string, repo: string, files: Array<{path: string, content: string}>, branch: string = 'main') {
  const results = [];
  
  for (const file of files) {
    try {
      const result = await uploadFile(owner, repo, file.path, file.content, `Add ${file.path}`, branch);
      results.push({ path: file.path, success: true, sha: result.content?.sha });
    } catch (error: any) {
      results.push({ path: file.path, success: false, error: error.message });
    }
  }
  
  return results;
}