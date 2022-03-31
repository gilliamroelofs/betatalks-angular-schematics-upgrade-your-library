/**
 * https://github.com/angular/components/blob/e02fa3a2ab2fc5616c633437dd74691bd8a0cf85/src/cdk/schematics/utils/ast.ts#L31
 */

import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

import { getProjectMainFile } from './project-main-file';

/** Reads file given path and returns TypeScript source file. */
export function getSourceFile(host: Tree, path: string): ts.SourceFile {
    const buffer = host.read(path);
    if (!buffer) {
        throw new SchematicsException(`Could not find file for path: ${path}`);
    }
    return ts.createSourceFile(path, buffer.toString(), ts.ScriptTarget.Latest, true);
}

/** Import and add module to root app module. */
export function addModuleImportToRootModule(host: Tree, moduleName: string, src: string,
    project: WorkspaceProject) {
    const modulePath = getAppModulePath(host, getProjectMainFile(project));
    addModuleImportToModule(host, modulePath, moduleName, src);
}


/**
 * Import and add module to specific module path.
 * @param host the tree we are updating
 * @param modulePath src location of the module to import
 * @param moduleName name of module to import
 * @param src src location to import
 */
export function addModuleImportToModule(host: Tree, modulePath: string, moduleName: string,
    src: string) {

    const moduleSource = getSourceFile(host, modulePath);

    if (!moduleSource) {
        throw new SchematicsException(`Module not found: ${modulePath}`);
    }

    // TODO: TypeScript version mismatch due to @schematics/angular using a different version
    // than Material. Cast to any to avoid the type assignment failure.
    const changes = addImportToModule(moduleSource as any, modulePath, moduleName, src);
    const recorder = host.beginUpdate(modulePath);

    changes.forEach((change) => {
        if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
    });

    host.commitUpdate(recorder);
}