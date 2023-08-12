/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface continueCompletion {
  body?: {
    jsonParseContent?: boolean;
    message: {
      content: string;
      role: 'user' | 'system' | 'assistant';
    };
    openaiConfig?: {
      frequency_penalty?: number;
      function_call?: object;
      functions?: string[];
      logit_bias?: object;
      max_tokens?: number;
      model?: string;
      n?: number;
      presence_penalty?: number;
      stop?: object;
      stream?: boolean;
      temperature?: number;
      top_p?: number;
      user?: string;
    };
    save?: boolean;
  };
  query?: {
    historyId?: string;
    systemKey: string;
  };
}
