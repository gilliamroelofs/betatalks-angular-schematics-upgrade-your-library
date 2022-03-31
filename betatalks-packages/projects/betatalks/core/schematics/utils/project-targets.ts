/**
 * https://github.com/angular/components/blob/e02fa3a2ab2fc5616c633437dd74691bd8a0cf85/src/cdk/schematics/utils/project-targets.ts
 */

import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import { SchematicsException } from '@angular-devkit/schematics';

/** Resolves the architect options for the build target of the given project. */
export function getProjectTargetOptions(project: WorkspaceProject, buildTarget: string) {
    if (project.targets &&
        project.targets[buildTarget] &&
        project.targets[buildTarget].options) {

        return project.targets[buildTarget].options;
    }

    if (project.architect &&
        project.architect[buildTarget] &&
        project.architect[buildTarget].options) {

        return project.architect[buildTarget].options;
    }

    throw new SchematicsException(
        `Cannot determine project target configuration for: ${buildTarget}.`);
}