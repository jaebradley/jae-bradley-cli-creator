import Octokit from '@octokit/rest';

const isGitHubUsernameValid = async (username) => {
  const client = new Octokit();
  try {
    await client.users.getForUser({ username });
    return true;
  } catch (e) {
    return false;
  }
};

export default isGitHubUsernameValid;
