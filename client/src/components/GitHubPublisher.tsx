import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, ExternalLink, Check, X, GitPullRequest } from "lucide-react";

export default function GitHubPublisher() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isCreatingPR, setIsCreatingPR] = useState(false);
  const [publishResult, setPublishResult] = useState<any>(null);
  const [prResult, setPrResult] = useState<any>(null);

  const publishToGitHub = async () => {
    setIsPublishing(true);
    setPublishResult(null);

    try {
      const response = await fetch('/api/publish-to-github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setPublishResult(result);
    } catch (error: any) {
      setPublishResult({
        success: false,
        error: error.message || 'Failed to publish to GitHub'
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const createPullRequest = async () => {
    setIsCreatingPR(true);
    setPrResult(null);

    try {
      const response = await fetch('/api/create-pull-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setPrResult(result);
    } catch (error: any) {
      setPrResult({
        success: false,
        error: error.message || 'Failed to create pull request'
      });
    } finally {
      setIsCreatingPR(false);
    }
  };

  return (
    <div className="absolute bottom-4 left-4 z-10">
      <Card className="w-80 bg-black/80 text-white border-gray-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Github className="h-5 w-5" />
            GitHub Publishing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-300">
            Publish this solar system visualization to your GitHub repository or create a pull request
          </p>
          
          {!publishResult && !prResult && (
            <div className="space-y-2">
              <Button
                onClick={publishToGitHub}
                disabled={isPublishing || isCreatingPR}
                className="w-full"
              >
                {isPublishing ? 'Publishing...' : 'Publish to GitHub'}
              </Button>
              
              <Button
                onClick={createPullRequest}
                disabled={isPublishing || isCreatingPR}
                variant="outline"
                className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              >
                <GitPullRequest className="h-4 w-4 mr-2" />
                {isCreatingPR ? 'Creating PR...' : 'Create Pull Request'}
              </Button>
            </div>
          )}

          {publishResult && (
            <div className="space-y-2">
              {publishResult.success ? (
                <div className="p-3 bg-green-900/50 border border-green-600 rounded">
                  <div className="flex items-center gap-2 text-green-300 mb-2">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">Published Successfully!</span>
                  </div>
                  <p className="text-sm text-green-200 mb-2">
                    Repository created for user: {publishResult.user}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-green-300 border-green-600 hover:bg-green-900/50"
                    onClick={() => window.open(publishResult.repositoryUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on GitHub
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-red-900/50 border border-red-600 rounded">
                  <div className="flex items-center gap-2 text-red-300 mb-2">
                    <X className="h-4 w-4" />
                    <span className="font-medium">Publishing Failed</span>
                  </div>
                  <p className="text-sm text-red-200 mb-2">
                    {publishResult.error}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-300 border-red-600 hover:bg-red-900/50"
                    onClick={() => setPublishResult(null)}
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          )}

          {prResult && (
            <div className="space-y-2">
              {prResult.success ? (
                <div className="p-3 bg-green-900/50 border border-green-600 rounded">
                  <div className="flex items-center gap-2 text-green-300 mb-2">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">Pull Request Created!</span>
                  </div>
                  <p className="text-sm text-green-200 mb-2">
                    PR #{prResult.pullRequestNumber} created for user: {prResult.user}
                  </p>
                  <p className="text-sm text-green-200 mb-2">
                    Branch: {prResult.branchName}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-green-300 border-green-600 hover:bg-green-900/50"
                    onClick={() => window.open(prResult.pullRequestUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Pull Request
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-red-900/50 border border-red-600 rounded">
                  <div className="flex items-center gap-2 text-red-300 mb-2">
                    <X className="h-4 w-4" />
                    <span className="font-medium">PR Creation Failed</span>
                  </div>
                  <p className="text-sm text-red-200 mb-2">
                    {prResult.error}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-300 border-red-600 hover:bg-red-900/50"
                    onClick={() => setPrResult(null)}
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}