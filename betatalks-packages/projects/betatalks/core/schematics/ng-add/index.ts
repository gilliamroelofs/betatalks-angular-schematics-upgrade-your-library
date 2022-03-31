import { chain, noop, Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { NodeDependency, NodeDependencyType, addPackageJsonDependency } from '@schematics/angular/utility/dependencies';
import { WorkspaceSchema, WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import { Schema as NgAddSchema } from './schema';
import { addModuleImportToRootModule } from '../utils/ast';

function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: '^5.1.2', name: 'bootstrap' }
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return host;
  };
}

function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);

    return host;
  };
}

function addDeclarationsToRootModule(workspaceProject: WorkspaceProject): Rule {
  return (host: Tree) => {
    const betatalksCoreModuleName = 'BtCoreModule';
    const betatalksCorePackage = '@betatalks/core';

    addModuleImportToRootModule(host, betatalksCoreModuleName, betatalksCorePackage, workspaceProject);
  };
}

function getAngularJsonDefinition(host: Tree): WorkspaceSchema {
  const workspaceConfig = host.read('/angular.json');
  if (!workspaceConfig) {
    throw new SchematicsException(`Could not find angular.json, schematic must be executed in an Angular project`);
  }
  const workspaceContent = workspaceConfig.toString();

  return JSON.parse(workspaceContent);
}

export function ngAdd(options: NgAddSchema): Rule {
  return async (host: Tree) => {
    const config = getAngularJsonDefinition(host);

    const projectName = options.project || config.defaultProject;

    if (!projectName) {
      throw new SchematicsException(`missing project config or defaultProject, please provide a project to add @betatalks/core to`);
    }

    const workspaceProject = config.projects[projectName];

    return chain([
      options && options.skipPackageJson ? noop() : addPackageJsonDependencies(),
      options && options.skipPackageJson ? noop() : installPackageJsonDependencies(),
      options && options.skipModuleImport ? noop() : addDeclarationsToRootModule(workspaceProject)
    ]);
  };
}