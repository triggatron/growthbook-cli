module.exports = function (plop) {
  plop.setGenerator('repository', {
    description: 'Generates a repository for wrapping the OpenAPI implementations',
    prompts: [
      {
        type: 'input',
        name: 'resource',
        message: 'What is the resource? e.g. for FeaturesApi use `feature` and for MetricsApi use `metric`',
      },
    ],
    actions: [
      {
        type: 'add',
        skipIfExists: true,
        path:
          './src/repositories/{{kebabCase resource}}s.repository.ts',
        templateFile: './plop-templates/repository.hbs',
      },
    ],
  })

  plop.setGenerator('command', {
    description: 'Generates a command. This is the final command inside of the namespace folder, e.g. for the command `growthbook features generate types`, `generate types` would be the command',
    prompts: [
      {
        type: 'input',
        name: 'namespace',
        message: 'What is the root command (or namespace) for this command? e.g. features',
      },
      {
        type: 'input',
        name: 'command',
        message: 'What is the name of the command (i.e. name of the sub-command)? e.g. generate-types',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe this command. This will be the text in the help text.',
      },
    ],
    actions: [
      {
        type: 'add',
        skipIfExists: true,
        path:
          './src/commands/{{kebabCase namespace}}/{{kebabCase command}}.ts',
        templateFile: './plop-templates/command.hbs',
      },
    ],
  })

  plop.setGenerator('namespace', {
    description: 'Generates a command namespace. This is the folder it lives in and the root command, e.g. for the command `growthbook features generate types`, `features` would be the namespace',
    prompts: [
      {
        type: 'input',
        name: 'command',
        message: 'What is the namespace for this command? e.g. features',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe this command namespace. This will be the text in the help text.',
      },
    ],
    actions: [
      {
        type: 'add',
        skipIfExists: true,
        path:
          './src/commands/{{kebabCase command}}/index.ts',
        templateFile: './plop-templates/namespace.hbs',
      },
    ],
  })
}
