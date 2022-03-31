import { Rule, Tree, SchematicsException } from '@angular-devkit/schematics';

export function updateToV2(_options: any): Rule {
  return async (_host: Tree) => {
    // for example: https://github.com/angular/components/blob/master/src/material/schematics/ng-update/index.ts
    throw new SchematicsException(`Implement a update schematic!`);
  };
}