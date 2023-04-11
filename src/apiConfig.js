export const openAIApiKey =
  "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";
export const organizationID = "org-VnVAFtgBenYe8Mki8sWV62ZU";

export const openaiConfig = {
  headers: {
    "Content-Type": "application/json",
    "OpenAI-Organization": organizationID,
    Authorization: `Bearer ${openAIApiKey}`,
  },
};
