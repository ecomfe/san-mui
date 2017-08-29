const testsContext = require.context('./', true, /TextField\.spec\.js$/);
testsContext.keys().forEach(testsContext);
