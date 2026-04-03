const hlpPW = require("../pw/helpers.js");
const { expect } = require("../../fixtures/fixtures.js");

// These helpers intentionally target the candidate's own temporary GitHub repository.
const getRequiredEnv = (name) => {
  const value = process.env[name];

  if (!value) throw new Error(`Missing required env var: ${name}`);

  return value;
};

const getRepoContext = () => ({
  owner: getRequiredEnv("GITHUB_OWNER"),
  repo: getRequiredEnv("GITHUB_REPO"),
});

const getAuthHeaders = () => ({
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${getRequiredEnv("GITHUB_TOKEN")}`,
  "X-GitHub-Api-Version": "2026-03-10",
});

const _getIssuePayload = async (data = {}) => {
  const suffix = await hlpPW.getRandomLetters(8);

  return {
    title: data.title || `Playwright issue ${suffix}`,
    body: data.body || `Playwright body ${suffix}`,
  };
};

const _getIssueCreated = async (request, data = {}) => {
  const { owner, repo } = getRepoContext();
  const headers = getAuthHeaders();

  const response = await request.post(
    `https://api.github.com/repos/${owner}/${repo}/issues`,
    {
      data,
      headers,
    }
  );

  expect(response.status()).toBe(201);

  return await response.json();
};

const _getIssueData = async (request, issueNumber) => {
  const { owner, repo } = getRepoContext();
  const headers = getAuthHeaders();

  const response = await request.get(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
    { headers }
  );

  expect(response.status()).toBe(200);

  return await response.json();
};

const _updateIssue = async (request, issueNumber, data) => {
  const { owner, repo } = getRepoContext();
  const headers = getAuthHeaders();

  const response = await request.patch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
    { data, headers }
  );

  expect(response.status()).toBe(200);

  return await response.json();
};

const _getIssueComments = async (request, issueNumber) => {
  const { owner, repo } = getRepoContext();
  const headers = getAuthHeaders();

  const response = await request.get(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
    { headers }
  );

  expect(response.status()).toBe(200);

  return await response.json();
};

const _addIssueComment = async (request, issueNumber, body) => {
  const { owner, repo } = getRepoContext();
  const headers = getAuthHeaders();

  const response = await request.post(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
    {
      data: { body },
      headers,
    }
  );

  expect(response.status()).toBe(201);

  return await response.json();
};

const _closeIssue = async (request, issueNumber) => {
  const { owner, repo } = getRepoContext();
  const headers = getAuthHeaders();

  const response = await request.patch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
    { headers, data: { state: "close" } }
  );

  expect(response.status()).toBe(200);

  return await response.json();
};

module.exports = {
  getRequiredEnv,
  getRepoContext,
  getAuthHeaders,
  _getIssuePayload,
  _getIssueCreated,
  _getIssueData,
  _updateIssue,
  _getIssueComments,
  _addIssueComment,
  _closeIssue,
};
