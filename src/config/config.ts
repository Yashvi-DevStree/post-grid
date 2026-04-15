export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.UPSTASH_REDIS_URL,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },
//   twilio: {
//     accountSid: process.env.TWILIO_ACCOUNT_SID,
//     authToken: process.env.TWILIO_AUTH_TOKEN,
//     phoneNumber: process.env.TWILIO_PHONE_NUMBER,
//   },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
});
