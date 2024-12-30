export const GMAIL_SCOPES = {
  readonly: 'https://www.googleapis.com/auth/gmail.readonly',
  send: 'https://www.googleapis.com/auth/gmail.send',
  modify: 'https://www.googleapis.com/auth/gmail.modify'
};

export const GMAIL_DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
];

export const GAPI_TIMEOUT = 5000; // 5 seconds