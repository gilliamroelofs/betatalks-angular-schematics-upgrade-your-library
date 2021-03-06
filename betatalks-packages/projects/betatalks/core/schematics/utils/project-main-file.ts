/**
 * https://github.com/angular/components/blob/e02fa3a2ab2fc5616c633437dd74691bd8a0cf85/src/cdk/schematics/utils/project-main-file.ts
 */

import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import { SchematicsException } from '@angular-devkit/schematics';
import { getProjectTargetOptions } from './project-targets';

/** Looks for the main TypeScript file in the given project and returns its path. */
export function getProjectMainFile(project: WorkspaceProject): string {
    const buildOptions = getProjectTargetOptions(project, 'build');

    if (!buildOptions.main) {
        throw new SchematicsException(`Could not find the project main file inside of the ` +
            `workspace config (${project.sourceRoot})`);
    }

    return buildOptions.main;
}