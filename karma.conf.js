module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-mocha-reporter'),
      require('karma-junit-reporter')
    ],
    client: {
      clearContext: false
    },
    
    reporters: ['mocha', 'junit'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    junitReporter: {
      useBrowserName: false,
      outputFile: 'unit.xml',
      suite: 'unit'
    }
  });
};
