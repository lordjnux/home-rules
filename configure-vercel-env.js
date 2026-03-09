#!/usr/bin/env node
/**
 * Configure Vercel environment variables for Home Rules production
 * Usage: node configure-vercel-env.js
 */

const https = require('https');

// Get environment variables (from GitHub Actions or local)
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_ORG_ID = process.env.VERCEL_ORG_ID;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

// Validate required variables
const required = ['VERCEL_TOKEN', 'VERCEL_ORG_ID', 'VERCEL_PROJECT_ID', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'JWT_SECRET'];
for (const v of required) {
  if (!process.env[v]) {
    console.error(`ERROR: ${v} not set in environment`);
    process.exit(1);
  }
}

// Vercel project details
const PROJECT_ID = VERCEL_PROJECT_ID;
const ORG_ID = VERCEL_ORG_ID;

// Environment variables to set (target: production)
const ENV_VARS = {
  GOOGLE_CLIENT_ID: {
    value: GOOGLE_CLIENT_ID,
    target: ['production'],
  },
  GOOGLE_CLIENT_SECRET: {
    value: GOOGLE_CLIENT_SECRET,
    target: ['production'],
  },
  GOOGLE_CALLBACK_URL: {
    value: 'https://homerules.js17.dev/auth/google/callback',
    target: ['production'],
  },
  JWT_SECRET: {
    value: JWT_SECRET,
    target: ['production'],
  },
};

async function setEnvVar(name, config) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      key: name,
      value: config.value,
      target: config.target,
    });

    const options = {
      hostname: 'api.vercel.com',
      path: `/v9/projects/${PROJECT_ID}/env?teamId=${ORG_ID}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ ${name} set successfully`);
          resolve(JSON.parse(data));
        } else {
          console.error(`❌ ${name} failed: ${res.statusCode}`);
          console.error(data);
          reject(new Error(`Failed to set ${name}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🔐 Configuring Vercel environment variables...');
  
  try {
    for (const [name, config] of Object.entries(ENV_VARS)) {
      await setEnvVar(name, config);
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('\n✅ All environment variables configured in Vercel!');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
