exports.config = {
  framework: 'jasmine',
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // The file path to the selenium server jar ()
  seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',
  chromeDriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver_2.21',
  specs: ['lib/*_spec.js'],
  rootElement: '.calculator',
  params: {url: 'http://localhost:3000'}
  // multiCapabilities: [
  //   {
  //     'browserName': 'firefox'
  //   }, {
  //     'browserName': 'chrome'
  //   },
  //   {
  //     'browserName': 'safari'
  //   }
  // ]
};
