/**
 * @file karmna adapter
 * @author asd123freedom@gmail.com
 */

const testsContext = require.context('./', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
