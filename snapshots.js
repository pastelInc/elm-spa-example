const PercyScript = require('@percy/script');
const httpServer = require('http-server');

const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;

// A script to navigate our app and take snapshots with Percy.
PercyScript.run(async (page, percySnapshot) => {
  let server = httpServer.createServer();
  server.listen(PORT);

  console.log(`Server started at ${TEST_URL}`);

  await page.goto(TEST_URL, {waitUntil: 'networkidle0'});
  await percySnapshot('home page');

  // Go to sign in page.
  await page.goto(`${TEST_URL}/#/login`, {waitUntil: 'networkidle0'});
  await percySnapshot('sign in page');
  server.close();
});
