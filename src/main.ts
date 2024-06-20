import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { CompilerFactory, COMPILER_OPTIONS, Compiler } from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

export function createCompiler(fn: CompilerFactory): Compiler {
  return fn.createCompiler();
}

platformBrowserDynamic([
  { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
  {
    provide: CompilerFactory,
    useClass: JitCompilerFactory,
    deps: [COMPILER_OPTIONS],
  },
  { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
])
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
