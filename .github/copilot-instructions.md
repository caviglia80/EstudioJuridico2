# Copilot Instructions — Estudio Jurídico Caviglia & Asociados

## Proyecto

Sitio web de un estudio jurídico argentino. Single-page application con Angular standalone zoneless, sistema de modales custom y Bootstrap 5 para layout/estilos.

## Stack Tecnológico

- **Framework**: Angular 21+ (standalone, zoneless, sin NgModules)
- **Lenguaje**: TypeScript 5.9+ con strict mode
- **Build**: esbuild via `@angular-devkit/build-angular:application`
- **UI**: Bootstrap 5.3, bootstrap-icons, sistema de modales custom (sin Angular Material)
- **Audio**: howler.js
- **Package Manager**: pnpm
- **Change Detection**: Zoneless (`provideZonelessChangeDetection()`)
- **Zone.js**: NO se usa — completamente eliminado

## TypeScript Best Practices

- Usar strict type checking.
- Preferir inferencia de tipos cuando el tipo es obvio.
- Prohibido usar `any`; usar `unknown` solo cuando sea estrictamente necesario y justificado.
- Prohibido usar non-null assertion operator (`!`).
- Prohibido usar `ts-ignore`, `ts-expect-error`.
- Prohibido usar `eslint-disable` o `eslint-disable-next-line`.
- Prohibido usar `console.log`, `console.error`, `console.warn` en código final.

## Angular Best Practices

- Siempre usar standalone components. NO usar NgModules.
- NO establecer `standalone: true` en decoradores Angular — es el default en Angular v21+.
- NO usar `experimentalDecorators` en tsconfig — Angular 21 no lo requiere.
- Usar `moduleResolution: "bundler"` en tsconfig.
- Usar `useDefineForClassFields: true` en tsconfig.
- Usar signals para manejo de estado.
- Implementar lazy loading para rutas de features.
- NO usar zone.js — el proyecto es completamente zoneless.
- Usar `provideZonelessChangeDetection()` en app.config.ts.
- NO usar los decoradores `@HostBinding` ni `@HostListener`. Usar el objeto `host` dentro del decorador `@Component` o `@Directive`.
- Usar `NgOptimizedImage` para todas las imágenes estáticas (no aplica a imágenes base64 inline).
- Preferir signals sobre RxJS. Si no se resuelve con signals, usar RxJS.

### Componentes

- Mantener componentes pequeños y enfocados en una sola responsabilidad.
- Usar `input()` y `output()` en vez de decoradores `@Input` y `@Output`.
- Usar `computed()` para estado derivado.
- Establecer `changeDetection: ChangeDetectionStrategy.OnPush` en todos los componentes.
- Preferir templates inline para componentes pequeños.
- NO usar `ngClass` — usar bindings de `class`.
- NO usar `ngStyle` — usar bindings de `style`.
- Usar rutas relativas al archivo TS del componente para templates/estilos externos.
- Usar `protected` para miembros de clase usados solo en el template.
- Usar `readonly` para propiedades inicializadas por Angular (`input`, `output`, `model`, queries).
- Agrupar propiedades Angular-specific (inject, inputs, outputs, queries) antes de los métodos.

### Estado

- Usar signals para estado local de componentes.
- Usar `computed()` para estado derivado.
- Mantener transformaciones de estado puras y predecibles.
- NO usar `mutate` en signals — usar `update` o `set`.
- Usar `linkedSignal` para estado dependiente de otros signals.
- Usar `resource` para datos asíncronos reactivos.

### Templates

- Mantener templates simples, evitar lógica compleja.
- Usar control flow nativo (`@if`, `@for`, `@switch`) en vez de `*ngIf`, `*ngFor`, `*ngSwitch`.
- Usar async pipe para manejar observables.
- Nombrar event handlers por lo que hacen, no por el evento que los dispara.

### Servicios

- Diseñar servicios en torno a una sola responsabilidad.
- Usar `providedIn: 'root'` para servicios singleton.
- Usar la función `inject()` en vez de inyección por constructor.

## Estructura del Proyecto

```
src/
  main.ts                          # Bootstrap con bootstrapApplication
  styles.scss                      # Estilos globales (Bootstrap, utilidades, modal overrides)
  index.html                       # SEO, structured data, fonts
  environments/
    environment.ts
    environment.prod.ts
  app/
    app.config.ts                  # ApplicationConfig (providers globales)
    app.routes.ts                  # Rutas con lazy loading
    app.component.ts/html/css      # Root component
    features/                      # Páginas principales (rutas)
      home/
        home.component.ts/html/scss
        areas-modal/
        consulta-modal/
        contacto-modal/
        login-modal/
    shared/                        # Código reutilizable
      auth/
        auth.service.ts
        auth.types.ts
      components/
        abogados-modal/
        area-card/
        card-button/
        contact-card/
        menu-button/
        modal-header/
        social-buttons/
        whatsapp-icon/
      modal/
        modal.service.ts
        modal-ref.ts
        modal-close.directive.ts
        modal.token.ts
      utils/
        social.utils.ts
        contact.constants.ts
        contact.types.ts
```

### Convenciones de Estructura

- Organizar por feature, NO por tipo (NO crear carpetas `components/`, `services/`, `directives/` a nivel raíz).
- Agrupar archivos relacionados en el mismo directorio.
- Un concepto por archivo.
- Componentes de página en `features/`.
- Componentes reutilizables en `shared/components/`.
- Utilidades compartidas en `shared/utils/`.
- Nombres de archivos con kebab-case separando palabras con guiones.

### Path Aliases (tsconfig)

```
@app/*    → src/app/*
@shared/* → src/app/shared/*
@pages/*  → src/app/features/*
@env/*    → src/environments/*
```

## Estilos

- Bootstrap 5.3 para layout y utilidades.
- Sistema de modales custom (`ModalService` en `shared/modal/`).
- bootstrap-icons para iconografía.
- NO usar `::ng-deep` ni `:deep()` — están deprecados.
- Usar CSS custom properties, clases globales, o `ViewEncapsulation.None` solo cuando sea estrictamente necesario.

## Accesibilidad

- Debe pasar todos los checks AXE.
- Debe seguir todos los mínimos WCAG AA: focus management, contraste de color, atributos ARIA.

## Scripts

```bash
pnpm start            # ng serve --watch --host 0.0.0.0
pnpm build            # ng build --configuration dev
pnpm build:prod       # ng build --configuration prod
pnpm start:dist       # serve dist/estudio-juridico/browser -s
pnpm lint             # ng lint
```

## Reglas de Código

- Aplicar DRY — una fuente de verdad para cada pieza de conocimiento.
- Aplicar SRP — una clase/función = una responsabilidad.
- Complejidad cognitiva máxima de 10 por función.
- Eliminar código muerto: archivos, funciones, imports, variables no utilizados.
- Eliminar clases de estilos no utilizadas.
- Cuando se elimina una funcionalidad, eliminar TODOS los archivos relacionados.
- Sin tests — el proyecto no incluye configuración ni dependencias de testing.
- Prevenir memory leaks.
- Mínima verbalización — código auto-documentado, comentarios solo para contexto crítico.
- Siempre responder en español.

## Workflow de Validación

1. Generar/modificar código aplicando todas las reglas.
2. Eliminar código muerto.
3. Ejecutar `pnpm lint` — resolver TODOS los errores y warnings.
4. Ejecutar `pnpm start` — verificar que la app inicia sin errores.
5. NO romper funcionalidades existentes.
