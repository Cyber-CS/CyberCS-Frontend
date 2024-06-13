export type ResultData = {
    filePath: string;
    codeContent: string;
    repositoryName: string;
    repositoryUrl: string;
    maliciousIntent: {
      type: string;
      match: string;
    }[];
  }